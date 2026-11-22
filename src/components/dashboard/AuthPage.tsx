import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Lock, Mail, Building2, User, Loader2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setError(null);
  }, [mode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const result =
      mode === 'signin'
        ? await signIn({ email, password })
        : await signUp({ email, password, businessName, fullName });

    setBusy(false);
    if (result.error) setError(result.error);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-navy-900 via-brand-700 to-navy-900 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-brand-500/20 blur-[140px]" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[420px] w-[420px] rounded-full bg-accent-500/15 blur-[140px]" />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight">
            One dashboard for every channel you sell on.
          </h2>
          <p className="mt-5 text-base leading-[1.6] text-ink-300">
            Manage products, track inventory, and grow your business from a single
            command center. Built for merchants who sell everywhere.
          </p>
        </div>

        <div className="relative z-10 text-sm text-ink-400">
          &copy; {new Date().getFullYear()} SellVnd
        </div>
      </div>

      <div className="flex items-center justify-center bg-ink-50 p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <span className="lg:hidden">
              <Logo tone="dark" />
            </span>
            <a href="/" className="text-sm font-medium text-ink-500 transition-colors hover:text-ink-800">
              Back to site
            </a>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-navy-900">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {mode === 'signin'
              ? 'Sign in to your SellVnd dashboard.'
              : 'Start managing your products and inventory in minutes.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === 'signup' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  icon={<Building2 className="h-4 w-4" />}
                  label="Business name"
                  type="text"
                  value={businessName}
                  onChange={setBusinessName}
                  required
                  autoComplete="organization"
                />
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="Your name"
                  type="text"
                  value={fullName}
                  onChange={setFullName}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <Field
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-error-500/30 bg-error-500/5 px-4 py-3 text-sm font-medium text-error-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(225,48,108,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(225,48,108,0.75)] disabled:translate-y-0 disabled:opacity-70"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
}

function Field({ icon, label, type, value, onChange, required, autoComplete }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
        />
      </div>
    </div>
  );
}
