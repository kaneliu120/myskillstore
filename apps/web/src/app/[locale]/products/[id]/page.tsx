'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, Star, ShoppingCart, Copy, Check, 
  ExternalLink, Shield, Clock, Download, MessageCircle,
  Wallet, QrCode, ChevronDown, ChevronUp
} from 'lucide-react';

// Mock product data
const PRODUCT = {
  id: '1',
  title: 'Advanced SEO Blog Writer Agent',
  description: `A powerful AI agent that generates SEO-optimized blog posts for any niche. 

**Features:**
- Keyword research and optimization
- Meta descriptions and title tags
- Internal linking suggestions
- Readability scoring
- Multiple content formats (listicles, how-tos, guides)

**What you get:**
- Complete prompt library (50+ prompts)
- Workflow automation scripts
- Setup guide and documentation
- 30-day email support`,
  price: 49,
  category: 'AI Agents',
  tags: ['SEO', 'Content', 'Marketing', 'Automation'],
  rating: 4.8,
  reviews: 24,
  sales: 156,
  created: '2026-01-15',
  deliveryType: 'auto',
  previewImage: '/placeholder-product.png',
  seller: {
    name: 'ContentKing',
    avatar: '',
    rating: 4.9,
    totalSales: 1240,
    joined: '2025-06',
  },
  payment: {
    wallet: 'TXkR7...8dF9',
    qrCode: '/placeholder-qr.png',
    coins: ['USDT', 'USDC', 'BTC'],
  },
};

export default function ProductDetailPage() {
  const t = useTranslations('ProductDetail');
  const [copied, setCopied] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const copyWallet = () => {
    navigator.clipboard.writeText(PRODUCT.payment.wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-50">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              My Skill Shop
            </Link>
          </div>
          <Link href="/user">
            <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              {t('nav.dashboard')}
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Image */}
            <div className="aspect-video bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden">
              <div className="text-slate-500 text-center">
                <div className="text-6xl mb-2">🤖</div>
                <p>Preview Image</p>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {PRODUCT.category}
                </Badge>
                {PRODUCT.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-slate-700 text-slate-400">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{PRODUCT.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-slate-400 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">{PRODUCT.rating}</span>
                  <span>({PRODUCT.reviews} {t('reviews')})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{PRODUCT.sales} {t('sales')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{PRODUCT.created}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">{t('description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                    {PRODUCT.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    {PRODUCT.deliveryType === 'auto' ? (
                      <Download className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {PRODUCT.deliveryType === 'auto' ? t('delivery.auto') : t('delivery.manual')}
                    </p>
                    <p className="text-sm text-slate-400">
                      {PRODUCT.deliveryType === 'auto' ? t('delivery.autoDesc') : t('delivery.manualDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="bg-slate-900/50 border-slate-800 sticky top-24">
              <CardContent className="pt-6 space-y-6">
                {/* Price */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">${PRODUCT.price}</p>
                  <p className="text-sm text-slate-400 mt-1">{t('oneTime')}</p>
                </div>

                {/* Buy Button */}
                <Button 
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-500 gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('buyNow')}
                  {showPayment ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>

                {/* Payment Info (Expanded) */}
                {showPayment && (
                  <div className="space-y-4 pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400">{t('payment.instruction')}</p>
                    
                    {/* Wallet Address */}
                    <div className="space-y-2">
                      <label className="text-sm text-slate-300">{t('payment.wallet')}</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-800 px-3 py-2 rounded text-sm font-mono text-slate-300 truncate">
                          {PRODUCT.payment.wallet}
                        </code>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={copyWallet}
                          className="border-slate-700 shrink-0"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white p-4 rounded-lg w-fit mx-auto">
                      <div className="w-32 h-32 bg-slate-200 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-slate-400" />
                      </div>
                    </div>

                    {/* Accepted Coins */}
                    <div className="flex justify-center gap-2">
                      {PRODUCT.payment.coins.map(coin => (
                        <Badge key={coin} variant="outline" className="border-slate-600 text-slate-300">
                          {coin}
                        </Badge>
                      ))}
                    </div>

                    {/* Confirm Payment Button */}
                    <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 gap-2">
                      <Check className="w-4 h-4" />
                      {t('payment.confirm')}
                    </Button>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Shield className="w-4 h-4" />
                    {t('trust.secure')}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Wallet className="w-4 h-4" />
                    {t('trust.direct')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Card */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">{t('seller.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-slate-700">
                    <AvatarImage src={PRODUCT.seller.avatar} />
                    <AvatarFallback className="bg-slate-800 text-slate-300">
                      {PRODUCT.seller.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{PRODUCT.seller.name}</p>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{PRODUCT.seller.rating}</span>
                      <span>·</span>
                      <span>{PRODUCT.seller.totalSales} {t('seller.sales')}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-400">
                  {t('seller.joined')} {PRODUCT.seller.joined}
                </p>
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t('seller.contact')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
