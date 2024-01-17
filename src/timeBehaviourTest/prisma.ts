/**
 * Siehe 4.2.1
 */
import { PrismaClient } from '@prisma/client';
import { mockingCourse, mockingInstructors } from '../mockData';
import executeTimeBehaviour from './testRunner';

const prismaTest = async (iteration: number) => {
  const prisma = new PrismaClient();

  let timeSum = 0;

  for (const val of mockingInstructors) {
    const newInstructor = {
      firstName: val.firstName,
      lastName: val.lastName,
    };
    const prismaStart = Date.now();

    await prisma.instructor.create({
      data: {
        ...newInstructor,
      },
    });
    const prismaEnd = Date.now();

    const courseData = mockingCourse[val.instructor_pk - 1];
    const courseInstructorPk = val.instructor_pk + (1000 * iteration);

    const newCourse = {
      course_name: courseData.course_name,
      max_capacity: courseData.max_capacity,
      instructor_pk: courseInstructorPk,
    };
    const courseStart = Date.now();

    await prisma.course.create({
      data: {
        ...newCourse,
      },
    });
    const courseEnd = Date.now();

    timeSum += prismaEnd - prismaStart;

    timeSum += courseEnd - courseStart;
  }

  for (const val of mockingInstructors) {
    const instructorPk = val.instructor_pk + (1000 * iteration);

    const findStart = Date.now();
    await prisma.instructor.findFirst({
      where: {
        instructor_pk: instructorPk,
      },
      include: {
        Course: true,
      },
    });
    const findStop = Date.now();
    timeSum += findStop - findStart;

    const updateStart = Date.now();
    await prisma.instructor.update({
      where: {
        instructor_pk: instructorPk,
      },
      data: {
        lastName: 'Müller',
      },
    });

    const updateEnd = Date.now();
    timeSum += updateEnd - updateStart;
  }

  for (const val of mockingInstructors) {
    const instructorPk = val.instructor_pk + (1000 * iteration);

    const deleteStart = Date.now();
    await prisma.instructor.delete({
      where: {
        instructor_pk: instructorPk,
      },
    });

    const deleteStop = Date.now();
    timeSum += deleteStop - deleteStart;
  }

  return timeSum;
};

executeTimeBehaviour('prisma', prismaTest);
