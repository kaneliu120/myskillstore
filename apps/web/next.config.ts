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
    // 运行时动态获取 API 地址，若未设置则报错（防止静默失败连接到 localhost）
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn('⚠️ WARN: NEXT_PUBLIC_API_URL is not set, API proxying will fail.');
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
