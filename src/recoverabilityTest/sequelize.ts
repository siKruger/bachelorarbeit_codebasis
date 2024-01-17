/**
 * Siehe 4.8.1
 */
import { faker } from '@faker-js/faker';
import { sleep } from '../helper';
import { course } from '../sequelizeInit';

const sequelizeCreate = async () => {
  try {
    for (let x = 0; x < 20; x += 1) {
      console.log(`Writing next Dataset with Id${x + 1}`);

      await course.create({
        course_name: faker.animal.cow(),
        max_capacity: faker.number.int(100),
        course_pk: x + 1,
      });

      await sleep(1000);
    }
  } catch (e) {
    console.log(`sequelize has crashed...${e}`);
  }
};

sequelizeCreate();
