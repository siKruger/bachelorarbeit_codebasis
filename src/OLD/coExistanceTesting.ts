import { isPrime } from 'mathjs';
import { PrismaClient } from '@prisma/client';
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { instructor } from '../sequelizeInit';

const prisma = new PrismaClient();
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'typeorm.sqlite',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: false,
});

const calcPrime = (): number => {
  const startTime = Date.now();
  isPrime(Array.from({ length: 5000000 }, (_, index) => index));
  const endTime = Date.now();
  return endTime - startTime;
};

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

const typeormCrud = async (dsrc: DataSource) => {
  const instructorRepository = dsrc.getRepository(Instructor);

  for (let i = 0; i < 5000; i += 1) {
    await instructorRepository.save(instructorRepository.create({
      firstName: 'Test',
      lastName: 'Test',
    }));
  }
};

const sequelizeCrud = async () => {
  for (let i = 0; i < 5000; i += 1) {
    await instructor.create({
      firstName: 'Test',
      lastName: 'Test',
    });
  }
};

const executeTest = async () => {
  const typeOrmSource = await AppDataSource.initialize();
  const loopTimes = 20;

  const times = {
    primeOnly: [], prisma: [], typeorm: [], sequelize: [],
  };
  console.log('Testing prime numbers w.o. ORM');
  for (let i = 0; i < loopTimes; i += 1) {
    times.primeOnly.push(calcPrime());
  }

  console.log('Testing prime numbers with prisma');
  for (let i = 0; i < loopTimes; i += 1) {
    times.prisma.push(calcPrime());
    await prismaCrud();
  }

  console.log('Testing prime numbers with typeorm');
  for (let i = 0; i < loopTimes; i += 1) {
    times.typeorm.push(calcPrime());
    await typeormCrud(typeOrmSource);
  }

  console.log('Testing prime numbers with sequelize');
  for (let i = 0; i < 20; i += 1) {
    times.sequelize.push(calcPrime());
    await sequelizeCrud();
  }

  for (const [key, value] of Object.entries(times)) {
    const avg = times[key].reduce((prev, curr) => prev + curr, 0);
    times[key].push(avg / loopTimes);
  }

  console.table(times);
};
executeTest();
