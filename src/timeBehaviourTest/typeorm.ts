/**
 * Siehe 5.2.1
 */
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { mockingCourse, mockingInstructors } from '../mockData';
import executeTimeBehaviour from './testRunner';

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
    const newInstructor = instructorRepo.create({
      firstName: val.firstName,
      lastName: val.lastName,
    });
    const typeormStart = Date.now();

    await instructorRepo.save(newInstructor);
    const typeormEnd = Date.now();

    const courseData = mockingCourse[val.instructor_pk - 1];
    const courseInstructorPk = val.instructor_pk + (1000 * iteration);

    const newCourse = courseRepo.create({
      course_name: courseData.course_name,
      max_capacity: courseData.max_capacity,
      instructor_pk: courseInstructorPk,
    });
    const courseStart = Date.now();

    await courseRepo.save(newCourse);

    const courseEnd = Date.now();

    timeSum += typeormEnd - typeormStart;
    timeSum += courseEnd - courseStart;
  }

  for (const val of mockingInstructors) {
    const instructorPk = val.instructor_pk + (1000 * iteration);
    const findStart = Date.now();
    await instructorRepo.find({
      where: {
        instructor_pk: instructorPk,
      },
      relations: {
        course: true,
      },
    });
    const findStop = Date.now();
    timeSum += findStop - findStart;

    const updateStart = Date.now();
    await instructorRepo.save({
      instructor_pk: instructorPk,
      lastName: 'Müller',
    });
    const updateEnd = Date.now();
    timeSum += updateEnd - updateStart;
  }

  for (const val of mockingInstructors) {
    const instructorPk = val.instructor_pk + (1000 * iteration);

    const deleteStart = Date.now();
    await instructorRepo.delete({
      instructor_pk: instructorPk,
    });

    const deleteStop = Date.now();
    timeSum += deleteStop - deleteStart;
  }

  return timeSum;
};
executeTimeBehaviour('prisma', typeORMTest);
