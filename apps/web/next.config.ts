import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone', // 开启 Docker 优化模式
  experimental: {
    // 允许跨域图片（如果需要展示用户上传的图片）
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async rewrites() {
    // 运行时动态获取 API 地址
    // ⚠️ 关键点：使用 process.env.SERVER_API_URL 或回退到 process.env.NEXT_PUBLIC_API_URL
    // 但必须确保构建时不会被静态替换为占位符。
    // 在 Render 上，NEXT_PUBLIC_ 变量会被 build time inline，所以我们优先读取非 PUBLIC 的变量，
    // 或者直接读取 NEXT_PUBLIC_API_URL 但寄希望于它没被 inline（这很难）。
    // 最稳妥的办法：使用一个专门用于服务器端的变量 SERVER_API_URL。
    const apiUrl = process.env.SERVER_API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    console.log(`[Next.js Rewrite] Configuring proxy to: ${apiUrl}`);

    if (!apiUrl) {
      console.warn('⚠️ WARN: API_URL is not set, API proxying will fail.');
    }
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl || 'http://missing-api-url'}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
