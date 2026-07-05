'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const registered = searchParams.get('registered');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  const result = await signIn('credentials', {
    email: formData.email,
    password: formData.password,
    redirect: false,
    callbackUrl: '/dashboard',
  });

  setLoading(false);

  if (result?.error) {
    setError('Invalid email or password');
  } else {
    router.push('/dashboard');
  }
};

  const handleTestLogin = async () => {
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email: 'test@emperorpicks.com',
      password: 'test123',
      redirect: false,
      callbackUrl: '/dashboard',
    });

    setLoading(false);

    if (result?.error) {
      setError('Test login failed. Please check your NextAuth configuration.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-royal-blue/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-cyan/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan to-gold bg-clip-text text-transparent mb-2">
              Emperor Picks
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {registered && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-green-200 text-sm mb-6">
              Account created successfully! Please sign in.
            </div>
          )}

          <button
            type="button"
            onClick={handleTestLogin}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl mb-6 transition disabled:opacity-50"
          >
            🔧 Login with Test Account (test@emperorpicks.com / test123)
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-cyan/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-cyan/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-cyan"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-royal-blue to-cyan text-white font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 px-4 rounded-xl font-medium hover:bg-gray-100 transition mt-4 disabled:opacity-50"
          >
            Continue with Google
          </button>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-cyan hover:text-gold transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}