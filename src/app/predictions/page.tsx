'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { Clock, TrendingUp, Star } from 'lucide-react';

export default function PredictionsPage() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0A1428] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">Predictions</h1>
              <p className="text-gray-400 mt-2">
                AI-Powered Football Predictions • High Confidence Matches
              </p>
            </div>
            <div className="text-sm text-gray-400">
              Welcome back, <span className="text-cyan-400">{session?.user?.name}</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Today&apos;s Predictions</p>
              <p className="text-4xl font-bold text-cyan-400 mt-2">14</p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Avg Confidence</p>
              <p className="text-4xl font-bold text-emerald-400 mt-2">78%</p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Win Rate (7d)</p>
              <p className="text-4xl font-bold mt-2">71%</p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Hot Streak</p>
              <p className="text-4xl font-bold text-amber-400 mt-2">5</p>
            </div>
          </div>

          {/* Predictions Grid */}
          <div className="bg-gray-900 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Today&apos;s Top Predictions</h2>
              <div className="text-sm text-cyan-400 flex items-center gap-2">
                <Clock size={18} /> Updated just now
              </div>
            </div>

            <div className="text-center py-24 text-gray-400 border border-dashed border-gray-700 rounded-2xl">
              <Star className="mx-auto mb-6 text-5xl text-cyan-400" />
              <p className="text-2xl mb-4">Match Predictions Will Appear Here</p>
              <p className="max-w-md mx-auto">
                This section will display AI-generated predictions with confidence levels, 
                expected goals, and betting recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}