import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') return { ok: false as const, session: null };
  return { ok: true as const, session };
}