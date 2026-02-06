'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-[#0a0e17] text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl fixed w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              {t('nav.brand')}
            </Link>
            <div className="hidden md:flex items-center relative w-96">
              <Search className="absolute left-3 w-4 h-4 text-slate-500" />
              <Input 
                placeholder="Search for prompts, agents, code..." 
                className="pl-10 bg-white/5 border-white/10 focus-visible:ring-blue-500 rounded-full h-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex gap-4 text-sm font-medium text-slate-400">
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

      {/* Hero Section with Banner Image */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/90 via-[#0a0e17]/80 to-[#0a0e17] z-10" />
          <img 
            src="/hero-bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge variant="outline" className="mb-8 border-blue-500/50 text-blue-300 bg-blue-500/10 px-4 py-1 rounded-full backdrop-blur-md">
            The Marketplace for AI Wisdom
          </Badge>
          
          {/* Typography Adjustment: Main Title ~20% larger than Subtitle visual weight */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/products/create">
              <Button size="lg" className="h-12 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 rounded-full px-8">
                Start Selling
              </Button>
            </Link>
            <Link href="#explore">
              <Button size="lg" variant="outline" className="h-12 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-8">
                Explore Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="explore" className="py-20 px-4 bg-[#0a0e17]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Arrivals</h2>
            <Link href="/products" className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard 
                  key={product.id} 
                  id={product.id.toString()}
                  title={product.title}
                  price={Number(product.price_usd)}
                  author={product.seller?.nickname || 'Unknown'}
                  category={product.category || 'Other'}
                />
              ))
            ) : (
              <p className="text-slate-500 col-span-full text-center py-10">No products found. Be the first to list one!</p>
            )}
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-20 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{t('hero.tag1_title')}</h3>
                <p className="text-slate-400 leading-relaxed">{t('hero.tag1_desc')}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Gem className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{t('hero.tag2_title')}</h3>
                <p className="text-slate-400 leading-relaxed">{t('hero.tag2_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative bg-[#0a0e17]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t('howItWorks.title')}</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Wallet, color: 'text-blue-400', title: 'step1_title', desc: 'step1_desc' },
              { icon: Brain, color: 'text-purple-400', title: 'step2_title', desc: 'step2_desc' },
              { icon: Globe, color: 'text-emerald-400', title: 'step3_title', desc: 'step3_desc' },
              { icon: TrendingUp, color: 'text-amber-400', title: 'step4_title', desc: 'step4_desc' },
            ].map((step, idx) => (
              <div key={idx} className="relative text-center group">
                <div className="mb-6 inline-flex p-4 bg-slate-900 rounded-2xl border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-800 to-transparent" />
                )}
                <h3 className="text-lg font-semibold mb-3">{t(`howItWorks.${step.title}`)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t(`howItWorks.${step.desc}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#05080f]">
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
