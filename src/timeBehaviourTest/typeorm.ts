import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { mockingCourse, mockingInstructors } from '../mockData';
import { executeTimeBehaviour } from './testRunner';

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

    await instructorRepo.save(instructorRepo.create({
      firstName: val.firstName,
      lastName: val.lastName,
    }));
    const typeormEnd = Date.now();

    const courseData = mockingCourse[val.instructor_pk - 1];
    const courseInstructorPk = val.instructor_pk + (1000 * iteration);

    const courseStart = Date.now();

    await courseRepo.save(courseRepo.create({
      course_name: courseData.course_name,
      max_capacity: courseData.max_capacity,
      instructor_pk: courseInstructorPk,
    }));

    const courseEnd = Date.now();

    timeSum += typeormEnd - typeormStart;
    timeSum += courseEnd - courseStart;
  }

  return timeSum;
};
executeTimeBehaviour('prisma', typeORMTest);
