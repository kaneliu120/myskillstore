'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Boxes, Search, User, ChevronDown, Check, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onSearch?: (query: string) => void;
  initialSearch?: string;
  onPublishClick?: (e: React.MouseEvent) => void;
  isLoggedIn?: boolean;
}

export function Navbar({ onSearch, initialSearch = '', onPublishClick, isLoggedIn = false }: NavbarProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const router = useRouter();
  
  const [search, setSearch] = useState(initialSearch);
  const [langOpen, setLangOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const isZh = locale === 'zh';

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
      if (onSearch) {
        onSearch(search);
      } else {
        router.push(`/products?search=${encodeURIComponent(search)}`);
      }
      setMobileMenuOpen(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (path === '/products/create' && onPublishClick) {
      onPublishClick(e);
      if (!e.defaultPrevented) {
         setMobileMenuOpen(false);
      } else {
        // If prevented (login modal shown), we also close the menu if open
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
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
            <Link href="/" className="hover:text-purple-600 transition font-medium">
              {isZh ? '首页' : 'Home'}
            </Link>
            <Link href="/products" className="hover:text-purple-600 transition">
              {isZh ? '技能探索' : 'Explore'}
            </Link>
            <Link 
              href="/products/create" 
              className="hover:text-purple-600 transition"
              onClick={(e) => onPublishClick && onPublishClick(e)}
            >
              {isZh ? '技能发布' : 'Publish Skill'}
            </Link>
            <Link href="/#faq" className="hover:text-purple-600 transition">
              {isZh ? '常见问题' : 'FAQ'}
            </Link>
          </div>
          
          {/* Right: Search + Login + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <div className="hidden lg:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder={isZh ? '搜索技能...' : 'Search skills...'} 
                  className="pl-9 bg-gray-100 border-gray-200 focus-visible:ring-purple-500 rounded-lg h-10 w-64 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch(e);
                  }}
                />
              </div>
              
              {/* Login/Register Button - If logged in, show User icon, else show button */}
              {/* Wait, the original code had both button and User icon link regardless of state.
                  We can improve this if needed, but for now let's stick to the requirement: intercept Publish link.
              */}
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg h-10 px-4 text-sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {isZh ? '登录 / 注册' : 'Login / Register'}
              </Button>
              <Link href="/user">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
            <Link 
              href="/" 
              className="text-gray-900 font-medium py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isZh ? '首页' : 'Home'}
            </Link>
            <Link 
              href="/products" 
              className="text-gray-600 hover:text-purple-600 py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isZh ? '技能探索' : 'Explore'}
            </Link>
            <Link 
              href="/products/create" 
              className="text-gray-600 hover:text-purple-600 py-2 border-b border-gray-100"
              onClick={(e) => handleLinkClick(e, '/products/create')}
            >
              {isZh ? '技能发布' : 'Publish Skill'}
            </Link>
            <Link 
              href="/#faq" 
              className="text-gray-600 hover:text-purple-600 py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isZh ? '常见问题' : 'FAQ'}
            </Link>
            
            <div className="pt-2 flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder={isZh ? '搜索技能...' : 'Search skills...'} 
                  className="pl-9 bg-gray-100 border-gray-200 focus-visible:ring-purple-500 rounded-lg h-10 w-full text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') handleSearch(e);
                  }}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg h-10 text-sm"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                {isZh ? '登录 / 注册' : 'Login / Register'}
              </Button>
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
