import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  author: string;
  authorAvatar?: string;
  coverUrl?: string;
  category?: string;
}

export default function ProductCard({ id, title, price, author, authorAvatar, coverUrl, category }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
        {/* Cover Image Placeholder - Light Mode Compatible */}
        <div className="aspect-[4/3] bg-purple-50 relative flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Brain className="w-12 h-12 text-purple-200 group-hover:text-purple-300 transition-colors" />
          )}
          {category && (
            <Badge className="absolute top-3 left-3 bg-white/90 text-purple-700 hover:bg-white backdrop-blur-sm shadow-sm border border-purple-100">
              {category}
            </Badge>
          )}
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors leading-snug">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-auto pt-2">
            <Avatar className="h-6 w-6 border border-gray-100">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback className="bg-purple-100 text-purple-600 text-[10px]">
                {author?.[0]?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500 font-medium truncate">{author}</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between items-center border-t border-gray-50 mt-auto bg-gray-50/30">
          <div className="text-gray-400 text-xs font-medium">12 Sales</div>
          <div className="text-lg font-bold text-purple-600">${price.toFixed(2)}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
