'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Boxes, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.user.role !== 'admin') {
        setError('Access denied: Admin role required');
        return;
      }

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push(`/${locale}/admin`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-2xl overflow-hidden">
        <div className="h-2 bg-red-600" />
        <CardHeader className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight uppercase">
            Admin Central
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            Restricted Access · Personnel Only
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-bold uppercase text-[10px] tracking-widest">
                Admin Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@myskillstore.dev"
                className="h-12 border-slate-200 focus:border-slate-900 focus:ring-0 rounded-lg bg-slate-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-bold uppercase text-[10px] tracking-widest">
                Security Key
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="h-12 border-slate-200 focus:border-slate-900 focus:ring-0 rounded-lg bg-slate-50"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-slate-900 hover:bg-black text-white rounded-lg h-12 font-bold shadow-lg transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'AUTHORIZE ACCESS'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Button 
              variant="link" 
              className="text-slate-400 hover:text-slate-600 text-xs"
              onClick={() => router.push('/')}
            >
              Return to Public Site
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="fixed bottom-6 text-slate-600 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
        System Protocol v2.0.26 · Encrypted Connection
      </div>
    </div>
  );
}
