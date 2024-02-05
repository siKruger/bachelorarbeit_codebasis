/**
 * Siehe 5.3.2
 */
import { Instructor, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testInstructor: Instructor = {
  firstName: '',
  lastName: '',
  instructor_pk: 0,
};

const prismaCreate = prisma.instructor.create({
  data: {
    instructor_pk: 'w',
    lastName: 1,
    KeinWert: 'nicht',
  },
});

const result = await prisma.instructor.findMany({
  where: {
    lastName: 'Test',
  },
  select: {
    firstName: true,
  },
});
