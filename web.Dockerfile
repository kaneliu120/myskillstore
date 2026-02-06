# 阶段 1：构建环境
FROM node:20-alpine AS builder
WORKDIR /app

# 安装构建原生模块所需的系统依赖
RUN apk add --no-cache libc6-compat

# 复制依赖定义
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# 显式安装适用于 Alpine 的 lightningcss 补丁，解决 Turbopack 构建 CSS 失败的问题
RUN npm install --save-dev lightningcss-linux-x64-musl --workspace=apps/web

# 安装依赖
RUN npm ci

# 复制源码
COPY . .

# 设置构建时的环境变量（注意：NEXT_PUBLIC_ 开头的变量通常需要在构建时注入）
# 在 Render/Railway 中，可以在构建命令前加参数，或者这里给个默认值
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 构建前端
RUN npm run build --workspace=apps/web

# 阶段 2：生产运行环境
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 复制 Next.js standalone 构建产物
# Next.js 自动将所需依赖打包到了 .next/standalone 下
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

# 启动命令 (standalone 模式下，启动入口在 apps/web/server.js)
CMD ["node", "apps/web/server.js"]
