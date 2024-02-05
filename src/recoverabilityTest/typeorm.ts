/**
 * Siehe 5.5.2
 */
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { sleep } from '../helper';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';

let courseRepository: Repository<Course>;
const AppDataSource = new DataSource({
  type: 'mariadb',
  url: 'mysql://root:abcdefg@localhost:32768/typeorm',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: false,
});

const typeORMCreate = async () => {
  try {
    for (let x = 0; x < 20; x += 1) {
      console.log(`Writing next Dataset with Id${x + 1}`);

      await courseRepository.save(courseRepository.create({
        course_name: faker.animal.cow(),
        max_capacity: faker.number.int(100),
        course_pk: x + 1,
      }));

      await sleep(1000);
    }
  } catch (e) {
    console.log(`Prisma has crashed...${e}`);
  }
};

const executeTest = async () => {
  const typeOrmSource = await AppDataSource.initialize();
  courseRepository = typeOrmSource.getRepository(Course);
  typeORMCreate();
};
executeTest();
