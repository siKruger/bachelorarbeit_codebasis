import { mockingCourse, mockingInstructors } from '../mockData';
import { course, instructor } from '../sequelizeInit';
import { executeTimeBehaviour } from './testRunner';

const sequelizeTest = async (iteration: number) => {
  let timeSum = 0;

  for (const val of mockingInstructors) {
    const sequelizeStart = Date.now();

    await (instructor.build({
      firstName: val.firstName,
      lastName: val.lastName,
    })).save();

    const sequelizeEnd = Date.now();

    const courseData = mockingCourse[val.instructor_pk - 1];
    const courseInstructorPk = val.instructor_pk + (1000 * iteration);

    const courseStart = Date.now();

    await (course.build({
      course_name: courseData.course_name,
      max_capacity: courseData.max_capacity,
      instructor_pk: courseInstructorPk,
    })).save();

    const courseEnd = Date.now();
    timeSum += sequelizeEnd - sequelizeStart;
    timeSum += courseEnd - courseStart;
  }
  return timeSum;
};
executeTimeBehaviour('sequelize', sequelizeTest);
