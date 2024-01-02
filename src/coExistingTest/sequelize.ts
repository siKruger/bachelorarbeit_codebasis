import { instructor } from '../sequelizeInit';
import { executeCoExistance } from './testRunner';

const sequelizeCrud = async () => {
  for (let i = 0; i < 5000; i += 1) {
    await instructor.create({
      firstName: 'Test',
      lastName: 'Test',
    });
  }
};

executeCoExistance('sequelize', sequelizeCrud);
