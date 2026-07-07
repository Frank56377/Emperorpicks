import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@emperorpicks.com';
  const adminPassword = 'ChangeMeNow!123';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  console.log('Seeding admin user...');

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Admin',
      role: 'ADMIN',
      passwordHash,
    },
    create: {
      name: 'Admin',
      email: adminEmail,
      role: 'ADMIN',
      passwordHash,
    },
  });

  console.log('Admin upserted:', admin.email, admin.role);

  await prisma.plan.upsert({
    where: { code: 'FREE' },
    update: {},
    create: { name: 'Free', code: 'FREE', priceMonthly: 0, priceYearly: 0 },
  });

  await prisma.plan.upsert({
    where: { code: 'PRO' },
    update: {},
    create: { name: 'Pro', code: 'PRO', priceMonthly: 1900, priceYearly: 15000 },
  });

  await prisma.plan.upsert({
    where: { code: 'VIP' },
    update: {},
    create: { name: 'VIP', code: 'VIP', priceMonthly: 4900, priceYearly: 45000 },
  });

  await prisma.category.upsert({
    where: { slug: 'football' },
    update: {},
    create: { name: 'Football', slug: 'football', isActive: true },
  });

  console.log('✅ Seed finished');
  console.log(`Login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });