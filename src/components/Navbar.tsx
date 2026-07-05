'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-cyan to-gold bg-clip-text text-transparent">
            Emperor Picks
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/predictions" className="hover:text-cyan transition">Predictions</Link>
            <Link href="/accumulators" className="hover:text-cyan transition">Accumulators</Link>
            <Link href="/community" className="hover:text-cyan transition">Community</Link>
          </div>
        </div>

        {session && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || ''}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
              )}
              <div className="hidden md:block">
                <p className="text-sm font-medium">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center gap-2 bg-red-600/80 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}