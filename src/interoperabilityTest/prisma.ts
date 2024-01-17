/**
 * Siehe 4.5.1
 */
import { Instructor, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
