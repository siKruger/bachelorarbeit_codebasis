/**
 * Siehe 4.5.1
 */
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'typeorm.sqlite',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: false,
});
const typeOrmSource = await AppDataSource.initialize();
const instructorRepository = typeOrmSource.getRepository(Instructor);

const testInstructor: Instructor = {
  firstName: '',
  lastName: '',
  instructor_pk: 0,
};

const typeormCreate = await instructorRepository.create({
  instructor_pk: 'w',
  lastName: 1,
  KeinWert: 'nicht',
});

const result = await instructorRepository.find({
  where: {
    lastName: 'Test',
  },
  select: {
    firstName: true,
  },
});
