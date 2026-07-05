'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Heart, Trophy } from 'lucide-react';

export default function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('posts');

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = tab === 'posts' ? '/api/community/posts' : '/api/community/leaderboard';
      const response = await fetch(endpoint);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy">
      <nav className="bg-navy/95 backdrop-blur-md border-b border-cyan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan to-royal-blue bg-clip-text text-transparent">
              Emperor Picks
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="hover:text-cyan">Dashboard</Link>
              <Link href="/predictions" className="hover:text-cyan">Predictions</Link>
              <Link href="/accumulators" className="hover:text-cyan">Accumulators</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Community</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab('posts')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === 'posts' 
                ? 'bg-cyan text-navy' 
                : 'bg-white/10 border border-cyan/30 hover:border-cyan'
            }`}
          >
            <MessageCircle className="inline mr-2" size={18} /> Posts
          </button>
          <button
            onClick={() => setTab('leaderboard')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === 'leaderboard' 
                ? 'bg-cyan text-navy' 
                : 'bg-white/10 border border-cyan/30 hover:border-cyan'
            }`}
          >
            <Trophy className="inline mr-2" size={18} /> Leaderboard
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading {tab}...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No {tab} available yet</p>
          </div>
        ) : tab === 'posts' ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-cyan/20 rounded-lg p-6 hover:border-cyan/50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm">By {post.user?.name}</p>
                  </div>
                  <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Heart size={18} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MessageCircle size={18} />
                    <span>{post.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-cyan/20 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 bg-white/10 p-4 font-bold">
              <div>Rank</div>
              <div>User</div>
              <div>Points</div>
              <div>Wins</div>
            </div>
            {posts.map((entry) => (
              <div key={entry.id} className="grid grid-cols-4 gap-4 p-4 border-t border-cyan/20 hover:bg-white/5 transition">
                <div className="font-bold">{entry.rank}</div>
                <div>{entry.user?.name}</div>
                <div className="text-cyan">{entry.points}</div>
                <div className="text-green-400">{entry.wins}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
