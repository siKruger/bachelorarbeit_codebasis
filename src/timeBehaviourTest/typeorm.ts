import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { mockingCourse, mockingInstructors } from '../mockData';

const typeORMTest = async (iteration: number) => {
  const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: false,
  });
  const typeOrmDatasource = await AppDataSource.initialize();

  const instructorRepo = typeOrmDatasource.getRepository(Instructor);
  const courseRepo = typeOrmDatasource.getRepository(Course);

  let timeSum = 0;

  for (const val of mockingInstructors) {
    const typeormStart = Date.now();

    await instructorRepo.save(instructorRepo.create({ ...val }));
    const typeormEnd = Date.now();

    timeSum += typeormEnd - typeormStart;
  }

  for (const val of mockingCourse) {
    const typeormStart = Date.now();

    await courseRepo.save(courseRepo.create({
      course_pk: val.course_pk,
      course_name: val.course_name,
      max_capacity: val.max_capacity,
      instructor_pk: val.instructor_pk,
    }));
    const typeormEnd = Date.now();

    timeSum += typeormEnd - typeormStart;
  }

  return timeSum;
};
