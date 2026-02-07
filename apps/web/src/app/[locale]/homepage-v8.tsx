'use client';

import { Search, Star, ShoppingCart, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// 模拟数据
const PRODUCTS = [
  {
    id: 1,
    title: "Next.js SaaS Starter Kit",
    price: 99,
    authorName: "Alex Chen",
    rating: 5.0,
    reviews: 128,
    category: "Code",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Ultimate AI Prompt Bundle",
    price: 49,
    authorName: "Sarah Smith",
    rating: 4.8,
    reviews: 85,
    category: "Prompts",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "E-commerce UI Design System",
    price: 79,
    authorName: "Design Pro",
    rating: 4.9,
    reviews: 210,
    category: "Design",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Automated SEO Workflow",
    price: 120,
    authorName: "Mike Johnson",
    rating: 4.7,
    reviews: 56,
    category: "Workflow",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
    {
    id: 5,
    title: "Python Data Analysis Scripts",
    price: 59,
    authorName: "Data Wizard",
    rating: 4.9,
    reviews: 92,
    category: "Code",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Virtual Human Live Stream Setup",
    price: 299,
    authorName: "Live Tech",
    rating: 4.6,
    reviews: 34,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Midjourney Portrait Prompts",
    price: 29,
    authorName: "Art AI",
    rating: 4.8,
    reviews: 150,
    category: "Prompts",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Notion Life OS Template",
    price: 39,
    authorName: "Productivity Guy",
    rating: 5.0,
    reviews: 300,
    category: "Template",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const CATEGORIES = [
  { name: "全部", count: 120 },
  { name: "AI 提示词", count: 45 },
  { name: "代码模板", count: 32 },
  { name: "工作流", count: 18 },
  { name: "设计资产", count: 25 },
];

export default function HomePageV8() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Navbar (Simple) */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 fixed w-full z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">My Skill Shop</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition">探索</a>
            <a href="#" className="hover:text-indigo-600 transition">分类</a>
            <a href="#" className="hover:text-indigo-600 transition">创作者</a>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-slate-600 hover:text-indigo-600">登录</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">发布技能</Button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl rounded-full pointer-events-none -z-10" />
        
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium mb-6 border border-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            全球首个 AI 技能去中心化交易平台
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            发现并获取 <span className="text-indigo-600 relative inline-block">
              顶尖的数字技能
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            从经过验证的专家那里获取现成的代码、Prompt 提示词和自动化工作流。<br className="hidden md:block"/>让你的 AI 项目开发速度提升 10 倍。
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mb-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 group-hover:opacity-30 blur transition duration-200"></div>
            <div className="relative flex items-center bg-white rounded-full shadow-lg p-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500">
              <Search className="w-5 h-5 text-slate-400 ml-4" />
              <input 
                type="text" 
                placeholder="搜索你需要的技能 (例如: Next.js 模板, SEO Prompt)..." 
                className="flex-1 border-none outline-none px-4 text-slate-700 placeholder:text-slate-400 h-10 bg-transparent"
              />
              <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-10">
                搜索
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              人工审核上架
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              即时自动交付
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              7天退款保证
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories (Optional Quick Filter) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0 justify-start md:justify-center">
             {CATEGORIES.map((cat, idx) => (
               <button key={idx} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${idx === 0 ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                 {cat.name} <span className="ml-1 opacity-60 text-xs">{cat.count}</span>
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Products Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-900">本周精选资源</h2>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1 text-sm">
              查看全部 <span className="text-lg">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                   {/* Replace with actual Image component */}
                   <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-900 shadow-sm">
                     {product.category}
                   </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                       <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-600 font-bold">
                         {product.authorName[0]}
                       </div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium truncate flex-1">{product.authorName}</span>
                    <div className="text-lg font-bold text-indigo-600">
                      ${product.price}
                    </div>
                  </div>
                </div>
                
                {/* Hover Action */}
                <div className="px-5 pb-5 pt-0 mt-[-10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                   <Button className="w-full bg-slate-900 hover:bg-indigo-600 text-white rounded-xl h-10 gap-2">
                     <ShoppingCart className="w-4 h-4" /> 立即购买
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section (Value Reinforcement) */}
      <section className="py-20 px-6 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 blur-[100px] rounded-full pointer-events-none" />
         <div className="container mx-auto max-w-4xl text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">准备好出售你的智慧了吗？</h2>
           <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
             加入 10,000+ 创作者的行列。将你的专业知识打包成产品，建立被动收入流。我们提供最低的手续费和最广的全球市场。
           </p>
           <Button className="bg-white text-slate-900 hover:bg-indigo-50 px-8 py-6 rounded-full text-lg font-bold">
             免费创建店铺
           </Button>
           <p className="mt-6 text-sm text-slate-500">无需信用卡 · 5分钟完成设置</p>
         </div>
      </section>

      {/* Footer (Simple) */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="container mx-auto text-center text-slate-500 text-sm">
           <p>&copy; 2026 My Skill Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
