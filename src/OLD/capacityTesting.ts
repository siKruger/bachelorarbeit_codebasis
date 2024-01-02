import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { instructor } from '../sequelizeInit';

let instructorRepo;
const prisma = new PrismaClient();

// eslint-disable-next-line max-len
const capacity = { prisma: { reached: false, current: 1 }, sequelize: { reached: false, current: 1 }, typeorm: { reached: false, current: 1 } };
const capacityHistory = { prisma: [], typeorm: [], sequelize: [] };

const prismaCapacity = async () => {
  try {
    for (let x = 0; x < capacity.prisma.current; x += 1) {
      await prisma.instructor.create({
        data: {
          firstName: faker.animal.cat(),
          lastName: faker.company.name(),
        },
      });
    }
  } catch (e) {
    capacity.prisma.reached = true;
  }
};

const typeormCapacity = async () => {
  try {
    await instructorRepo.save(instructorRepo.create({
      firstName: faker.animal.cat(),
      lastName: faker.company.name(),
    }));
  } catch (e) {
    console.log(e);
    capacity.typeorm.reached = true;
  }
};

const sequelizeCapacity = async () => {
  try {
    for (let x = 0; x < capacity.sequelize.current; x += 1) {
      await instructor.create({
        firstName: faker.animal.cat(),
        lastName: faker.company.name(),
      });
    }
  } catch (e) {
    console.log(e);
    capacity.sequelize.reached = true;
  }
};

function sleep(milliseconds: number) {
  return new Promise((resolve) => { setTimeout(resolve, milliseconds); });
}

const executeTest = async () => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
  });
  const typeOrmDatasource = await AppDataSource.initialize();
  instructorRepo = typeOrmDatasource.getRepository(Instructor);

  // number of test runs
  const testRuns = 5;

  // test for prismas capacity
  for (let x = 0; x < testRuns; x += 1) {
    capacity.prisma.current = 1;
    capacity.prisma.reached = false;
    // eslint-disable-next-line max-len
    while (!capacity.prisma.reached && process.memoryUsage().heapUsed < 4000000000) {
      prismaCapacity();

      await sleep(1);

      capacity.prisma.current += 1;
    }
    console.log(`prismas capacity reached at ${capacity.prisma.current}.`);
    await sleep(10000);
    capacityHistory.prisma.push(capacity.prisma.current);
  }

  // test for sequelize capacity
  for (let x = 0; x < testRuns; x += 1) {
    capacity.sequelize.current = 1;
    capacity.sequelize.reached = false;
    // eslint-disable-next-line max-len
    while (!capacity.sequelize.reached && process.memoryUsage().heapUsed < 4000000000) {
      sequelizeCapacity();

      await sleep(0.1);

      capacity.sequelize.current += 1;
      console.log(`kekek${capacity.sequelize.current}`);
    }
    console.log(process.memoryUsage().heapUsed);
    console.log(`sequelize capacity reached at ${capacity.sequelize.current}.`);
    await sleep(10000);
    capacityHistory.sequelize.push(capacity.prisma.current);
  }

  // test for typeorm capacity
  for (let x = 0; x < testRuns; x += 1) {
    capacity.typeorm.current = 1;
    capacity.typeorm.reached = false;
    while (!capacity.typeorm.reached && process.memoryUsage().heapUsed < 4000000000) {
      typeormCapacity();

      await sleep(1);

      capacity.typeorm.current += 1;
    }
    console.log(process.memoryUsage().heapUsed);
    console.log(`typeorm capacity reached at ${capacity.typeorm.current}.`);
    await sleep(10000);
    capacityHistory.typeorm.push(capacity.typeorm.current);
  }

  // calculate avg
  for (const [key, value] of Object.entries(capacityHistory)) {
    const avg = capacityHistory[key].reduce((prev, curr) => prev + curr, 0);
    capacityHistory[key].push(avg / testRuns);
  }

  // print finals
  console.log(capacityHistory);
};
executeTest();
