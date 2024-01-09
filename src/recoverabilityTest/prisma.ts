import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { sleep } from '../helper';

const prisma = new PrismaClient();

const continousCRUD = async () => {
  while (true) {
    await prisma.course.create({
      data: {
        course_name: faker.animal.cow(),
        max_capacity: faker.number.int(100),
      },
    });
    await sleep(500);
  }
};

continousCRUD();
