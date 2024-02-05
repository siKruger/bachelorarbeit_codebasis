/**
 * Siehe 5.3.1
 */
import { PrismaClient } from '@prisma/client';
import { executeCoExistance } from './testRunner';

const prisma = new PrismaClient();

const prismaCrud = async () => {
  for (let i = 0; i < 1000; i += 1) {
    await prisma.instructor.create({
      data: {
        firstName: 'Test',
        lastName: 'Test',
      },
    });

    await prisma.instructor.findFirst({
      where: {
        firstName: 'Test',
      },
    });

    await prisma.instructor.updateMany({
      where: {
        firstName: 'Test',
      },
      data: {
        lastName: 'Changed',
      },
    });

    await prisma.instructor.deleteMany({
      where: {
        firstName: 'Test',
      },
    });
  }
};

executeCoExistance('prisma', prismaCrud);
