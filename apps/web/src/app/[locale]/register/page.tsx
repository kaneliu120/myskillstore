'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Github, Mail } from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await api.post('/auth/register', {
        email: data.email,
        password: data.password,
        nickname: data.username,
      });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/user');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-50 flex items-center justify-center px-4 py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
      
      <Card className="w-full max-w-md bg-slate-900/50 border-slate-800 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text mb-2 inline-block">
            My Skill Shop
          </Link>
          <CardTitle className="text-xl text-white">{t('register.title')}</CardTitle>
          <CardDescription className="text-slate-400">{t('register.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Register */}
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

          {/* Register Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">{t('register.username')}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="cooldev"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">{t('login.email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">{t('login.password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">{t('register.confirmPassword')}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required className="border-slate-600 data-[state=checked]:bg-blue-600" />
              <label htmlFor="terms" className="text-sm text-slate-400 leading-tight">
                {t('register.terms')}{' '}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                  {t('register.termsLink')}
                </Link>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white">
              {loading ? 'Processing...' : t('register.submit')}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400">
            {t('register.hasAccount')}{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              {t('register.signIn')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
