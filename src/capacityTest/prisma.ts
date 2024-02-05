/**
 * Siehe 5.2.2
 */
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { executeCapacityTest } from './testRunner';

const prisma = new PrismaClient();

// eslint-disable-next-line max-len
const prismaCapacity = async (capacity: { current: number, reached: boolean, capacityHistory: number[] }) => {
  try {
    await prisma.instructor.create({
      data: {
        firstName: faker.animal.cat(),
        lastName: faker.company.name(),
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-param-reassign
    capacity.reached = true;
  }
};

executeCapacityTest(prismaCapacity, 'prisma');
