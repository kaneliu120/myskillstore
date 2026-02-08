'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Boxes } from 'lucide-react';

export function Footer() {
  const t = useTranslations('HomePage'); // Using HomePage namespace for now as it seems to hold nav/brand
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
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
              <Link href="/products/create" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '技能发布' : 'Publish Skill'}</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">{isZh ? '资源' : 'Resources'}</h4>
            <div className="space-y-2 text-sm">
              <Link href="/#faq" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '帮助中心' : 'Help Center'}</Link>
              <Link href="#" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '开发者文档' : 'Developer Docs'}</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">{isZh ? '关于' : 'About'}</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '关于我们' : 'About Us'}</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-purple-400 transition">{isZh ? '联系我们' : 'Contact'}</Link>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2026 MySkillStore. All rights reserved.
          </div>
          {/* Simple language switchers in footer */}
          <div className="flex gap-4 text-sm">
             <Link href="/en" locale="en" className={`${locale === 'en' ? 'text-purple-400' : 'text-gray-500'} hover:text-purple-400 transition`}>English</Link>
             <Link href="/zh" locale="zh" className={`${locale === 'zh' ? 'text-purple-400' : 'text-gray-500'} hover:text-purple-400 transition`}>中文</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
