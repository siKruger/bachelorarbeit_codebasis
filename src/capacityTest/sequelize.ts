/**
 * Siehe 5.2.2
 */
import { faker } from '@faker-js/faker';
import { instructor } from '../sequelizeInit';
import { executeCapacityTest } from './testRunner';

const sequelizeCapacity = async (capacity: { current: number, reached: boolean, capacityHistory: number[] }) => {
  try {
    await instructor.create({
      firstName: faker.animal.cat(),
      lastName: faker.company.name(),
    });
  } catch (e) {
    // eslint-disable-next-line no-param-reassign
    capacity.reached = true;
  }
};

executeCapacityTest(sequelizeCapacity, 'sequelize');
