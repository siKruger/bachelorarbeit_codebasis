/**
 * Siehe 4.7.1
 */
import { courseData, transactionCourseData } from './testData';
import { assignment, course, sequelize } from '../sequelizeInit';

const sequelizeRelationInsert = async () => {
  // insert correct data
  await course.create({
    ...courseData,
  });

  try {
    // insert non existing 1:1 relation
    await course.update({
      course_name: 'should have failed',
      instructor_pk: 1,
    }, {
      where: {
        course_pk: 1,

      },
    });
  } catch (e) {}

  try {
    await course.findAll({
      where: {
        course_name: 'should have failed',
      },
    });

    console.log('SEQUELIZE: Invalid 1:1 relation data in database');
  } catch (e) {
    console.log('SEQUELIZE: Invalid 1:1 relation data not in database');
  }

  // insert  existing 1:n relation
  await assignment.create({
    title: 'Working Test Assignment',
    description: 'This is the Assignment ',
    course_pk: 1,
  });

  try {
    // insert non existing 1:n relation
    await assignment.create({
      title: 'Test Assignment',
      description: 'This should not work',
      course_pk: 2,
    });
  } catch (e) {}

  try {
    await assignment.findAll({
      where: {
        title: 'Test Assignment',

      },
    });

    console.log('SEQUELIZE: Invalid 1:n relation data in database');
  } catch (e) {
    console.log('SEQUELIZE: Invalid 1:n relation data not in database');
  }

  try {
    // Check transactions
    await sequelize.transaction(async (t) => {
      await course.create({
        ...transactionCourseData,
      }, { transaction: t });

      await course.create({
        ...transactionCourseData,
      }, { transaction: t });

      await course.create({
        ...transactionCourseData,
        instructor_pk: -1,
      }, { transaction: t });
    });
  } catch (e) {}

  try {
    await course.findAll({
      where: {
        course_name: transactionCourseData.course_name,
      },
    });
    console.log('SEQUELIZE: Transaction courses in database');
  } catch (e) {
    console.log('SEQUELIZE: Transaction courses not in database');
  }
};

sequelizeRelationInsert();
