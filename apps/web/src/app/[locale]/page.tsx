'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Boxes, DollarSign, Wallet, Brain, Globe, TrendingUp, Search, User, ChevronDown, Check, Plus, Minus } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
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
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const isZh = locale === 'zh';

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchProducts(search);
    }
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const faqs = isZh ? [
    { q: '我如何注册或登录？', a: '点击右上角的"登录/注册"按钮，使用邮箱注册新账户或登录现有账户。' },
    { q: '我如何创建和发布我的技能文件？', a: '登录后，前往"发布技能"页面，填写技能信息、设置价格、上传文件即可提交审核。' },
    { q: '平台如何收费？', a: '我们采用极低的平台服务费，让创作者获得最大收益。具体费率请查看卖家指南。' },
    { q: '支持哪些支付方式？', a: '目前支持 USDT/USDC 等主流加密货币，买家直接支付到您的钱包地址。' },
    { q: '如何保护我的知识产权？', a: '平台采用区块链技术进行版权确权，智能合约保障交易安全。' },
  ] : [
    { q: 'How do I register or log in?', a: 'Click the "Login / Register" button in the top right corner to create a new account with your email or sign in to an existing account.' },
    { q: 'How do I create and publish my skill?', a: 'After logging in, go to the "Seller Guide" page, fill in your skill details, set your price, upload your files, and submit for review.' },
    { q: 'What are the platform fees?', a: 'We charge minimal platform fees to maximize creator earnings. Check the Seller Guide for specific rates.' },
    { q: 'What payment methods are supported?', a: 'We currently support major cryptocurrencies like USDT/USDC. Buyers pay directly to your wallet address.' },
    { q: 'How is my intellectual property protected?', a: 'The platform uses blockchain technology for copyright verification, with smart contracts ensuring secure transactions.' },
  ];

  const demoProducts = isZh ? [
    { title: '智能文案撰写助手', author: '李明', price: 99, category: '文本生成', color: 'bg-amber-100' },
    { title: '科幻场景生成器', author: '王晓华', price: 129, category: '图像创作', color: 'bg-purple-100' },
    { title: '商业数据洞察', author: '张伟', price: 150, category: '数据分析', color: 'bg-blue-100' },
    { title: '多语种语音克隆', author: '陈静', price: 199, category: '语音合成', color: 'bg-pink-100' },
  ] : [
    { title: 'Smart Copywriting Assistant', author: 'Alex Chen', price: 99, category: 'Text Generation', color: 'bg-amber-100' },
    { title: 'Sci-Fi Scene Generator', author: 'Maria Wang', price: 129, category: 'Image Creation', color: 'bg-purple-100' },
    { title: 'Business Data Insights', author: 'James Liu', price: 150, category: 'Data Analysis', color: 'bg-blue-100' },
    { title: 'Multi-Language Voice Clone', author: 'Sarah Kim', price: 199, category: 'Voice Synthesis', color: 'bg-pink-100' },
  ];

  const steps = isZh ? [
    { icon: Wallet, num: '01', title: '身份激活', desc: '连接数字身份，安全解锁您的AI技能商店，开启创作者之旅。' },
    { icon: Brain, num: '02', title: '封装智慧', desc: '将您的独特技能与知识转化为可交易的AI模型或服务，一键打包。' },
    { icon: Globe, num: '03', title: '确权上架', desc: '利用区块链技术确保知识产权，智能合约保障交易，一键上架全球市场。' },
    { icon: TrendingUp, num: '04', title: '建立品牌', desc: '持续提供优质服务，积累好评，打造个人AI品牌，实现长期收益增值。' },
  ] : [
    { icon: Wallet, num: '01', title: 'Activate Identity', desc: 'Connect your digital identity, securely unlock your AI skill shop, and begin your creator journey.' },
    { icon: Brain, num: '02', title: 'Package Wisdom', desc: 'Transform your unique skills and knowledge into tradable AI models or services with one click.' },
    { icon: Globe, num: '03', title: 'Verify & List', desc: 'Use blockchain technology to protect IP rights, smart contracts ensure secure transactions, list globally.' },
    { icon: TrendingUp, num: '04', title: 'Build Your Brand', desc: 'Deliver quality services, accumulate reviews, build your personal AI brand for long-term growth.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Brand + Language Dropdown */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-lg font-bold text-gray-900">
                {t('nav.brand')}
              </Link>
            </div>
            
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                  {languages.map(lang => (
                    <Link
                      key={lang.code}
                      href={`/${lang.code}`}
                      className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 ${locale === lang.code ? 'text-purple-600 bg-purple-50' : 'text-gray-700'}`}
                      onClick={() => setLangOpen(false)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {locale === lang.code && <Check className="w-4 h-4 ml-auto" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="/" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-5 -mb-5">
              {isZh ? '首页' : 'Home'}
            </Link>
            <Link href="/products" className="hover:text-purple-600 transition">
              {isZh ? '技能探索' : 'Explore'}
            </Link>
            <Link href="/products/create" className="hover:text-purple-600 transition">
              {isZh ? '卖家指南' : 'Seller Guide'}
            </Link>
            <Link href="#faq" className="hover:text-purple-600 transition">
              {isZh ? '常见问题' : 'FAQ'}
            </Link>
          </div>
          
          {/* Right: Search + Login */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <Input 
                placeholder={isZh ? '搜索技能...' : 'Search skills...'} 
                className="pl-9 bg-gray-100 border-gray-200 focus-visible:ring-purple-500 rounded-lg h-10 w-64 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <Link href="/user">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg h-10 px-4 text-sm">
                {isZh ? '登录 / 注册' : 'Login / Register'}
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
                    {isZh ? '开始销售' : 'Start Selling'}
                  </Button>
                </Link>
                <Link href="#explore">
                  <Button variant="outline" className="h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 text-base font-medium">
                    {isZh ? '探索技能' : 'Explore Skills'}
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
                        <div className="text-purple-400 text-xs mb-1">{isZh ? '总收益' : 'Revenue'}</div>
                        <div className="text-white font-bold">$52,598</div>
                      </div>
                      <div className="bg-blue-600/20 rounded-lg p-3">
                        <div className="text-blue-400 text-xs mb-1">{isZh ? '订单数' : 'Orders'}</div>
                        <div className="text-white font-bold">36</div>
                      </div>
                      <div className="bg-emerald-600/20 rounded-lg p-3">
                        <div className="text-emerald-400 text-xs mb-1">{isZh ? '技能数' : 'Skills'}</div>
                        <div className="text-white font-bold">62</div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-2">{isZh ? '我的技能' : 'My Skills'}</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">{isZh ? '智能文案撰写助手' : 'Smart Copywriting Assistant'}</span>
                          <span className="text-purple-400">$99</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">{isZh ? '科幻场景生成器' : 'Sci-Fi Scene Generator'}</span>
                          <span className="text-purple-400">$129</span>
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
                {isZh ? (
                  <>无缝集成<span className="text-purple-600 font-medium">全球主流AI代理平台</span>。支持<span className="text-purple-600 font-medium">OpenAI</span>，<span className="text-purple-600 font-medium">Hugging Face</span>，及其它领先框架的<span className="text-purple-600 font-medium">标准化API调用</span>。确保您的AI技能在任何环境中都能即插即用，无需额外适配，最大化跨平台兼容性。</>
                ) : (
                  <>Seamlessly integrates with <span className="text-purple-600 font-medium">major global AI agent platforms</span>. Supports <span className="text-purple-600 font-medium">OpenAI</span>, <span className="text-purple-600 font-medium">Hugging Face</span>, and other leading frameworks with <span className="text-purple-600 font-medium">standardized API calls</span>. Your AI skills work plug-and-play in any environment, maximizing cross-platform compatibility.</>
                )}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">{t('hero.tag2_title')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {isZh ? (
                  <>为创作者和开发者提供极具竞争力的<span className="text-purple-600 font-medium">费率结构</span>。享受接近<span className="text-purple-600 font-medium">零</span>的<span className="text-purple-600 font-medium">平台服务费</span>和低至行<span className="text-purple-600 font-medium">业最低</span>的<span className="text-purple-600 font-medium">支付网关费用</span>。最大化您的收益，让每一分价值都回归创作本身。</>
                ) : (
                  <>Offering creators and developers highly competitive <span className="text-purple-600 font-medium">fee structures</span>. Enjoy near-<span className="text-purple-600 font-medium">zero platform fees</span> and <span className="text-purple-600 font-medium">industry-lowest</span> <span className="text-purple-600 font-medium">payment gateway costs</span>. Maximize your earnings—every dollar of value returns to you.</>
                )}
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
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">
            {isZh ? '最新上架' : 'Latest Arrivals'}
          </h2>
          
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
                {demoProducts.map((demo, idx) => (
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
                      <p className="text-sm text-gray-500 mb-3">{isZh ? '创作者：' : 'By '}{demo.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-purple-600">${demo.price}.00</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xs px-4">
                          {isZh ? '查看详情' : 'View'}
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
                {isZh ? '查看全部 →' : 'View All →'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-purple-600">
            {isZh ? '如何开始' : 'How It Works'}
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mb-20"></div>
          
          {/* Steps Row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                {/* Step Card */}
                <div className="flex flex-col items-center text-center w-full max-w-[280px] mx-auto">
                  {/* Icon Circle */}
                  <div className="w-[140px] h-[140px] bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-xl shadow-purple-200 mb-8">
                    <step.icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  
                  {/* Description - 完整显示 */}
                  <p className="text-sm text-gray-500 leading-6">{step.desc}</p>
                </div>
                
                {/* Arrow Connector */}
                {idx < 3 && (
                  <div className="hidden md:flex items-center justify-center w-8 -mt-24 flex-shrink-0">
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-purple-300">
                      <path d="M0 6H20M20 6L15 1M20 6L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Full Screen Height */}
      <section id="faq" className="min-h-screen py-20 px-6 bg-white flex items-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-purple-600">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mb-12"></div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  {openFaq === idx ? (
                    <Minus className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              {isZh ? '还有其他问题？' : 'Still have questions?'}
            </p>
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full px-8">
              {isZh ? '联系我们' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Dark Space Gray */}
      <footer className="py-16 bg-[#1a1a2e] text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Boxes className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">{t('nav.brand')}</span>
              </div>
              <p className="text-sm text-gray-400">
                {isZh ? 'AI驱动的专业技能变现平台' : 'AI-powered professional skill monetization platform'}
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-4">{isZh ? '产品' : 'Product'}</h4>
              <div className="space-y-2 text-sm">
                <Link href="/products" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '技能探索' : 'Explore Skills'}</Link>
                <Link href="/products/create" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '发布技能' : 'Publish Skill'}</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{isZh ? '资源' : 'Resources'}</h4>
              <div className="space-y-2 text-sm">
                <Link href="#faq" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '帮助中心' : 'Help Center'}</Link>
                <Link href="#" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '开发者文档' : 'Developer Docs'}</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">{isZh ? '关于' : 'About'}</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '关于我们' : 'About Us'}</Link>
                <Link href="#" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '联系我们' : 'Contact'}</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2026 My Skill Shop. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/en" className={`${locale === 'en' ? 'text-purple-400' : 'text-gray-500'} hover:text-purple-400 transition`}>English</Link>
              <Link href="/zh" className={`${locale === 'zh' ? 'text-purple-400' : 'text-gray-500'} hover:text-purple-400 transition`}>中文</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
