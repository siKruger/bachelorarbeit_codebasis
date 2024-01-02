import { PrismaClient } from '@prisma/client';
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { course, instructor } from '../sequelizeInit';
import { mockingCourse, mockingInstructors } from '../mockData';

/**
 * This file is used to test the time behaviour of prisma, typeorm and sequelize.
 */

/**
 * Prisma
 */
const prismaTest = async () => {
  const prisma = new PrismaClient();

  let timeSum = 0;

  for (const val of mockingInstructors) {
    const prismaStart = Date.now();

    await prisma.instructor.create({
      data: {
        ...val,
      },
    });
    const prismaEnd = Date.now();

    timeSum += prismaEnd - prismaStart;
  }

  for (const val of mockingCourse) {
    const prismaStart = Date.now();

    await prisma.course.create({
      data: {
        course_name: val.course_name,
        max_capacity: val.max_capacity,
        instructor_pk: val.instructor_pk,
        course_pk: val.course_pk,
      },
    });
    const prismaEnd = Date.now();

    timeSum += prismaEnd - prismaStart;
  }

  return timeSum;
};

/**
 * TypeORM
 */

const typeORMTest = async () => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: false,
  });
  const typeOrmDatasource = await AppDataSource.initialize();

  const instructorRepo = typeOrmDatasource.getRepository(Instructor);
  const courseRepo = typeOrmDatasource.getRepository(Course);

  let timeSum = 0;

  for (const val of mockingInstructors) {
    const typeormStart = Date.now();

    await instructorRepo.save(instructorRepo.create({ ...val }));
    const typeormEnd = Date.now();

    timeSum += typeormEnd - typeormStart;
  }

  for (const val of mockingCourse) {
    const typeormStart = Date.now();

    await courseRepo.save(courseRepo.create({
      course_pk: val.course_pk,
      course_name: val.course_name,
      max_capacity: val.max_capacity,
      instructor_pk: val.instructor_pk,
    }));
    const typeormEnd = Date.now();

    timeSum += typeormEnd - typeormStart;
  }

  return timeSum;
};

const sequelizeTest = async () => {
  let timeSum = 0;

  for (const val of mockingInstructors) {
    const sequelizeStart = Date.now();

    await (instructor.build({ ...val })).save();

    const sequelizeEnd = Date.now();

    timeSum += sequelizeEnd - sequelizeStart;
  }
  for (const val of mockingCourse) {
    const sequelizeStart = Date.now();

    await (course.build({ ...val })).save();
    const sequelizeEnd = Date.now();

    timeSum += sequelizeEnd - sequelizeStart;
  }

  return timeSum;
};

const executeTest = async () => {
  const times = { prisma: [], sequelize: [], typeorm: [] };
  const seqTime = await sequelizeTest();
  times.sequelize.push(seqTime);

  const prisTime = await prismaTest();
  times.prisma.push(prisTime);

  const typeOrmTime = await typeORMTest();
  times.typeorm.push(typeOrmTime);

  console.table(times);
};
executeTest();
