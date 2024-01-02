import { PrismaClient } from '@prisma/client';
import { executeCoExistance } from './testRunner';

const prisma = new PrismaClient();

const prismaCrud = async () => {
  for (let i = 0; i < 5000; i += 1) {
    await prisma.instructor.create({
      data: {
        firstName: 'Test',
        lastName: 'Test',
      },
    });
  }
};

executeCoExistance('prisma', prismaCrud);
