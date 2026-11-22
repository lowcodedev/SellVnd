import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const { profile, refreshProfile, user } = useAuth();
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setBusinessName(profile.business_name);
      setFullName(profile.full_name);
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from('profiles')
      .update({ business_name: businessName.trim(), full_name: fullName.trim() })
      .eq('id', user!.id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      await refreshProfile();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-white p-6">
        <h2 className="text-base font-bold text-navy-900">Business profile</h2>
        <p className="mt-1 text-sm text-ink-400">
          Update your business name and personal details. This appears across your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Business name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              maxLength={200}
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-navy-900 transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Your name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={200}
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-navy-900 transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
            <input
              type="email"
              value={user?.email ?? ''}
              disabled
              className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-500"
            />
            <p className="mt-1.5 text-xs text-ink-400">Email cannot be changed here.</p>
          </div>

          <div className="flex items-center gap-3 border-t border-ink-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(225,48,108,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save changes
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success-600">
                <Check className="h-4 w-4" />
                Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
