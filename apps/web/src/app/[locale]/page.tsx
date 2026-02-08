'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Wallet, Brain, Globe, TrendingUp, Minus, Plus } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';

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
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // Mock login state - replace with real auth context later
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isZh = locale === 'zh';

  const fetchProducts = async (searchQuery = '') => {
    try {
      const response = await api.get('/products', {
        params: { search: searchQuery }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePublishClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }
    // If logged in, let the Link proceed naturally
  };

  const faqs = isZh ? [
    { q: '我如何注册或登录？', a: '点击右上角的"登录/注册"按钮，使用邮箱注册新账户或登录现有账户。' },
    { q: '我如何创建和发布我的技能文件？', a: '登录后，前往"技能发布"页面，填写技能信息、设置价格、上传文件即可提交审核。' },
    { q: '平台如何收费？', a: '我们采用极低的平台服务费，让创作者获得最大收益。具体费率请查看技能发布页。' },
    { q: '支持哪些支付方式？', a: '目前支持 USDT/USDC 等主流加密货币，买家直接支付到您的钱包地址。' },
    { q: '如何保护我的知识产权？', a: '平台采用区块链技术进行版权确权，智能合约保障交易安全。' },
  ] : [
    { q: 'How do I register or log in?', a: 'Click the "Login / Register" button in the top right corner to create a new account with your email or sign in to an existing account.' },
    { q: 'How do I create and publish my skill?', a: 'After logging in, go to the "Publish Skill" page, fill in your skill details, set your price, upload your files, and submit for review.' },
    { q: 'What are the platform fees?', a: 'We charge minimal platform fees to maximize creator earnings. Check the Publish Skill page for specific rates.' },
    { q: 'What payment methods are supported?', a: 'We currently support major cryptocurrencies like USDT/USDC. Buyers pay directly to your wallet address.' },
    { q: 'How is my intellectual property protected?', a: 'The platform uses blockchain technology for copyright verification, with smart contracts ensuring secure transactions.' },
  ];

  const demoProducts = isZh ? [
    { id: 'd1', title: '智能文案撰写助手', author: '李明', price: 99, category: '文本生成', color: 'bg-amber-100' },
    { id: 'd2', title: '科幻场景生成器', author: '王晓华', price: 129, category: '图像创作', color: 'bg-purple-100' },
    { id: 'd3', title: '商业数据洞察', author: '张伟', price: 150, category: '数据分析', color: 'bg-blue-100' },
    { id: 'd4', title: '多语种语音克隆', author: '陈静', price: 199, category: '语音合成', color: 'bg-pink-100' },
    { id: 'd5', title: 'Python 自动化脚本', author: '刘强', price: 89, category: '编程开发', color: 'bg-green-100' },
    { id: 'd6', title: 'AI 法律顾问 Prompt', author: '赵敏', price: 299, category: '法律咨询', color: 'bg-red-100' },
    { id: 'd7', title: '跨境电商选品模型', author: '孙浩', price: 199, category: '电商运营', color: 'bg-orange-100' },
    { id: 'd8', title: '虚拟人直播配置', author: '周杰', price: 350, category: '直播技术', color: 'bg-indigo-100' },
  ] : [
    { id: 'd1', title: 'Smart Copywriting Assistant', author: 'Alex Chen', price: 99, category: 'Text Generation', color: 'bg-amber-100' },
    { id: 'd2', title: 'Sci-Fi Scene Generator', author: 'Maria Wang', price: 129, category: 'Image Creation', color: 'bg-purple-100' },
    { id: 'd3', title: 'Business Data Insights', author: 'James Liu', price: 150, category: 'Data Analysis', color: 'bg-blue-100' },
    { id: 'd4', title: 'Multi-Language Voice Clone', author: 'Sarah Kim', price: 199, category: 'Voice Synthesis', color: 'bg-pink-100' },
    { id: 'd5', title: 'Python Automation Script', author: 'David Liu', price: 89, category: 'Development', color: 'bg-green-100' },
    { id: 'd6', title: 'AI Legal Advisor Prompt', author: 'Emily Zhao', price: 299, category: 'Legal', color: 'bg-red-100' },
    { id: 'd7', title: 'Cross-border E-commerce Model', author: 'Kevin Sun', price: 199, category: 'E-commerce', color: 'bg-orange-100' },
    { id: 'd8', title: 'Virtual Streamer Setup', author: 'Jay Zhou', price: 350, category: 'Live Streaming', color: 'bg-indigo-100' },
  ];

  const steps = isZh ? [
    { icon: Wallet, num: '01', title: '创建账户', desc: '注册您的账户，开启智慧创造者之旅' },
    { icon: Brain, num: '02', title: '封装智慧', desc: '将你的天赋与知识技能转化为AI 智能体可使用的技能功能' },
    { icon: Globe, num: '03', title: '轻松发布', desc: '利用平台的功能，轻松将您的技能知识产权，发布到全球市场' },
    { icon: TrendingUp, num: '04', title: '建立品牌', desc: '随着您的客户规模的成长，让您的知识产权为您带来长期且稳定的被动收入。' },
  ] : [
    { icon: Wallet, num: '01', title: 'Create Account', desc: 'Register your account and start your journey as a wisdom creator.' },
    { icon: Brain, num: '02', title: 'Package Wisdom', desc: 'Transform your talents and knowledge into functional skills usable by AI agents.' },
    { icon: Globe, num: '03', title: 'Easy Publish', desc: 'Use platform features to easily publish your intellectual property to the global market.' },
    { icon: TrendingUp, num: '04', title: 'Build Your Brand', desc: 'As your client base grows, let your intellectual property bring you long-term, stable passive income.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar 
        onSearch={fetchProducts} 
        onPublishClick={handlePublishClick}
        isLoggedIn={isLoggedIn}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-[#4F46E5] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-bottom-left"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-white/20 rounded-full text-white/90 backdrop-blur-sm border border-white/20">
                ✨ {isZh ? '全新体验 V7' : 'New Experience V7'}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-10 leading-relaxed font-light">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/products/create" 
                  className="w-full sm:w-auto"
                  onClick={handlePublishClick}
                >
                  <Button className="w-full sm:w-auto h-14 bg-white text-indigo-700 hover:bg-indigo-50 border border-transparent rounded-xl px-8 text-lg font-bold shadow-lg transition-all transform hover:-translate-y-1">
                    {isZh ? '立即发布' : 'Get Started'}
                  </Button>
                </Link>
                <Link href="#explore" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto h-14 bg-indigo-700/30 text-white border-2 border-indigo-300 hover:bg-indigo-700/50 hover:border-white rounded-xl px-8 text-lg font-bold backdrop-blur-sm transition-all">
                    {isZh ? '浏览市场' : 'Marketplace'}
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 opacity-90">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-500 bg-indigo-800 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-lg leading-none">1,000+</span>
                  <span className="text-indigo-200">{isZh ? '创作者加入' : 'creators joined'}</span>
                </div>
              </div>
            </div>
            
            {/* Right: Modern Dashboard Mockup (Simplified/Reverted style) */}
            <div className="relative group mt-10 lg:mt-0 perspective-1000">
              <div className="absolute inset-0 bg-indigo-600 blur-3xl opacity-40 transform rotate-3 scale-95"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:rotate-1 hover:scale-[1.02]">
                {/* Browser Bar */}
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 bg-white px-3 py-1 rounded-md text-xs text-gray-400 flex-1 text-center shadow-sm">myskillstore.ai</div>
                </div>
                {/* Content */}
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Dashboard</h3>
                      <p className="text-gray-400 text-xs">Welcome back, Creator</p>
                    </div>
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                      <Wallet size={20} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-gray-500 text-xs mb-1">Total Sales</div>
                      <div className="text-xl font-bold text-gray-900">$12,450</div>
                      <div className="text-green-500 text-xs mt-1 flex items-center">
                        <TrendingUp size={12} className="mr-1" /> +15%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-gray-500 text-xs mb-1">Active Skills</div>
                      <div className="text-xl font-bold text-gray-900">8</div>
                      <div className="text-indigo-500 text-xs mt-1">Optimization Active</div>
                    </div>
                  </div>
                  <div className="h-24 bg-indigo-50/50 rounded-xl flex items-end justify-between p-2 px-4">
                     {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                       <div key={i} className="w-1/12 bg-indigo-500 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.7 + (i * 0.05) }}></div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Tabs */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {['All Skills', 'AI Agents', 'Prompts', 'Automation', 'Voice', 'Image', 'Data', 'Coding'].map((cat, i) => (
              <button 
                key={i}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${i === 0 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-100' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-purple-600'
                  }`}
              >
                {isZh ? (cat === 'All Skills' ? '全部' : cat) : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section id="explore" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isZh ? '探索优质技能' : 'Explore Skills'}
              </h2>
              <p className="text-gray-500 max-w-lg">
                {isZh ? '发现来自全球顶级创作者的 AI 技能和数字资产。' : 'Discover top-tier AI skills and digital assets from creators worldwide.'}
              </p>
            </div>
            <Link href="/products">
              <Button variant="link" className="text-purple-600 font-bold p-0 flex items-center gap-2">
                {isZh ? '查看全部技能' : 'View all skills'} <span>→</span>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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
                  <ProductCard 
                    key={idx} 
                    id={demo.id}
                    title={demo.title}
                    price={demo.price}
                    author={demo.author}
                    category={demo.category}
                  />
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
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-100 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {isZh ? '开启您的智慧之旅' : 'Start Your Journey'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {isZh ? '简单四步，将您的知识转化为持续的数字收益。' : 'Four simple steps to transform your knowledge into sustainable digital revenue.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connection Line (Hidden on mobile) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-purple-200 -z-10" aria-hidden="true"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                {/* Icon Container with White Background to hide line behind it */}
                <div className="w-24 h-24 bg-white border-2 border-purple-100 rounded-3xl flex items-center justify-center shadow-sm group-hover:border-purple-500 group-hover:shadow-xl group-hover:shadow-purple-200 group-hover:-translate-y-2 transition-all duration-500 mb-8 rotate-3 group-hover:rotate-0 relative z-20">
                  <step.icon className="w-10 h-10 text-purple-600" strokeWidth={1.5} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-4 border-white shadow-sm">
                    {step.num}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-6 px-4">{step.desc}</p>
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
            <Link href="/contact">
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full px-8">
                {isZh ? '联系我们' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setIsLoggedIn(true);
          router.push('/products/create');
        }}
      />
    </div>
  );
}
