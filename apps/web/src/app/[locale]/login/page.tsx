'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Mail } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('Auth');

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-50 flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      
      <Card className="w-full max-w-md bg-slate-900/50 border-slate-800 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text mb-2 inline-block">
            My Skill Shop
          </Link>
          <CardTitle className="text-xl text-white">{t('login.title')}</CardTitle>
          <CardDescription className="text-slate-400">{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-white">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">{t('login.or')}</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">{t('login.password')}</Label>
                <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                  {t('login.forgot')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">
              {t('login.submit')}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400">
            {t('login.noAccount')}{' '}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              {t('login.signUp')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
