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
      <Card className="h-full overflow-hidden border-gray-200 bg-white hover:shadow-lg hover:border-purple-200 transition-all duration-300 flex flex-col">
        {/* Cover Image Area */}
        <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-indigo-50 relative flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Brain className="w-12 h-12 text-purple-200 group-hover:text-purple-300 transition-colors" />
          )}
          {category && (
            <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-purple-700 shadow-sm font-medium hover:bg-white">
              {category}
            </Badge>
          )}
        </div>

        <CardContent className="p-5 flex-grow">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-gray-100">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                {author?.[0]?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500 truncate">{author}</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto flex justify-between items-center border-t border-gray-50 bg-gray-50/50">
          <span className="text-xs font-medium text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">
            Digital
          </span>
          <div className="text-xl font-bold text-gray-900">
            ${price}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
