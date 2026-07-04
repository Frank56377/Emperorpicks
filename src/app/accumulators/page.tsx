'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AccumulatorsPage() {
  const { data: session } = useSession();
  
  const [accumulators, setAccumulators] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState<unknown[]>([]);
  const [stake, setStake] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAccumulators();
  }, []);

  const fetchAccumulators = async () => {
    try {
      const response = await fetch('/api/accumulators');
      const data = await response.json();
      setAccumulators(data);
    } catch (error) {
      console.error('Failed to fetch accumulators:', error);
    } finally {
      setLoading(false);
    }
  };

 const calculateTotalOdds = () => {
  return selections.reduce((acc: number, sel: any) => acc * (sel.odds || 1), 1);
};
  const calculatePotentialWin = () => {
    if (!stake) return 0;
    return parseFloat(stake) * calculateTotalOdds();
  };

  const handleCreateAccumulator = async () => {
    if (!stake || selections.length === 0) return;

    try {
      const response = await fetch('/api/accumulators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selections,
          stake: parseFloat(stake),
          totalOdds: calculateTotalOdds(),
        }),
      });

      if (response.ok) {
        setSelections([]);
        setStake('');
        setShowForm(false);
        fetchAccumulators();
      }
    } catch (error) {
      console.error('Failed to create accumulator:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0A1428] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">Accumulator Builder</h1>
              <p className="text-gray-400 mt-2">
                Build & Manage Your Multi-Bet Accumulators
              </p>
            </div>
            <div className="text-sm text-gray-400">
              Welcome back, <span className="text-cyan-400">{session?.user?.name}</span>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-royal-blue to-cyan text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan/50 transition mb-8"
          >
            <Plus size={20} /> New Accumulator
          </button>

          {showForm && (
            <div className="bg-gray-900 border border-cyan/30 rounded-3xl p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">Build New Accumulator</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Stake Amount ($)</label>
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  placeholder="Enter stake amount"
                  className="w-full bg-white/10 border border-cyan/30 rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan"
                />
              </div>

              {selections.length > 0 && (
                <div className="bg-white/5 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold mb-4">Selected Matches</h3>
                  {selections.map((sel: any, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-none">
                      <span>{sel.prediction} @ <span className="text-cyan">{sel.odds}</span></span>
                      <button
                        onClick={() => setSelections(selections.filter((_, i) => i !== idx))}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <p className="text-gray-400">Total Odds</p>
                  <p className="text-4xl font-bold text-cyan mt-2">{calculateTotalOdds().toFixed(2)}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6">
                  <p className="text-gray-400">Potential Return</p>
                  <p className="text-4xl font-bold text-gold mt-2">${calculatePotentialWin().toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={handleCreateAccumulator}
                disabled={!stake || selections.length === 0}
                className="w-full bg-gradient-to-r from-royal-blue to-cyan text-black font-bold py-4 rounded-2xl disabled:opacity-50"
              >
                <Calculator className="inline mr-2" size={20} />
                Create Accumulator
              </button>
            </div>
          )}

          {/* Existing Accumulators */}
          {loading ? (
            <p className="text-center py-12 text-gray-400">Loading your accumulators...</p>
          ) : accumulators.length === 0 ? (
            <div className="text-center py-20 bg-gray-900 rounded-3xl">
              <p className="text-gray-400">No accumulators yet. Create your first one above!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {accumulators.map((acc: any) => (
                <div key={acc.id} className="bg-gray-900 border border-cyan/20 rounded-3xl p-8">
                  {/* Your original accumulator card content */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{acc.name || 'Accumulator'}</h3>
                      <p className="text-gray-400">{acc.matches?.length || 0} selections</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-cyan">{acc.totalOdds?.toFixed(2)}</p>
                      <p className="text-sm text-gray-400">Total Odds</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}