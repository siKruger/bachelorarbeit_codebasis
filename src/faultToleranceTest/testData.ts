/**
 * Siehe 4.7.1
 */
import { faker } from '@faker-js/faker';

export const courseData = {
  course_name: faker.animal.cat(),
  max_capacity: faker.number.int(200),
  course_pk: 1,
};

export const transactionCourseData = {
  course_name: 'Transaction Test',
  max_capacity: faker.number.int(200),
};
