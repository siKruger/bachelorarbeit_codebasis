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
        firstName: val.firstName,
        lastName: val.lastName,
      },
    });
    const prismaEnd = Date.now();

    const courseData = mockingCourse[val.instructor_pk - 1];
    const courseInstructorPk = val.instructor_pk + (1000 * iteration);

    const courseStart = Date.now();

    await prisma.course.create({
      data: {
        course_name: courseData.course_name,
        max_capacity: courseData.max_capacity,
        instructor_pk: courseInstructorPk,
      },
    });
    const courseEnd = Date.now();

    timeSum += prismaEnd - prismaStart;

    timeSum += courseEnd - courseStart;
  }

  return timeSum;
};

executeTimeBehaviour('prisma', prismaTest);
