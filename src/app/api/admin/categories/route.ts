import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import { categorySchema } from '@/lib/validators/admin';
import { adminWriteRateLimit } from '@/lib/ratelimit';
import { writeAuditLog } from '@/lib/audit';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const categories = await prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await adminWriteRateLimit.limit(`cat:create:${ip}`);
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.category.create({ data: parsed.data });

  await writeAuditLog({
    actorUserId: auth.session.user.id,
    action: 'CREATE',
    entity: 'Category',
    entityId: created.id,
    metadata: { slug: created.slug },
  });

  return NextResponse.json(created, { status: 201 });
}