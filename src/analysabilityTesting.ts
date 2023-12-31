import { DataSource } from 'typeorm';
import { PrismaClient } from '@prisma/client';
import {
  Assignment, Course, Instructor, Participant,
} from './typeormInit';
import { instructor } from './sequelizeInit';

const dataset = { firstName: 'Maria', lastName: 'Hardy', instructor_pk: 1 };

const prismaAnalysability = async () => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  await prisma.instructor.create({
    data: {
      ...dataset,
    },
  });

  await prisma.instructor.findFirst({
    where: {
      instructor_pk: 1,
    },
  });

  await prisma.instructor.update({
    where: {
      instructor_pk: 1,
    },
    data: {
      firstName: 'Ben',
    },
  });

  await prisma.instructor.delete({
    where: {
      instructor_pk: 1,
    },
  });
};

const typeormAnalysability = async () => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: 'all',
  });
  const typeOrmDatasource = await AppDataSource.initialize();

  const instructorRepo = typeOrmDatasource.getRepository(Instructor);

  await instructorRepo.save(instructorRepo.create({ ...dataset }));

  await instructorRepo.find({ where: { instructor_pk: 1 } });

  await instructorRepo.save({
    instructor_pk: 1,
    firstName: 'Ben',
  });

  await instructorRepo.delete({ instructor_pk: 1 });
};

const sequelizeAnalysability = async () => {
  await instructor.create({ ...dataset });

  const user = await instructor.findByPk(1);

  await user.update({ firstName: 'Ben' });

  await instructor.destroy({
    where: {
      instructor_pk: 1,
    },
  });
};

const executeTest = async () => {
  await prismaAnalysability();
  console.log('prisma \n\n');
  await typeormAnalysability();
  console.log('typeorm \n\n');
  await sequelizeAnalysability();
  console.log('sequelize \n\n');
};
executeTest();
