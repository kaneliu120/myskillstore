'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, Upload, FileText, Link as LinkIcon, 
  Wallet, QrCode, Image, DollarSign, Tag,
  CheckCircle, Info
} from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = [
  { id: 'prompts', label: 'Prompts', icon: '💬' },
  { id: 'agents', label: 'AI Agents', icon: '🤖' },
  { id: 'workflows', label: 'Workflows', icon: '⚡' },
  { id: 'code', label: 'Code & Scripts', icon: '💻' },
  { id: 'design', label: 'Design Assets', icon: '🎨' },
  { id: 'data', label: 'Datasets', icon: '📊' },
  { id: 'other', label: 'Other', icon: '📦' },
];

const DELIVERY_TYPES = [
  { id: 'auto', label: 'Auto Delivery', desc: 'System delivers file after payment confirmation', icon: FileText },
  { id: 'manual', label: 'Manual Delivery', desc: 'You deliver via chat/Telegram after confirmation', icon: LinkIcon },
];

export default function CreateProductPage() {
  const t = useTranslations('CreateProduct');
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    price: '',
    deliveryType: 'auto',
    wallet: '',
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/products', {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        tags: formData.tags,
        price_usd: parseFloat(formData.price),
        delivery_type: formData.deliveryType === 'auto' ? 'auto_hosted' : 'manual',
        // wallet information could be stored in user profile or product meta
      });
      router.push('/user'); // Redirect to dashboard
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-50">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/user" className="text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">{t('title')}</h1>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-slate-700 text-slate-400">
              {t('step')} {step}/3
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-400" />
                {t('step1.title')}
              </CardTitle>
              <CardDescription className="text-slate-400">{t('step1.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">{t('step1.productTitle')}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Advanced SEO Blog Writer Agent"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label className="text-slate-300">{t('step1.category')}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateField('category', cat.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        formData.category === cat.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <p className="text-sm mt-1">{cat.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">{t('step1.description_label')}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe what your skill does..."
                  rows={4}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-slate-300">{t('step1.tags')}</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="SEO, content, marketing"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                />
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={!formData.title || !formData.category}
              >
                {t('next')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Pricing & Delivery */}
        {step === 2 && (
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                {t('step2.title')}
              </CardTitle>
              <CardDescription className="text-slate-400">{t('step2.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-300">{t('step2.price')}</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    placeholder="49"
                    className="pl-8 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              {/* Delivery Type */}
              <div className="space-y-3">
                <Label className="text-slate-300">{t('step2.delivery')}</Label>
                <div className="grid gap-3">
                  {DELIVERY_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => updateField('deliveryType', type.id)}
                      className={`p-4 rounded-lg border text-left transition-all flex items-start gap-4 ${
                        formData.deliveryType === type.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${formData.deliveryType === type.id ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
                        <type.icon className={`w-5 h-5 ${formData.deliveryType === type.id ? 'text-blue-400' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${formData.deliveryType === type.id ? 'text-white' : 'text-slate-300'}`}>
                          {type.label}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">{type.desc}</p>
                      </div>
                      {formData.deliveryType === type.id && (
                        <CheckCircle className="w-5 h-5 text-blue-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Placeholder */}
              {formData.deliveryType === 'auto' && (
                <div className="space-y-2">
                  <Label className="text-slate-300">{t('step2.upload')}</Label>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-slate-600 transition cursor-pointer">
                    <Upload className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">{t('step2.upload_hint')}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  {t('back')}
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1 bg-blue-600 hover:bg-blue-500"
                  disabled={!formData.price}
                >
                  {t('next')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment Setup */}
        {step === 3 && (
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-purple-400" />
                {t('step3.title')}
              </CardTitle>
              <CardDescription className="text-slate-400">{t('step3.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">{t('step3.info')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-slate-300">{t('step3.wallet')}</Label>
                <Input
                  id="wallet"
                  value={formData.wallet}
                  onChange={(e) => updateField('wallet', e.target.value)}
                  placeholder="0x1234...5678 or TRC20/BEP20 address"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 font-mono"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  {t('back')}
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || !formData.wallet}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                >
                  {loading ? 'Submitting...' : t('submit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-blue-500' : s < step ? 'w-2 bg-blue-500/50' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
