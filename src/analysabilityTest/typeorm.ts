/**
 * Siehe 4.9.1
 */
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';

const dataset = { firstName: 'Maria', lastName: 'Hardy', instructor_pk: 1 };

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
typeormAnalysability();
