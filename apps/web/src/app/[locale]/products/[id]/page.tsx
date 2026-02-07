'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, Star, ShoppingCart, Copy, Check, Boxes,
  Shield, Clock, Download, MessageCircle, Brain,
  Wallet, QrCode, ChevronDown, ChevronUp
} from 'lucide-react';

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
  seller: {
    name: 'ContentKing',
    avatar: '',
    rating: 4.9,
    totalSales: 1240,
    joined: '2025-06',
  },
  payment: {
    wallet: 'TXkR7...8dF9',
    coins: ['USDT', 'USDC', 'BTC'],
  },
};

export default function ProductDetailPage() {
  const t = useTranslations('ProductDetail');
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [copied, setCopied] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const copyWallet = () => {
    navigator.clipboard.writeText(PRODUCT.payment.wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-gray-500 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-lg font-bold text-gray-900">
                MySkillStore
              </Link>
            </div>
          </div>
          <Link href="/user">
            <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg">
              {t('nav.dashboard')}
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Image */}
            <div className="aspect-video bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <Brain className="w-20 h-20 text-purple-300 mx-auto mb-2" />
                <p className="text-gray-400">{isZh ? '预览图片' : 'Preview Image'}</p>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  {PRODUCT.category}
                </Badge>
                {PRODUCT.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-gray-200 text-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{PRODUCT.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-gray-900 font-medium">{PRODUCT.rating}</span>
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
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">{t('description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-600 leading-relaxed">
                  {PRODUCT.description}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    {PRODUCT.deliveryType === 'auto' ? (
                      <Download className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {PRODUCT.deliveryType === 'auto' ? t('delivery.auto') : t('delivery.manual')}
                    </p>
                    <p className="text-sm text-gray-500">
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
            <Card className="bg-white border-gray-200 sticky top-24">
              <CardContent className="pt-6 space-y-6">
                {/* Price */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">${PRODUCT.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('oneTime')}</p>
                </div>

                {/* Buy Button */}
                <Button 
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700 gap-2 rounded-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('buyNow')}
                  {showPayment ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>

                {/* Payment Info (Expanded) */}
                {showPayment && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">{t('payment.instruction')}</p>
                    
                    {/* Wallet Address */}
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700">{t('payment.wallet')}</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono text-gray-700 truncate">
                          {PRODUCT.payment.wallet}
                        </code>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={copyWallet}
                          className="border-gray-200 shrink-0"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white border border-gray-200 p-4 rounded-xl w-fit mx-auto">
                      <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                    </div>

                    {/* Accepted Coins */}
                    <div className="flex justify-center gap-2">
                      {PRODUCT.payment.coins.map(coin => (
                        <Badge key={coin} variant="outline" className="border-gray-200 text-gray-600">
                          {coin}
                        </Badge>
                      ))}
                    </div>

                    {/* Confirm Payment Button */}
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 gap-2 rounded-lg">
                      <Check className="w-4 h-4" />
                      {t('payment.confirm')}
                    </Button>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    {t('trust.secure')}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Wallet className="w-4 h-4" />
                    {t('trust.direct')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Card */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 text-base">{t('seller.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-purple-100">
                    <AvatarImage src={PRODUCT.seller.avatar} />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {PRODUCT.seller.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{PRODUCT.seller.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{PRODUCT.seller.rating}</span>
                      <span>·</span>
                      <span>{PRODUCT.seller.totalSales} {t('seller.sales')}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {t('seller.joined')} {PRODUCT.seller.joined}
                </p>
                <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 gap-2 rounded-lg">
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
