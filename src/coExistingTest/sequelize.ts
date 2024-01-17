/**
 * Siehe 4.4.1
 */
import { instructor } from '../sequelizeInit';
import { executeCoExistance } from './testRunner';

const sequelizeCrud = async () => {
  for (let i = 0; i < 1000; i += 1) {
    await instructor.create({
      firstName: 'Test',
      lastName: 'Test',
    });
  }
};

executeCoExistance('sequelize', sequelizeCrud);
