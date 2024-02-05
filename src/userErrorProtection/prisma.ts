/**
 * Siehe 5.4.1
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.instructor.create({
  data: {
    firstName: 22,
    lastName: true,
    nstructor_pk: 1,
  },
});

prisma.instructor.findMany({
  where: {
    firstName: 2,
  },
  select: {
    surname: true,
  },
});

prisma.instructor.update({
  where: {
    firstName: '',
  },
  data: {
    firstName: null,
  },
});

prisma.instructor.delete({
  where: {
    instructor_pk: '1',
  },
});
