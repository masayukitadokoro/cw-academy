'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase-client';
import { User, Save, Check } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { user, profile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile?.display_name) setDisplayName(profile.display_name);
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase
        .from('profiles')
        .update({ display_name: displayName, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-[22px] font-bold text-gray-900 mb-4 flex items-center gap-2">
        <User className="w-6 h-6 text-gray-400" />
        プロフィール編集
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">表示名</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="表示名を入力"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">メールアドレス</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-[12px] text-gray-400 mt-1">メールアドレスは変更できません</p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[14px] transition border-none cursor-pointer ${
              saved ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400'
            }`}
          >
            {saved ? <><Check className="w-4 h-4" /> 保存しました</> : saving ? '保存中...' : <><Save className="w-4 h-4" /> 保存</>}
          </button>
        </form>
      </div>
    </div>
  );
}
