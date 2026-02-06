'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Gem, Wallet, Brain, Globe, TrendingUp, Search, HelpCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0a0e17] text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl fixed w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              {t('nav.brand')}
            </Link>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
              <Link href="#about" className="hover:text-white transition">关于我们</Link>
              <Link href="/products/create" className="hover:text-white transition">发布技能</Link>
              <Link href="/user" className="hover:text-white transition">个人中心</Link>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden lg:flex items-center relative w-80">
            <Search className="absolute left-3 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search for prompts, agents, code..." 
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-blue-500 rounded-full h-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex gap-3 text-sm font-medium text-slate-400">
              <Link href="/en" className="hover:text-white transition">EN</Link>
              <Link href="/zh" className="hover:text-white transition">中文</Link>
            </div>
            <Link href="/user">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6">
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/90 via-[#0a0e17]/80 to-[#0a0e17] z-10" />
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500/20 to-transparent" />
          </div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex gap-4">
            <Link href="/products/create">
              <Button size="lg" className="h-12 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 rounded-full px-8">
                Start Selling
              </Button>
            </Link>
            <Link href="#explore">
              <Button size="lg" variant="outline" className="h-12 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-8">
                Explore Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section id="explore" className="py-16 px-4 bg-[#0a0e17]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Arrivals</h2>
            <Link href="/products" className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className="text-slate-500 col-span-full text-center py-10">No products yet. Be the first to list one!</p>
            )}
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-16 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6 items-start p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">{t('hero.tag1_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t('hero.tag1_desc')}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Gem className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">{t('hero.tag2_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t('hero.tag2_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative bg-[#0a0e17]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t('howItWorks.title')}</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Wallet, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'step1_title', desc: 'step1_desc' },
              { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'step2_title', desc: 'step2_desc' },
              { icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'step3_title', desc: 'step3_desc' },
              { icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10', title: 'step4_title', desc: 'step4_desc' },
            ].map((step, idx) => (
              <div key={idx} className="relative text-center group">
                <div className={`mb-6 inline-flex p-4 ${step.bg} rounded-2xl border border-slate-800 group-hover:border-blue-500/30 transition-colors`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-base font-semibold mb-3">{t(`howItWorks.${step.title}`)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t(`howItWorks.${step.desc}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-16 bg-slate-900/30 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">帮助与支持</h2>
          </div>
          <div className="space-y-4 text-slate-400">
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-slate-700 transition cursor-pointer">
              <p className="font-medium text-white mb-1">我如何注册或登录</p>
              <p className="text-sm">使用 Google 或 GitHub 账号一键登录，无需额外注册。</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-slate-700 transition cursor-pointer">
              <p className="font-medium text-white mb-1">我如何创建和发布我的技能文件</p>
              <p className="text-sm">点击"发布技能"，填写产品信息、定价和交付方式，提交审核后即可上架。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 border-t border-white/10 bg-[#05080f]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4">{t('nav.brand')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                {t('footer.text')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">链接</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#about" className="hover:text-white transition">关于我们</Link></li>
                <li><Link href="/products/create" className="hover:text-white transition">发布技能</Link></li>
                <li><Link href="/products" className="hover:text-white transition">浏览技能</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">支持</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition">帮助中心</Link></li>
                <li><Link href="#" className="hover:text-white transition">联系我们</Link></li>
                <li><Link href="#" className="hover:text-white transition">服务条款</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
            © 2026 My Skill Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
