/**
 * Siehe 5.5.2
 */
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { sleep } from '../helper';

const prisma = new PrismaClient();

const prismaCreate = async () => {
  try {
    for (let x = 0; x < 20; x += 1) {
      console.log(`Writing next Dataset with Id${x + 1}`);
      await prisma.course.create({
        data: {
          course_name: faker.animal.cow(),
          max_capacity: faker.number.int(100),
          course_pk: x + 1,
        },
      });

      await sleep(1000);
    }
  } catch (e) {
    console.log(`Prisma has crashed...${e}`);
  }
};

prismaCreate();
