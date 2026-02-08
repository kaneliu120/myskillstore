import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  author: string;
  authorAvatar?: string;
  coverUrl?: string; // Placeholder for now
  category?: string;
}

export default function ProductCard({ id, title, price, author, authorAvatar, coverUrl, category }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-200/40 transition-all duration-500 group">
        {/* Cover Image Placeholder */}
        <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-indigo-50 relative flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            <img src={coverUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="text-purple-200 font-bold text-4xl group-hover:scale-125 transition-transform duration-700">✧</div>
          )}
          {category && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-purple-600 uppercase tracking-wider shadow-sm">
              {category}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 line-clamp-1 mb-3 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                <img src={authorAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${author}`} alt={author} />
              </div>
              <span className="text-xs font-medium text-gray-500">{author}</span>
            </div>
            <div className="text-lg font-black text-gray-900">${price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
