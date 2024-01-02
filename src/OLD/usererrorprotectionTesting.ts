// Prisma
import { PrismaClient } from '@prisma/client';
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { instructor } from '../sequelizeInit';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

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

// sequelize

await instructor.create({
  firstName: 22,
  lastName: true,
  nstructor_pk: 1,
});

await instructor.findAll({
  where: {
    firstName: 2,
  },
  include: ['surname'],
});

await instructor.update({ firstName: null }, {
  where: {
    firstName: '',
  },
});

await instructor.destroy({
  where: {
    instructor_pk: '1',
  },
});

// TypeORM
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'typeorm.sqlite',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: 'all',
});
const typeOrmDatasource = await AppDataSource.initialize();
const instructorRepo = typeOrmDatasource.getRepository(Instructor);

await instructorRepo.save(instructorRepo.create({
  firstName: 22,
  lastName: true,
  nstructor_pk: 1,
}));

await instructorRepo.find({
  where: {
    firstName: 2,
  },
  select: {
    surname: true,
  },
});

await instructorRepo.update({ firstName: '' }, { firstName: null });

await instructorRepo.delete({ instructor_pk: '1' });
