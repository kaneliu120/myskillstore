# 阶段 1：构建环境
FROM node:20-slim AS builder

WORKDIR /app

# 复制依赖定义文件
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# 安装所有依赖（包括 devDependencies 用于构建）
RUN npm ci

# 复制源代码
COPY . .

# 构建后端 API
RUN npm run build --workspace=apps/api

# 检查构建产物
RUN echo "=== Build output ===" && ls -la /app/apps/api/dist/ && echo "=== Main file ===" && ls -la /app/apps/api/dist/main.js || echo "main.js not found"

# 阶段 2：生产运行环境
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000
ENV HOSTNAME="0.0.0.0"

# 复制 API 的 package.json 和 package-lock.json
COPY --from=builder /app/apps/api/package*.json ./

# 复制根目录的 node_modules（包含所有 workspace 依赖）
COPY --from=builder /app/node_modules ./node_modules

# 复制构建产物
COPY --from=builder /app/apps/api/dist ./dist

# 暴露端口
EXPOSE 10000

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/api', (r) => process.exit(r.statusCode === 200 || r.statusCode === 404 ? 0 : 1)).on('error', () => process.exit(1))"

# 启动命令 - 添加调试日志
CMD ["sh", "-c", "echo '=== Starting NestJS API ===' && echo \"PORT=$PORT\" && echo \"NODE_ENV=$NODE_ENV\" && ls -la /app/dist/ && node dist/main.js"]
