'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  LayoutDashboard, Users, BookOpen, BarChart3, LogOut, Home, Shield,
} from 'lucide-react';

const ADMIN_EMAILS = [
  'masa@unicornfarm.co',
  'yabuki@aihub.co.jp',
  'arai@aihub.co.jp',
];

const NAV_ITEMS = [
  { href: '/admin', label: 'ダッシュボード', icon: LayoutDashboard },
  { href: '/admin/users', label: 'ユーザー管理', icon: Users },
  { href: '/admin/content', label: 'コンテンツ管理', icon: BookOpen },
  { href: '/admin/analytics', label: 'アナリティクス', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (ADMIN_EMAILS.includes(user.email || '')) {
      setAuthorized(true);
    } else {
      router.push('/');
    }
  }, [user, router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-[240px] bg-gray-900 text-white flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-5 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="font-bold text-[15px]">CW Admin</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-1">{user?.email}</div>
        </div>

        <nav className="flex-1 py-3">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-2.5 text-[14px] no-underline transition-colors ${
                  isActive ? 'bg-gray-800 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 py-3">
          <Link href="/" className="flex items-center gap-3 px-5 py-2.5 text-[14px] text-gray-400 hover:text-white no-underline transition-colors">
            <Home className="w-4 h-4" /> サイトへ戻る
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-5 py-2.5 text-[14px] text-gray-400 hover:text-red-400 bg-transparent border-none cursor-pointer transition-colors text-left"
          >
            <LogOut className="w-4 h-4" /> ログアウト
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
