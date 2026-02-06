# 阶段 1：构建环境 - 使用 Debian 镜像以获得更好的原生模块兼容性
FROM node:20-slim AS builder
WORKDIR /app

# 复制依赖定义
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# 安装依赖
RUN npm ci

# 复制源码
COPY . .

# 设置构建时的环境变量
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 构建前端
RUN npm run build --workspace=apps/web

# 阶段 2：生产运行环境
FROM node:20-slim AS runner
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
