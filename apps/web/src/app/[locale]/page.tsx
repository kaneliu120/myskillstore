'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Boxes, DollarSign, Wallet, Brain, Globe, TrendingUp, Search, User, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-lg font-bold text-gray-900">
              {t('nav.brand')}
            </Link>
          </div>
          
          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="/" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-5 -mb-5">首页</Link>
            <Link href="/products" className="hover:text-purple-600 transition">技能探索</Link>
            <Link href="/products/create" className="hover:text-purple-600 transition">卖家指南</Link>
            <Link href="#" className="hover:text-purple-600 transition">社区</Link>
          </div>
          
          {/* Right: Search + Login */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="搜索技能..." 
                className="pl-9 bg-gray-100 border-gray-200 focus-visible:ring-purple-500 rounded-lg h-10 w-64 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <Link href="/user">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg h-10 px-4 text-sm">
                登录 / 注册
              </Button>
            </Link>
            <Link href="/user">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-white via-gray-50 to-purple-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex gap-4">
                <Link href="/products/create">
                  <Button className="h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 text-base font-medium shadow-lg shadow-purple-200">
                    开始销售
                  </Button>
                </Link>
                <Link href="#explore">
                  <Button variant="outline" className="h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 text-base font-medium">
                    探索技能
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right: Laptop Mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 rounded-3xl p-8">
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                  {/* Browser Chrome */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-xs">
                        my-skill-shop.onrender.com
                      </div>
                    </div>
                  </div>
                  {/* Dashboard Preview */}
                  <div className="bg-gray-900 p-4 min-h-[200px]">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-purple-600/20 rounded-lg p-3">
                        <div className="text-purple-400 text-xs mb-1">总收益</div>
                        <div className="text-white font-bold">¥52,598</div>
                      </div>
                      <div className="bg-blue-600/20 rounded-lg p-3">
                        <div className="text-blue-400 text-xs mb-1">订单数</div>
                        <div className="text-white font-bold">36</div>
                      </div>
                      <div className="bg-emerald-600/20 rounded-lg p-3">
                        <div className="text-emerald-400 text-xs mb-1">技能数</div>
                        <div className="text-white font-bold">62</div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-2">我的技能</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">智能文案撰写助手</span>
                          <span className="text-purple-400">¥99</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">科幻场景生成器</span>
                          <span className="text-purple-400">¥129</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-100/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <Boxes className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">{t('hero.tag1_title')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                无缝集成<span className="text-purple-600 font-medium">全球主流AI代理平台</span>。支持<span className="text-purple-600 font-medium">OpenAI</span>，<span className="text-purple-600 font-medium">Hugging Face</span>，及其它领先框架的<span className="text-purple-600 font-medium">标准化API调用</span>。确保您的AI技能在任何环境中都能即插即用，无需额外适配，最大化跨平台兼容性。
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">{t('hero.tag2_title')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                为创作者和开发者提供极具竞争力的<span className="text-purple-600 font-medium">费率结构</span>。享受接近<span className="text-purple-600 font-medium">零</span>的<span className="text-purple-600 font-medium">平台服务费</span>和低至行<span className="text-purple-600 font-medium">业最低</span>的<span className="text-purple-600 font-medium">支付网关费用</span>。最大化您的收益，让每一分价值都回归创作本身。
              </p>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="text-center mt-12">
            <div className="text-purple-500 text-sm font-medium mb-2">SCROLL</div>
            <ChevronDown className="w-6 h-6 text-purple-500 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section id="explore" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">最新上架</h2>
          
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
              /* Demo Cards when no products */
              <>
                {[
                  { title: '智能文案撰写助手', author: '李明', price: 99, category: '文本生成', color: 'bg-amber-100' },
                  { title: '科幻场景生成器', author: '王晓华', price: 129, category: '图像创作', color: 'bg-purple-100' },
                  { title: '商业数据洞察', author: '张伟', price: 150, category: '数据分析', color: 'bg-blue-100' },
                  { title: '多语种语音克隆', author: '陈静', price: 199, category: '语音合成', color: 'bg-pink-100' },
                ].map((demo, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                        {demo.category}
                      </span>
                      <div className={`h-40 ${demo.color} flex items-center justify-center`}>
                        <Brain className="w-16 h-16 text-purple-300" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">{demo.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">创作者：{demo.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-purple-600">¥{demo.price}.00</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xs px-4">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full px-8">
                查看全部 →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-purple-600">如何开始</h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mb-16"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { icon: Wallet, num: '01', title: '身份激活', desc: '连接数字身份，安全解锁您的AI技能商店，开启创作者之旅。' },
              { icon: Brain, num: '02', title: '封装智慧', desc: '将您的独特技能与知识转化为可交易的AI模型或服务，一键打包。' },
              { icon: Globe, num: '03', title: '确权上架', desc: '利用区块链技术确保知识产权，智能合约保障交易，一键上架全球市场。' },
              { icon: TrendingUp, num: '04', title: '建立品牌', desc: '持续提供优质服务，积累好评，打造个人AI品牌，实现长期收益增值。' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block text-purple-300 text-2xl">→</div>
                  )}
                </div>
                <div className="text-purple-600 font-bold text-xl mb-2">{step.num}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Boxes className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">{t('nav.brand')}</span>
              </div>
              <p className="text-sm text-gray-500">
                AI驱动的专业技能变现平台
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">产品</h4>
              <div className="space-y-2 text-sm">
                <Link href="/products" className="block text-gray-500 hover:text-purple-600">技能探索</Link>
                <Link href="/products/create" className="block text-gray-500 hover:text-purple-600">发布技能</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">资源</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-gray-500 hover:text-purple-600">帮助中心</Link>
                <Link href="#" className="block text-gray-500 hover:text-purple-600">开发者文档</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">关于</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-gray-500 hover:text-purple-600">关于我们</Link>
                <Link href="#" className="block text-gray-500 hover:text-purple-600">联系我们</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2026 My Skill Shop. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/en" className="text-gray-500 hover:text-purple-600">EN</Link>
              <Link href="/zh" className="text-gray-500 hover:text-purple-600">中文</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
