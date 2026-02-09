import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AuthWrapper from "@/components/auth/AuthWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 默认给后台提供 zh 消息，或者你可以根据逻辑调整
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </NextIntlClientProvider>
  );
}
