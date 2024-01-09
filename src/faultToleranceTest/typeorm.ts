import { DataSource, Repository } from 'typeorm';
import { courseData, transactionCourseData } from './testData';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';

let instructorRepository: Repository<Instructor>;
let courseRepository: Repository<Course>;
let assignmentRepository: Repository<Assignment>;
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'typeorm.sqlite',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: false,
});
const typeormRelationInsert = async () => {
  // insert correct data
  await courseRepository.save(courseRepository.create({
    ...courseData,
  }));

  try {
    // insert non existing 1:1 relation
    await courseRepository.update({ course_pk: 1 }, {
      course_name: 'should have failed',
      instructor_pk: 1,
    });
  } catch (e) {}

  try {
    await courseRepository.findOneOrFail({
      where: {
        course_name: 'should have failed',

      },
    });

    console.log('TYPEORM: Invalid 1:1 relation data in database');
  } catch (e) {
    console.log('TYPEORM: Invalid 1:1 relation data not in database');
  }

  // insert  existing 1:n relation
  await assignmentRepository.save(assignmentRepository.create({
    title: 'Working Test Assignment',
    description: 'This is the Assignment ',
    course_pk: 1,
  }));
  try {
    // insert non existing 1:n relation
    await assignmentRepository.save(assignmentRepository.create({
      title: 'Test Assignment',
      description: 'This should not work',
      course_pk: 2,
    }));
  } catch (e) {}

  try {
    await assignmentRepository.findOneOrFail({
      where: {
        title: 'Test Assignment',

      },
    });
    console.log('TYPEORM: Invalid 1:n relation data in database');
  } catch (e) {
    console.log('TYPEORM: Invalid 1:n relation data not in database');
  }

  try {
    await AppDataSource.transaction(async (transactionEntityManager) => {
      const courseTransaction = await transactionEntityManager.getRepository(Course);

      await courseTransaction.save(courseTransaction.create({
        ...transactionCourseData,
      }));
      await courseTransaction.save(courseTransaction.create({
        ...transactionCourseData,
      }));
      await courseTransaction.save(courseTransaction.create({
        ...transactionCourseData,
        instructor_pk: -1,
      }));
    });
    // Check transactions
  } catch (e) {}

  try {
    await courseRepository.findOneOrFail({
      where: {
        course_name: transactionCourseData.course_name,

      },
    });
    console.log('TYPEORM: Transaction courses in database');
  } catch (e) {
    console.log('TYPEORM: Transaction courses not in database');
  }
};

const executeTest = async () => {
  const typeOrmSource = await AppDataSource.initialize();
  instructorRepository = typeOrmSource.getRepository(Instructor);
  assignmentRepository = typeOrmSource.getRepository(Assignment);
  courseRepository = typeOrmSource.getRepository(Course);
  typeormRelationInsert();
};
executeTest();
