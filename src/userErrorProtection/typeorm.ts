// TypeORM
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';

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
