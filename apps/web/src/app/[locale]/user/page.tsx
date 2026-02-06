'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Package, ShoppingBag, Wallet, Settings, Plus, 
  TrendingUp, Clock, CheckCircle, XCircle, ArrowUpRight
} from 'lucide-react';

// Mock user data
const USER = {
  name: 'CryptoWizard',
  email: 'wizard@example.com',
  avatar: '',
  wallet: '0x1234...5678',
  balance: 2450,
  totalSales: 12,
  totalPurchases: 5,
};

// Mock orders (as buyer)
const MY_ORDERS = [
  { id: 1, product: 'SEO Blog Writer Pro', seller: 'ContentKing', price: 49, status: 'completed', date: '2026-02-05' },
  { id: 2, product: 'Midjourney Prompt Pack', seller: 'ArtAI', price: 15, status: 'pending', date: '2026-02-04' },
  { id: 3, product: 'React Component Library', seller: 'DevMaster', price: 79, status: 'cancelled', date: '2026-02-01' },
];

// Mock products (as seller)
const MY_PRODUCTS = [
  { id: 1, title: 'Advanced Trading Agent', price: 150, sales: 8, status: 'active', created: '2026-01-15' },
  { id: 2, title: 'DeFi Analytics Dashboard', price: 99, sales: 4, status: 'active', created: '2026-01-20' },
  { id: 3, title: 'NFT Minting Bot', price: 199, sales: 0, status: 'pending', created: '2026-02-03' },
];

// Mock sales (as seller)
const MY_SALES = [
  { id: 'SALE001', product: 'Advanced Trading Agent', buyer: 'Alice', price: 150, date: '2026-02-05' },
  { id: 'SALE002', product: 'Advanced Trading Agent', buyer: 'Bob', price: 150, date: '2026-02-04' },
  { id: 'SALE003', product: 'DeFi Analytics Dashboard', buyer: 'Charlie', price: 99, date: '2026-02-03' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { color: string; icon: React.ReactNode }> = {
    completed: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: <CheckCircle className="w-3 h-3" /> },
    active: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: <CheckCircle className="w-3 h-3" /> },
    pending: { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: <Clock className="w-3 h-3" /> },
    cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: <XCircle className="w-3 h-3" /> },
  };
  const { color, icon } = config[status] || config.pending;
  
  return (
    <Badge variant="outline" className={`${color} gap-1`}>
      {icon}
      {status}
    </Badge>
  );
};

export default function UserDashboard() {
  const t = useTranslations('Dashboard');

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-50">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
            My Skill Shop
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/products/create">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                <Plus className="w-4 h-4" />
                {t('nav.newProduct')}
              </Button>
            </Link>
            <Avatar className="h-8 w-8 border border-slate-700">
              <AvatarImage src={USER.avatar} />
              <AvatarFallback className="bg-slate-800 text-slate-300">{USER.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-slate-700">
              <AvatarImage src={USER.avatar} />
              <AvatarFallback className="bg-slate-800 text-slate-300 text-xl">{USER.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{USER.name}</h1>
              <p className="text-slate-400 text-sm">{USER.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2">
              <Wallet className="w-4 h-4" />
              {USER.wallet}
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('stats.balance')}</p>
                  <p className="text-2xl font-bold text-white">${USER.balance}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Wallet className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('stats.totalSales')}</p>
                  <p className="text-2xl font-bold text-white">{USER.totalSales}</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('stats.purchases')}</p>
                  <p className="text-2xl font-bold text-white">{USER.totalPurchases}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger value="products" className="data-[state=active]:bg-slate-800 gap-2">
              <Package className="w-4 h-4" />
              {t('tabs.myProducts')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-slate-800 gap-2">
              <ShoppingBag className="w-4 h-4" />
              {t('tabs.myOrders')}
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-slate-800 gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('tabs.mySales')}
            </TabsTrigger>
          </TabsList>

          {/* My Products Tab */}
          <TabsContent value="products">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{t('products.title')}</CardTitle>
                    <CardDescription className="text-slate-400">{t('products.description')}</CardDescription>
                  </div>
                  <Link href="/products/create">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-500 gap-2">
                      <Plus className="w-4 h-4" />
                      {t('products.add')}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MY_PRODUCTS.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-white">{product.title}</h4>
                          <StatusBadge status={product.status} />
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          {t('products.sales')}: {product.sales} · {t('products.created')}: {product.created}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${product.price}</p>
                        <Link href={`/products/${product.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 mt-1">
                            {t('products.view')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">{t('orders.title')}</CardTitle>
                <CardDescription className="text-slate-400">{t('orders.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MY_ORDERS.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-white">{order.product}</h4>
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          {t('orders.seller')}: {order.seller} · {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${order.price}</p>
                        <Button variant="ghost" size="sm" className="text-slate-500 mt-1 gap-1" disabled>
                          {t('orders.view')}
                          <ArrowUpRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Sales Tab */}
          <TabsContent value="sales">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">{t('sales.title')}</CardTitle>
                <CardDescription className="text-slate-400">{t('sales.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MY_SALES.map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{sale.product}</h4>
                        <p className="text-sm text-slate-400 mt-1">
                          {t('sales.buyer')}: {sale.buyer} · {sale.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">+${sale.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
