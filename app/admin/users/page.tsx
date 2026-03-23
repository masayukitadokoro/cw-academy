'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Users, Search, Clock, Mail } from 'lucide-react';

interface UserRow {
  user_id: string;
  display_name: string | null;
  email: string | null;
  creator_tier: string | null;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const supabase = createClient();
      const { data } = await supabase
        .from('profiles')
        .select('user_id, display_name, email, creator_tier, created_at')
        .order('created_at', { ascending: false });
      setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const filtered = users.filter(u =>
    (u.display_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (d: string) => {
    const date = new Date(d);
    return `${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
  };

  const tierColor = (tier: string | null) => {
    switch (tier) {
      case 'tier1': case 'tier2': return 'bg-purple-100 text-purple-700';
      case 'tier3': return 'bg-blue-100 text-blue-700';
      case 'tier4': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-gray-400" /> ユーザー管理
        </h1>
        <div className="text-[14px] text-gray-500">{users.length} 人</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="名前・メールで検索..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">読み込み中...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">ユーザーが見つかりません</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-[12px] text-gray-500 uppercase">
                <th className="text-left px-4 py-3 font-medium">ユーザー</th>
                <th className="text-left px-4 py-3 font-medium">メール</th>
                <th className="text-left px-4 py-3 font-medium">Tier</th>
                <th className="text-left px-4 py-3 font-medium">登録日</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.user_id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                        {u.display_name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-[14px] font-medium text-gray-800">{u.display_name || '未設定'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-500 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {u.email || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${tierColor(u.creator_tier)}`}>
                      {u.creator_tier || 'tier5'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {formatDate(u.created_at)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
