'use client';

import { useState, useEffect, use } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, Star, ShoppingCart, Copy, Check, Boxes,
  Shield, Clock, Download, MessageCircle, Brain,
  Wallet, QrCode, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';

interface ProductUser {
  username: string;
  // Add other user fields if available from API, otherwise we use defaults
}

interface Product {
  id: string;
  title: string;
  description: string;
  price_usd: number;
  category: string;
  tags: string | string[]; // Handle both cases just in be safe
  delivery_type: 'auto_hosted' | 'manual';
  seller: ProductUser;
  created_at: string;
  // UI specific fields that might not be in API yet, keep optional
  rating?: number;
  reviews?: number;
  sales?: number;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('ProductDetail');
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [copied, setCopied] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/products/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const copyWallet = () => {
    // Mock wallet for now as it's not in the product API
    navigator.clipboard.writeText('TXkR7...8dF9');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-medium">{error || 'Product not found'}</p>
        <Link href="/products">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // Data mapping helper
  const displayTags = Array.isArray(product.tags) 
    ? product.tags 
    : (product.tags as string)?.split(',').map(t => t.trim()) || [];
    
  const displayPrice = product.price_usd;
  const displayDeliveryType = product.delivery_type === 'auto_hosted' ? 'auto' : 'manual';
  
  // Mock data for missing API fields to maintain UI fidelity
  const mockStats = {
    rating: 4.8,
    reviews: 24,
    sales: 156,
    sellerRating: 4.9,
    sellerTotalSales: 1240,
    sellerJoined: '2025-06',
    wallet: 'TXkR7...8dF9',
    coins: ['USDT', 'USDC', 'BTC']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
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

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
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
                  {product.category}
                </Badge>
                {displayTags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-gray-200 text-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-gray-900 font-medium">{mockStats.rating}</span>
                  <span>({mockStats.reviews} {t('reviews')})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{mockStats.sales} {t('sales')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(product.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Mobile Price Card (Visible on Mobile Only) */}
            <Card className="lg:hidden bg-white border-gray-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500">{t('oneTime')}</p>
                    <p className="text-3xl font-bold text-gray-900">${displayPrice}</p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700 gap-2 rounded-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('buyNow')}
                  {showPayment ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>

                {showPayment && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">{t('payment.instruction')}</p>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700">{t('payment.wallet')}</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono text-gray-700 truncate">
                          {mockStats.wallet}
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
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">{t('description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap break-words text-gray-600 leading-relaxed">
                  {product.description}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    {displayDeliveryType === 'auto' ? (
                      <Download className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {displayDeliveryType === 'auto' ? t('delivery.auto') : t('delivery.manual')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {displayDeliveryType === 'auto' ? t('delivery.autoDesc') : t('delivery.manualDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card (Desktop Only) */}
            <Card className="hidden lg:block bg-white border-gray-200 sticky top-24">
              <CardContent className="pt-6 space-y-6">
                {/* Price */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">${displayPrice}</p>
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
                          {mockStats.wallet}
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
                      {mockStats.coins.map(coin => (
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
                    <AvatarImage src="" /> {/* Avatar API support pending */}
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {product.seller.username?.[0]?.toUpperCase() || 'S'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{product.seller.username}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{mockStats.sellerRating}</span>
                      <span>·</span>
                      <span>{mockStats.sellerTotalSales} {t('seller.sales')}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {t('seller.joined')} {mockStats.sellerJoined}
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