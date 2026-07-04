'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not logged in
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/auth/login');
    }
  }, [status, session, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1428]">
        <p className="text-xl text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0A1428] text-white p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600/80 hover:bg-red-600 px-6 py-2.5 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-900 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-6">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-24 h-24 rounded-full border-4 border-cyan-500"
              />
            )}

            <div>
              <h2 className="text-4xl font-bold">Welcome back, {session.user?.name}!</h2>
              <p className="text-gray-400 mt-2 text-lg">{session.user?.email}</p>
              {session.user?.id && (
                <p className="text-gray-500 text-sm mt-1">ID: {session.user.id}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-8 rounded-3xl">
            <h3 className="text-cyan-400 font-semibold mb-3">Your Predictions</h3>
            <p className="text-6xl font-bold">24</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl">
            <h3 className="text-cyan-400 font-semibold mb-3">Win Rate</h3>
            <p className="text-6xl font-bold">67%</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl">
            <h3 className="text-cyan-400 font-semibold mb-3">Account Type</h3>
            <p className="text-5xl font-bold text-emerald-400">Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}