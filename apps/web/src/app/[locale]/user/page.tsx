'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Package, ShoppingBag, Wallet, Settings, Plus, Boxes,
  TrendingUp, Clock, CheckCircle, XCircle, ArrowUpRight
} from 'lucide-react';

const USER = {
  name: 'CryptoWizard',
  email: 'wizard@example.com',
  avatar: '',
  wallet: '0x1234...5678',
  balance: 2450,
  totalSales: 12,
  totalPurchases: 5,
};

const MY_ORDERS = [
  { id: 1, product: 'SEO Blog Writer Pro', seller: 'ContentKing', price: 49, status: 'completed', date: '2026-02-05' },
  { id: 2, product: 'Midjourney Prompt Pack', seller: 'ArtAI', price: 15, status: 'pending', date: '2026-02-04' },
  { id: 3, product: 'React Component Library', seller: 'DevMaster', price: 79, status: 'cancelled', date: '2026-02-01' },
];

const MY_PRODUCTS = [
  { id: 1, title: 'Advanced Trading Agent', price: 150, sales: 8, status: 'active', created: '2026-01-15' },
  { id: 2, title: 'DeFi Analytics Dashboard', price: 99, sales: 4, status: 'active', created: '2026-01-20' },
  { id: 3, title: 'NFT Minting Bot', price: 199, sales: 0, status: 'pending', created: '2026-02-03' },
];

const MY_SALES = [
  { id: 'SALE001', product: 'Advanced Trading Agent', buyer: 'Alice', price: 150, date: '2026-02-05' },
  { id: 'SALE002', product: 'Advanced Trading Agent', buyer: 'Bob', price: 150, date: '2026-02-04' },
  { id: 'SALE003', product: 'DeFi Analytics Dashboard', buyer: 'Charlie', price: 99, date: '2026-02-03' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { color: string; icon: React.ReactNode }> = {
    completed: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle className="w-3 h-3" /> },
    active: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle className="w-3 h-3" /> },
    pending: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="w-3 h-3" /> },
    cancelled: { color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle className="w-3 h-3" /> },
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
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-lg font-bold text-gray-900">
              MySkillStore
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/products/create">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2 rounded-lg">
                <Plus className="w-4 h-4" />
                {t('nav.newProduct')}
              </Button>
            </Link>
            <Avatar className="h-9 w-9 border-2 border-purple-100">
              <AvatarImage src={USER.avatar} />
              <AvatarFallback className="bg-purple-100 text-purple-600">{USER.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-purple-100">
              <AvatarImage src={USER.avatar} />
              <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">{USER.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{USER.name}</h1>
              <p className="text-gray-500 text-sm">{USER.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 gap-2 rounded-lg">
              <Wallet className="w-4 h-4" />
              {USER.wallet}
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{t('stats.balance')}</p>
                  <p className="text-2xl font-bold text-gray-900">${USER.balance}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Wallet className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{t('stats.totalSales')}</p>
                  <p className="text-2xl font-bold text-gray-900">{USER.totalSales}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{t('stats.purchases')}</p>
                  <p className="text-2xl font-bold text-gray-900">{USER.totalPurchases}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-xl">
            <TabsTrigger value="products" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg gap-2">
              <Package className="w-4 h-4" />
              {t('tabs.myProducts')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg gap-2">
              <ShoppingBag className="w-4 h-4" />
              {t('tabs.myOrders')}
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('tabs.mySales')}
            </TabsTrigger>
          </TabsList>

          {/* My Products Tab */}
          <TabsContent value="products">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">{t('products.title')}</CardTitle>
                    <CardDescription className="text-gray-500">{t('products.description')}</CardDescription>
                  </div>
                  <Link href="/products/create">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 gap-2 rounded-lg">
                      <Plus className="w-4 h-4" />
                      {t('products.add')}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MY_PRODUCTS.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-gray-900">{product.title}</h4>
                          <StatusBadge status={product.status} />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {t('products.sales')}: {product.sales} · {t('products.created')}: {product.created}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${product.price}</p>
                        <Link href={`/products/${product.id}`}>
                          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 mt-1">
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
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">{t('orders.title')}</CardTitle>
                <CardDescription className="text-gray-500">{t('orders.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MY_ORDERS.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-gray-900">{order.product}</h4>
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {t('orders.seller')}: {order.seller} · {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${order.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Sales Tab */}
          <TabsContent value="sales">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">{t('sales.title')}</CardTitle>
                <CardDescription className="text-gray-500">{t('sales.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MY_SALES.map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{sale.product}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {t('sales.buyer')}: {sale.buyer} · {sale.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">+${sale.price}</p>
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
