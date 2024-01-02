import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const prismaCreate = prisma.instructor.create({
  data: {
    instructor_pk: 'w',
    lastName: 1,
    KeinWert: 'nicht',
  },
});

const result = await prisma.instructor.findMany({
  where: {
    lastName: 'Test',
  },
  select: {
    firstName: true,
  },
});
