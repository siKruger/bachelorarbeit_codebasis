/**
 * Siehe 5.2.1
 */
import { mockingCourse, mockingInstructors } from '../mockData';
import { course, instructor } from '../sequelizeInit';
import executeTimeBehaviour from './testRunner';

const sequelizeTest = async (iteration: number) => {
  let timeSum = 0;

  for (const val of mockingInstructors) {
    const newInstructor = instructor.build({
      firstName: val.firstName,
      lastName: val.lastName,
    });
    const sequelizeStart = Date.now();

    await newInstructor.save();

    const sequelizeEnd = Date.now();

    const courseData = mockingCourse[val.instructor_pk - 1];
    const courseInstructorPk = val.instructor_pk + (1000 * iteration);

    const newCourse = course.build({
      course_name: courseData.course_name,
      max_capacity: courseData.max_capacity,
      instructor_pk: courseInstructorPk,
    });
    const courseStart = Date.now();

    await newCourse.save();

    const courseEnd = Date.now();

    timeSum += sequelizeEnd - sequelizeStart;
    timeSum += courseEnd - courseStart;
  }

  for (const val of mockingInstructors) {
    const instructorPk = val.instructor_pk + (1000 * iteration);

    const findStart = Date.now();
    await instructor.findOne({
      where: {
        instructor_pk: instructorPk,
      },
      include: course,
    });

    const findStop = Date.now();
    timeSum += findStop - findStart;

    const updateStart = Date.now();
    await instructor.update({ lastName: 'Müller' }, {
      where: {
        instructor_pk: instructorPk,
      },
    });

    const updateEnd = Date.now();
    timeSum += updateEnd - updateStart;
  }

  for (const val of mockingInstructors) {
    const instructorPk = val.instructor_pk + (1000 * iteration);

    const deleteStart = Date.now();
    await instructor.destroy({
      where: {
        instructor_pk: instructorPk,
      },
    });

    const deleteStop = Date.now();
    timeSum += deleteStop - deleteStart;
  }

  return timeSum;
};
executeTimeBehaviour('sequelize', sequelizeTest);
