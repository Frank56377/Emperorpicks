import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  if (session.user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div className="min-h-screen bg-[#0A1428] text-white p-8">
      <h1 className="text-3xl font-bold">Admin Console</h1>
      <p className="text-gray-400 mt-2">Secure Phase 1 is active.</p>
    </div>
  );
}