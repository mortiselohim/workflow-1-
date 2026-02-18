import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { phone: '+212600000001', name: 'Demo Passenger', role: Role.PASSENGER },
      { phone: '+212600000002', name: 'Demo Rider', role: Role.RIDER },
    ],
    skipDuplicates: true,
  });

  await prisma.pricingTier.createMany({
    data: [
      { key: 'standard', baseFare: 7, perKm: 2.5, perMin: 0.7, minimumFare: 12, cancelFee: 4 },
      { key: 'premium', baseFare: 10, perKm: 3.5, perMin: 1, minimumFare: 18, cancelFee: 6 },
      { key: 'top-tier', baseFare: 14, perKm: 4.5, perMin: 1.2, minimumFare: 24, cancelFee: 8 },
    ],
    skipDuplicates: true,
  });

  await prisma.rewardLevel.createMany({
    data: [
      { level: 1, minCompletedRides: 0, minRating: 0, radiusKm: 2 },
      { level: 2, minCompletedRides: 50, minRating: 4.6, radiusKm: 3.5 },
      { level: 3, minCompletedRides: 150, minRating: 4.7, radiusKm: 5 },
    ],
    skipDuplicates: true,
  });
}

main().finally(() => prisma.$disconnect());
