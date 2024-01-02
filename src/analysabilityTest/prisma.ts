import { PrismaClient } from '@prisma/client';

const dataset = { firstName: 'Maria', lastName: 'Hardy', instructor_pk: 1 };

const prismaAnalysability = async () => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  await prisma.instructor.create({
    data: {
      ...dataset,
    },
  });

  await prisma.instructor.findFirst({
    where: {
      instructor_pk: 1,
    },
  });

  await prisma.instructor.update({
    where: {
      instructor_pk: 1,
    },
    data: {
      firstName: 'Ben',
    },
  });

  await prisma.instructor.delete({
    where: {
      instructor_pk: 1,
    },
  });
};
prismaAnalysability();
