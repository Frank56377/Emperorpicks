import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import { planSchema } from '@/lib/validators/admin';
import { adminWriteRateLimit } from '@/lib/ratelimit';
import { writeAuditLog } from '@/lib/audit';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const plans = await prisma.plan.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await adminWriteRateLimit.limit(`plan:create:${ip}`);
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const parsed = planSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.plan.create({
    data: {
      ...parsed.data,
      priceYearly: parsed.data.priceYearly ?? null,
      isActive: parsed.data.isActive ?? true,
    },
  });

  await writeAuditLog({
    actorUserId: auth.session.user.id,
    action: 'CREATE',
    entity: 'Plan',
    entityId: created.id,
    metadata: { code: created.code },
  });

  return NextResponse.json(created, { status: 201 });
}