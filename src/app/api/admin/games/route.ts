import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import { gameSchema } from '@/lib/validators/admin';
import { adminWriteRateLimit } from '@/lib/ratelimit';
import { writeAuditLog } from '@/lib/audit';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const games = await prisma.game.findMany({
    include: { category: true, predictions: true },
    orderBy: { startTime: 'asc' },
  });
  return NextResponse.json(games);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await adminWriteRateLimit.limit(`game:create:${ip}`);
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const parsed = gameSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.game.create({
    data: {
      ...parsed.data,
      league: parsed.data.league ?? null,
      startTime: new Date(parsed.data.startTime),
      oddsHome: parsed.data.oddsHome ?? null,
      oddsDraw: parsed.data.oddsDraw ?? null,
      oddsAway: parsed.data.oddsAway ?? null,
      isPublished: parsed.data.isPublished ?? false,
    },
  });

  await writeAuditLog({
    actorUserId: auth.session.user.id,
    action: 'CREATE',
    entity: 'Game',
    entityId: created.id,
    metadata: { homeTeam: created.homeTeam, awayTeam: created.awayTeam },
  });

  return NextResponse.json(created, { status: 201 });
}