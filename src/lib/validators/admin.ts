import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2).max(60),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  isActive: z.boolean().optional(),
});

export const planSchema = z.object({
  name: z.string().min(2).max(60),
  code: z.string().min(2).max(20).regex(/^[A-Z0-9_]+$/),
  priceMonthly: z.number().int().min(0),
  priceYearly: z.number().int().min(0).nullable().optional(),
  isActive: z.boolean().optional(),
});

export const gameSchema = z.object({
  categoryId: z.string().min(1),
  homeTeam: z.string().min(2).max(80),
  awayTeam: z.string().min(2).max(80),
  league: z.string().max(80).nullable().optional(),
  startTime: z.string().datetime(),
  oddsHome: z.number().positive().nullable().optional(),
  oddsDraw: z.number().positive().nullable().optional(),
  oddsAway: z.number().positive().nullable().optional(),
  isPublished: z.boolean().optional(),
});

export const subscriptionAssignSchema = z.object({
  userId: z.string().min(1),
  planId: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELED']).optional(),
  endsAt: z.string().datetime().nullable().optional(),
  autoRenew: z.boolean().optional(),
});