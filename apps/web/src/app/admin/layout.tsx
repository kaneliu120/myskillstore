import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AuthWrapper from "@/components/auth/AuthWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 管理后台强制使用中文消息，或者你可以根据需要动态获取
  const messages = await getMessages();

  return (
    <html lang="zh">
      <body>
        <NextIntlClientProvider messages={messages} locale="zh">
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
