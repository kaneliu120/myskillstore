import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data fetcher
async function getProduct(id: string) {
  // TODO: Replace with real API call
  return {
    id,
    title: "Advanced Trading Agent",
    description: "A fully autonomous crypto trading bot with risk management.",
    price: 150.00,
    author: {
      name: "CryptoWizard",
      avatar: "https://github.com/shadcn.png"
    },
    tags: ["Crypto", "Python", "Automation"],
    isPurchased: false, // Change this to test "Purchased" state
    isOwner: false,     // Change this to test "Seller" state
    deliveryType: "auto_hosted"
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  // Note: Server Components cannot use hooks like useTranslations directly in async body easily in all versions, 
  // but next-intl works. For simplicity in this mock, I'll use hardcoded labels or pass translation keys.
  // Real implementation: use `getTranslations` on server side.
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: Product Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={product.author.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>By {product.author.name}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {product.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <Separator />

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
              <br/><br/>
              (More detailed description would go here. Supports Markdown rendering in the future.)
            </p>
          </div>
        </div>

        {/* Right Column: Action Card */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Purchase</CardTitle>
              <CardDescription>Instant delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</div>
              <ul className="text-sm space-y-2 text-muted-foreground mb-6">
                <li>✓ Source Code Included</li>
                <li>✓ Lifetime Updates</li>
                <li>✓ Crypto Payment</li>
              </ul>
            </CardContent>
            <CardFooter>
              {product.isOwner ? (
                <Button className="w-full" variant="outline">Edit Product</Button>
              ) : product.isPurchased ? (
                <Button className="w-full bg-green-600 hover:bg-green-500">Download Now</Button>
              ) : (
                <Button className="w-full size-lg">Buy Now</Button>
              )}
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
