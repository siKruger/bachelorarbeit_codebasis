import { mockingCourse, mockingInstructors } from '../mockData';
import { course, instructor } from '../sequelizeInit';

const sequelizeTest = async () => {
  let timeSum = 0;

  for (const val of mockingInstructors) {
    const sequelizeStart = Date.now();

    await (instructor.build({ ...val })).save();

    const sequelizeEnd = Date.now();

    timeSum += sequelizeEnd - sequelizeStart;
  }
  for (const val of mockingCourse) {
    const sequelizeStart = Date.now();

    await (course.build({ ...val })).save();
    const sequelizeEnd = Date.now();

    timeSum += sequelizeEnd - sequelizeStart;
  }

  return timeSum;
};
