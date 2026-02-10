'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import api from '@/lib/api';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published_at: string;
    reading_time?: string;
}

export default function BlogSection({ locale }: { locale: string }) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const isZh = locale === 'zh';

    const mockPosts: BlogPost[] = [
        {
            id: 1,
            title: isZh ? '如何将您的行业经验转化为 AI 技能并获利' : 'How to Monetize Your Industry Expertise as AI Skills',
            slug: 'how-to-monetize-expertise',
            excerpt: isZh ? '在 AI 时代，深厚的行业洞察是新的硬通货。学习如何将其打包成可销售的数字化资产。' : 'In the AI era, deep industry insight is the new currency. Learn how to package it into tradable digital assets.',
            content: '',
            cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            published_at: new Date().toISOString(),
            reading_time: '5 min'
        },
        {
            id: 2,
            title: isZh ? 'Prompt 工程：从对话到商业产品的飞跃' : 'Prompt Engineering: From Chatting to Commercial Products',
            slug: 'prompt-engineering-business',
            excerpt: isZh ? '不仅仅是聊天。发现如何构建能够解决实际商业问题的专业级 Prompt 技能。' : 'More than just chatting. Discover how to build professional-grade prompt skills that solve real business problems.',
            content: '',
            cover_image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800',
            published_at: new Date().toISOString(),
            reading_time: '4 min'
        },
        {
            id: 3,
            title: isZh ? '未来已来：C2C AI 技能市场的崛起' : 'The Future is Here: Rise of the C2C AI Skill Marketplace',
            slug: 'rise-of-ai-marketplace',
            excerpt: isZh ? '为什么说去中心化的技能交易是 AI 开发者和创作者的下一个重大机遇？' : 'Why decentralized skill trading is the next big opportunity for AI developers and creators.',
            content: '',
            cover_image: 'https://images.unsplash.com/photo-1684369585053-5e76d338f0be?auto=format&fit=crop&q=80&w=800',
            published_at: new Date().toISOString(),
            reading_time: '6 min'
        }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/blog', { params: { status: 'published' } });
                if (res.data && res.data.length > 0) {
                    setPosts(res.data.slice(0, 3));
                } else {
                    setPosts(mockPosts);
                }
            } catch (error) {
                console.error('Failed to fetch blog posts, falling back to mock content', error);
                setPosts(mockPosts);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [locale]);

    if (loading) {
        return (
            <>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-500 flex flex-col h-full border-0 bg-white overflow-hidden rounded-3xl ring-1 ring-gray-100">
                    {post.cover_image && (
                        <div className="h-52 overflow-hidden relative">
                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 left-4">
                                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-purple-600 shadow-sm flex items-center gap-1">
                                    <Clock className=\"w-3 h-3\" />
                                    {post.reading_time || '5 min'}
                                </div>
                            </div>
                        </div>
                    )}
                    <CardHeader className="pb-2 pt-6 px-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(post.published_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <CardTitle className="text-xl font-bold leading-snug group-hover:text-purple-600 transition-colors duration-300">
                            <Link href={`/${locale}/blog/${post.slug || post.id}`}>
                                {post.title}
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pt-0 px-6 pb-8">
                        <p className=\"text-gray-500 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed\">
                            {post.excerpt || post.content.substring(0, 100) + '...'}
                        </p>
                        <Link href={`/${locale}/blog/${post.slug || post.id}`} className=\"inline-flex items-center text-purple-600 hover:text-purple-700 text-sm font-bold transition-all group/link\">
                            {isZh ? '阅读更多' : 'Read More'}
                            <div className=\"ml-2 w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover/link:bg-purple-600 group-hover/link:text-white transition-all\">
                                <ArrowRight className=\"w-4 h-4\" />
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
