/**
 * Siehe 4.4.1
 */
import { DataSource, Repository } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { executeCoExistance } from './testRunner';

let instructorRepository: Repository<Instructor>;
const typeormCrud = async () => {
  for (let i = 0; i < 1000; i += 1) {
    await instructorRepository.save(instructorRepository.create({
      firstName: 'Test',
      lastName: 'Test',
    }));

    await instructorRepository.findOne({
      where: {
        firstName: 'Test',
      },
    });

    await instructorRepository.update({ firstName: 'Test' }, { lastName: 'Changed' });

    await instructorRepository.delete({
      firstName: 'Test',
    });
  }
};
const executeTest = async () => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: false,
  });
  const typeOrmSource = await AppDataSource.initialize();
  instructorRepository = typeOrmSource.getRepository(Instructor);
  executeCoExistance('typeorm', typeormCrud);
};
executeTest();
