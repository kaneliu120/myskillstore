'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Gem, Wallet, Brain, Globe, TrendingUp, Search } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Product {
  id: number;
  title: string;
  price_usd: number;
  seller: { nickname: string };
  category: string;
}

export default function HomePage() {
  const t = useTranslations('HomePage');
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const fetchProducts = async (searchQuery = '') => {
    try {
      const response = await api.get('/products', {
        params: { status: 'approved', search: searchQuery }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchProducts(search);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-50 font-sans">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl fixed w-full z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Brand + Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold text-blue-400">
              {t('nav.brand')}
            </Link>
            <div className="hidden md:flex items-center gap-6 text-[13px] text-slate-400">
              <Link href="#about" className="hover:text-white transition">关于我们</Link>
              <Link href="/products/create" className="hover:text-white transition">发布技能</Link>
              <Link href="/user" className="hover:text-white transition">个人中心</Link>
            </div>
          </div>
          
          {/* Center: Search */}
          <div className="hidden lg:flex items-center relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search for prompts, agents, code..." 
              className="pl-9 bg-slate-800/50 border-slate-700 focus-visible:ring-blue-500 rounded-full h-8 text-[13px] text-slate-300 placeholder:text-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          
          {/* Right: Language + Login */}
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex gap-3 text-[13px] text-slate-400">
              <Link href="/en" className="hover:text-white transition">EN</Link>
              <Link href="/zh" className="hover:text-white transition">中文</Link>
            </div>
            <Link href="/user">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-md h-8 px-4 text-[13px]">
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3] mb-4 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-[15px] md:text-[16px] text-slate-400 mb-8 max-w-3xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex gap-3">
            <Link href="/products/create">
              <Button className="h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 text-[14px]">
                Start Selling
              </Button>
            </Link>
            <Link href="#explore">
              <Button variant="outline" className="h-10 border-slate-600 text-slate-300 hover:bg-slate-800 rounded-full px-6 text-[14px]">
                Explore Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section id="explore" className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-bold">Latest Arrivals</h2>
            <Link href="/products" className="text-blue-400 hover:text-blue-300 text-[13px]">View All →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.slice(0, 8).map(product => (
                <ProductCard 
                  key={product.id} 
                  id={product.id.toString()}
                  title={product.title}
                  price={Number(product.price_usd)}
                  author={product.seller?.nickname || 'Anonymous'}
                  category={product.category || 'Other'}
                />
              ))
            ) : (
              <p className="text-slate-500 col-span-full text-center py-8 text-[14px]">No products yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-12 border-y border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="flex gap-4 items-start p-5 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="p-2.5 bg-blue-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold mb-1.5 text-white">{t('hero.tag1_title')}</h3>
                <p className="text-slate-400 text-[13px] leading-relaxed">{t('hero.tag1_desc')}</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex gap-4 items-start p-5 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="p-2.5 bg-purple-500/10 rounded-lg">
                <Gem className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold mb-1.5 text-white">{t('hero.tag2_title')}</h3>
                <p className="text-slate-400 text-[13px] leading-relaxed">{t('hero.tag2_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-[22px] font-bold text-center mb-12">{t('howItWorks.title')}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wallet, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'step1_title', desc: 'step1_desc' },
              { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'step2_title', desc: 'step2_desc' },
              { icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'step3_title', desc: 'step3_desc' },
              { icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10', title: 'step4_title', desc: 'step4_desc' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className={`mb-4 inline-flex p-3 ${step.bg} rounded-xl`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <h3 className="text-[13px] font-semibold mb-2 text-white">{t(`howItWorks.${step.title}`)}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{t(`howItWorks.${step.desc}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-10 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-[16px] font-bold mb-4">帮助与支持</h2>
          <div className="space-y-2 text-[13px]">
            <p className="text-slate-400 hover:text-slate-300 cursor-pointer">我如何注册或登录</p>
            <p className="text-slate-400 hover:text-slate-300 cursor-pointer">我如何创建和发布我的技能文件</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-10 border-t border-slate-800 bg-[#060a10]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Links */}
            <div className="space-y-2 text-[13px]">
              <Link href="#about" className="block text-slate-400 hover:text-white transition">关于我们</Link>
              <Link href="/products/create" className="block text-slate-400 hover:text-white transition">发布技能</Link>
              <Link href="#" className="block text-slate-400 hover:text-white transition">联系我们</Link>
            </div>
            {/* Right Description */}
            <div>
              <p className="text-[12px] text-slate-500 leading-relaxed">
                {t('footer.text')}
              </p>
            </div>
          </div>
          <div className="text-center text-slate-600 text-[11px]">
            © 2026 My Skill Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
