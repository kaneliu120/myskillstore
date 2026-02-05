import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Gem, Wallet, Brain, Globe, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl fixed w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            My Skill Shop
          </div>
          <div className="flex gap-4">
            <Link href="/en" className="text-sm text-slate-400 hover:text-white transition">EN</Link>
            <Link href="/zh" className="text-sm text-slate-400 hover:text-white transition">中文</Link>
            <Link href="/user">
              <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800">
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge variant="secondary" className="mb-6 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
            v2.0 Now Live
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/user">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                {t('howItWorks.cta')}
              </Button>
            </Link>
          </div>

          {/* Core Advantages */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-lg text-slate-100">{t('hero.tag1_title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">
                {t('hero.tag1_desc')}
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Gem className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-lg text-slate-100">{t('hero.tag2_title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">
                {t('hero.tag2_desc')}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-950 relative border-t border-slate-800/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t('howItWorks.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />

            {/* Step 1 */}
            <div className="relative md:text-right md:pr-12">
              <div className="md:absolute right-0 top-0 translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950 z-10 hidden md:block" />
              <div className="mb-4 inline-flex p-3 bg-slate-900 rounded-xl border border-slate-800">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step1_title')}</h3>
              <p className="text-slate-400">{t('howItWorks.step1_desc')}</p>
            </div>
            <div className="md:hidden" /> {/* Spacer */}

            {/* Step 2 */}
            <div className="md:hidden" /> {/* Spacer */}
            <div className="relative md:pl-12">
              <div className="md:absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-950 z-10 hidden md:block" />
              <div className="mb-4 inline-flex p-3 bg-slate-900 rounded-xl border border-slate-800">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step2_title')}</h3>
              <p className="text-slate-400">{t('howItWorks.step2_desc')}</p>
            </div>

            {/* Step 3 */}
            <div className="relative md:text-right md:pr-12">
              <div className="md:absolute right-0 top-0 translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-950 z-10 hidden md:block" />
              <div className="mb-4 inline-flex p-3 bg-slate-900 rounded-xl border border-slate-800">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step3_title')}</h3>
              <p className="text-slate-400">{t('howItWorks.step3_desc')}</p>
            </div>
            <div className="md:hidden" /> {/* Spacer */}

            {/* Step 4 */}
            <div className="md:hidden" /> {/* Spacer */}
            <div className="relative md:pl-12">
              <div className="md:absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-slate-950 z-10 hidden md:block" />
              <div className="mb-4 inline-flex p-3 bg-slate-900 rounded-xl border border-slate-800">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step4_title')}</h3>
              <p className="text-slate-400">{t('howItWorks.step4_desc')}</p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link href="/user">
              <Button size="lg" variant="secondary" className="bg-white text-slate-950 hover:bg-slate-200">
                {t('howItWorks.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-slate-500 text-sm leading-relaxed">
            {t('footer.text')}
          </p>
          <div className="mt-8 text-slate-600 text-xs">
            &copy; 2026 My Skill Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
