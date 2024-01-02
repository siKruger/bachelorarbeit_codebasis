import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.instructor.create({
  data: {
    firstName: 22,
    lastName: true,
    nstructor_pk: 1,
  },
});

await prisma.instructor.findMany({
  where: {
    firstName: 2,
  },
  select: {
    surname: true,
  },
});

await prisma.instructor.update({
  where: {
    firstName: '',
  },
  data: {
    firstName: null,
  },
});

await prisma.instructor.delete({
  where: {
    instructor_pk: '1',
  },
});
