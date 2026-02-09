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
    // ⚠️ 终极方案：对接 Azure API
    const apiUrl = 'https://skills-store-api-bjbddhaeathndkap.southeastasia-01.azurewebsites.net';
    
    console.log(`[Next.js Rewrite] Configuring proxy to: ${apiUrl}`);

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
// force rebuild 1770395131
