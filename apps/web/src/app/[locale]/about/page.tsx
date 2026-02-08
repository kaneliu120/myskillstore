'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Users, Rocket, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const stats = [
    { label: isZh ? '创作者' : 'Creators', value: '10K+' },
    { label: isZh ? '技能数量' : 'Skills', value: '50K+' },
    { label: isZh ? '用户' : 'Users', value: '1M+' },
    { label: isZh ? '交易额' : 'Transactions', value: '$5M+' },
  ];

  const team = [
    { name: 'Alex Chen', role: 'CEO & Founder', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' },
    { name: 'Sarah Wu', role: 'CTO', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    { name: 'Mike Johnson', role: 'Product Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
    { name: 'Emily Zhang', role: 'Design Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {isZh ? '赋能AI时代的每一位创作者' : 'Empowering Creators in the AI Era'}
          </h1>
          <p className="text-xl md:text-2xl text-purple-100/80 max-w-2xl mx-auto">
            {isZh 
              ? '我们的使命是让每一个有才华的人都能通过分享智慧获得回报。' 
              : 'Our mission is to enable every talented individual to monetize their wisdom through sharing.'}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-600">
                {isZh ? '我们的故事' : 'Our Story'}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {isZh 
                  ? 'My Skill Shop 成立于 2024 年，旨在解决 AI 时代下知识产权确权与变现的难题。我们要打造一个去中心化的、透明的、高效的技能交易平台。'
                  : 'Founded in 2024, My Skill Shop aims to solve the challenges of IP verification and monetization in the AI era. We are building a decentralized, transparent, and efficient skill trading platform.'}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {isZh
                  ? '我们相信，未来的工作方式是个体崛起的时代。每个人都是一家公司，每个人都可以出售自己的独特技能。'
                  : 'We believe the future of work belongs to individuals. Everyone is a company, and everyone can sell their unique skills.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-6 rounded-2xl">
                <Rocket className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="font-bold mb-2">{isZh ? '创新' : 'Innovation'}</h3>
                <p className="text-sm text-gray-500">{isZh ? '持续推动技术边界' : 'Pushing boundaries'}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl">
                <Users className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-bold mb-2">{isZh ? '社区' : 'Community'}</h3>
                <p className="text-sm text-gray-500">{isZh ? '以创作者为核心' : 'Creator-centric'}</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl">
                <Heart className="w-8 h-8 text-pink-600 mb-4" />
                <h3 className="font-bold mb-2">{isZh ? '热爱' : 'Passion'}</h3>
                <p className="text-sm text-gray-500">{isZh ? '做有温度的产品' : 'Building with love'}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl">
                <Award className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold mb-2">{isZh ? '卓越' : 'Excellence'}</h3>
                <p className="text-sm text-gray-500">{isZh ? '追求极致体验' : 'Pursuing quality'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-black text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">
            {isZh ? '遇见我们的团队' : 'Meet Our Team'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-100 group-hover:border-purple-300 transition-colors">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-purple-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
