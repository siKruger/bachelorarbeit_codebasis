import { PrismaClient } from '@prisma/client';
import { mockingCourse, mockingInstructors } from '../mockData';
import { executeTimeBehaviour } from './testRunner';

const prismaTest = async (iteration: number) => {
  const prisma = new PrismaClient();

  let timeSum = 0;

  for (const val of mockingInstructors) {
    const prismaStart = Date.now();

    await prisma.instructor.create({
      data: {
        ...val,
        instructor_pk: val.instructor_pk * iteration,
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
        instructor_pk: val.instructor_pk * iteration,
        course_pk: val.course_pk * iteration,
      },
    });
    const prismaEnd = Date.now();

    timeSum += prismaEnd - prismaStart;
  }

  return timeSum;
};

executeTimeBehaviour('prisma', prismaTest);
