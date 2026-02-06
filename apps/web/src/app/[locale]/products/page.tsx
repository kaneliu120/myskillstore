'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string | null;
  seller_id: number;
  seller: {
    username: string;
  };
}

export default function ProductsPage() {
  const t = useTranslations('Index'); // 复用 Index 的翻译或者新建 Products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', {
          params: { status: 'approved' }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Skills</h1>
        <Link href="/products/create">
          <Button>List a Skill</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              id={String(product.id)} 
              title={product.title}
              price={parseFloat(product.price)}
              author={product.seller.username}
              coverUrl={product.image_url || undefined}
              category={product.category}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No skills found.</p>
          <Link href="/products/create">
            <Button variant="outline">Be the first to list one!</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
