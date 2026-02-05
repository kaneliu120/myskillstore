import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');
 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="absolute top-5 right-5 space-x-4">
        <Link href="/en" className="hover:text-blue-400">EN</Link>
        <Link href="/zh" className="hover:text-blue-400">中文</Link>
        <Link href="/tl" className="hover:text-blue-400">Tagalog</Link>
      </div>

      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        {t('title')}
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        {t('subtitle')}
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition">
          {t('login')}
        </button>
        <button className="px-6 py-3 border border-gray-600 rounded-full hover:bg-gray-800 transition">
          {t('dashboard')}
        </button>
      </div>
    </div>
  );
}
