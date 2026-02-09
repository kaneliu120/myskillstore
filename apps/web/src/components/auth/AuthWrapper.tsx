'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from './AuthContext';
import AuthModal from './AuthModal';

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname.includes('/admin');

  return (
    <AuthProvider>
      {children}
      {!isAdminPath && <AuthModal />}
    </AuthProvider>
  );
}
