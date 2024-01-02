import { PrismaClient } from '@prisma/client';
import { DataSource } from 'typeorm';
import {
  Assignment, Course, Instructor, Participant,
} from '../typeormInit';
import { instructor } from '../sequelizeInit';

const prisma = new PrismaClient();

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'typeorm.sqlite',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: false,
});
const typeOrmSource = await AppDataSource.initialize();
const instructorRepository = typeOrmSource.getRepository(Instructor);

// ++++++ PRISMA ++++++
// // Die Typfehler werden erfolgreich erkannt und angezeigt
// const prismaCreate = prisma.instructor.create({
//   data: {
//     instructor_pk: 'w',
//     lastName: 1,
//     KeinWert: 'nicht',
//   },
// });
//
// /*
// Der Typ von result ist {firstName: String}[]
//  */
// const result = await prisma.instructor.findMany({
//   where: {
//     lastName: 'Test',
//   },
//   select: {
//     firstName: true,
//   },
// });
//
// // ++++++ TYPE ORM ++++++
// // Die Typfehler werden erfolgreich erkannt und angezeigt.
// const typeormCreate = await instructorRepository.create({
//   instructor_pk: 'w',
//   lastName: 1,
//   KeinWert: 'nicht',
// });
//
// // Als Typ wird nur Instructor[] angezeigt. Dieser Typ ist nicht korrekt. Er sollte {firstName: string}[] sein.
// const result = await instructorRepository.find({
//   where: {
//     lastName: 'Test',
//   },
//   select: {
//     firstName: true,
//   },
// });
// // ++++++ SEQUELIZE ++++++
// Der Typfehler wird nicht erkannt
const sequelizeCreate = await (instructor.build({
  instructor_pk: 'w',
  lastName: 1,
  KeinWert: 'nicht',
})).save();

// Es werden keine Typen angezeigt. Es besteht somit keine Typsicherkeit
const sequelizeResult = await instructor.findAll({
  where: {
    lastName: 'Test',
  },
  attributes: ['firstName'],
});
