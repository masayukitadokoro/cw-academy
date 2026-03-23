'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  Home, History, Bookmark, User, LogOut, BookOpen, BarChart3,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/mypage', label: 'ダッシュボード', icon: BarChart3 },
  { href: '/mypage/history', label: '視聴履歴', icon: History },
  { href: '/mypage/bookmarks', label: 'ブックマーク', icon: Bookmark },
  { href: '/mypage/settings/profile', label: 'プロフィール編集', icon: User },
];

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  if (!user) {
    if (typeof window !== 'undefined') router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-14">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[14px] text-gray-900">CW Academy</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[13px] text-gray-500 hover:text-gray-700 no-underline flex items-center gap-1">
              <Home className="w-4 h-4" /> トップ
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                {profile?.display_name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-[13px] font-medium text-gray-700 hidden sm:block">{profile?.display_name || 'ユーザー'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <nav className="w-[220px] shrink-0 hidden md:block">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-[14px] no-underline transition-colors ${
                    isActive ? 'bg-red-50 text-red-700 font-semibold border-l-3 border-red-500' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={isActive ? { borderLeft: '3px solid #DC2626' } : { borderLeft: '3px solid transparent' }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer border-t border-gray-100"
              style={{ borderLeft: '3px solid transparent', borderTop: '1px solid #f3f4f6' }}
            >
              <LogOut className="w-4 h-4" />
              ログアウト
            </button>
          </div>
        </nav>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
