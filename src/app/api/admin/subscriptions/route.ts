import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import { subscriptionAssignSchema } from '@/lib/validators/admin';
import { adminWriteRateLimit } from '@/lib/ratelimit';
import { writeAuditLog } from '@/lib/audit';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const list = await prisma.userSubscription.findMany({
    include: { user: true, plan: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await adminWriteRateLimit.limit(`sub:assign:${ip}`);
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const parsed = subscriptionAssignSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.userSubscription.create({
    data: {
      userId: parsed.data.userId,
      planId: parsed.data.planId,
      status: parsed.data.status ?? 'ACTIVE',
      endsAt: parsed.data.endsAt ? new Date(parsed.data.endsAt) : null,
      autoRenew: parsed.data.autoRenew ?? false,
    },
  });

  await writeAuditLog({
    actorUserId: auth.session.user.id,
    action: 'ASSIGN',
    entity: 'UserSubscription',
    entityId: created.id,
    metadata: { userId: created.userId, planId: created.planId, status: created.status },
  });

  return NextResponse.json(created, { status: 201 });
}