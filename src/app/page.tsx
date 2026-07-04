import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-7xl font-bold mb-6 tracking-tight">
          Betgenie
        </h1>
        <p className="text-2xl mb-10 text-gray-300">
          Smart Football Predictions &amp; Accumulators
        </p>

        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
          >
            Sign Up
          </Link>
        </div>

        <p className="mt-12 text-gray-500 text-sm">
          Welcome to the future of sports betting intelligence
        </p>
      </div>
    </div>
  );
}