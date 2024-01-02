import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { executeCapacityTest } from './testRunner';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';

let instructorRepo;

const typeormCapacity = async (capacity: { current: number, reached: boolean, capacityHistory: number[] }) => {
  try {
    await instructorRepo.save(instructorRepo.create({
      firstName: faker.animal.cat(),
      lastName: faker.company.name(),
    }));
  } catch (e) {
    // eslint-disable-next-line no-param-reassign
    capacity.reached = true;
  }
};

const executeTest = async () => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
  });
  const typeOrmDatasource = await AppDataSource.initialize();
  instructorRepo = typeOrmDatasource.getRepository(Instructor);

  executeCapacityTest(typeormCapacity, 'typeORM');
};

executeTest();
