import { PrismaClient } from '@prisma/client';
import { courseData, transactionCourseData } from './testData';

const prisma = new PrismaClient();

const prismaRelationInsert = async () => {
  // insert correct data
  await prisma.course.create({
    data: {
      ...courseData,
    },
  });

  try {
    // insert non existing 1:1 relation
    await prisma.course.update({
      where: {
        course_pk: 1,
      },
      data: {
        course_name: 'should have failed',
        instructor_pk: 1,
      },
    });
  } catch (e) {}

  try {
    await prisma.course.findFirstOrThrow({
      where: {
        course_name: 'should have failed',
      },
    });
    console.log('PRISMA: Invalid 1:1 relation data in database');
  } catch (e) {
    console.log('PRISMA: Invalid 1:1 relation data not in database');
  }

  // insert  existing 1:n relation
  await prisma.assignment.create({
    data: {
      title: 'Working Test Assignment',
      description: 'This is the Assignment ',
      course_pk: 1,
    },
  });

  try {
    // insert non existing 1:n relation
    await prisma.assignment.create({
      data: {
        title: 'Test Assignment',
        description: 'This should not work',
        course_pk: 2,
      },
    });
  } catch (e) {}

  try {
    await prisma.assignment.findFirstOrThrow({
      where: {
        title: 'Test Assignment',
      },
    });
    console.log('PRISMA: Invalid 1:n relation data in database');
  } catch (e) {
    console.log('PRISMA: Invalid 1:n relation data not in database');
  }

  try {
    // Check transactions
    await prisma.$transaction([
      prisma.course.create({
        data: {
          ...transactionCourseData,
        },
      }),
      prisma.course.create({
        data: {
          ...transactionCourseData,
        },
      }),
      prisma.course.create({
        data: {
          ...transactionCourseData,
          instructor_pk: -1,
        },
      }),
    ]);
  } catch (e) {}

  try {
    await prisma.course.findFirstOrThrow({
      where: {
        course_name: transactionCourseData.course_name,
      },
    });
    console.log('PRISMA: Transaction courses in database');
  } catch (e) {
    console.log('PRISMA: Transaction courses not in database');
  }
};

prismaRelationInsert();
