// Prisma
import { PrismaClient } from '@prisma/client';
import {DataSource} from "typeorm";
import {Assignment, Course, Instructor, Participant} from "./typeormInit";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
// Create
await prisma.instructor.create({
  data: {
      firstName: 22,
      lastName: true,
      instructor-pk: 1
  },
});
// Read
await prisma.instructor.findMany({
    where: {
        firstName: 2
    }, select: {
        firstname: true
    }
})
// update
await prisma.instructor.update({
    where: {
        firstName: ""
    },
})
// delete
await prisma.instructor.delete({
    where: {
        firstName: ""
    },
})
/*
Prisma deckt alle eingebauten Fehler auf. Diese Fehler resultieren daraus, dass die Statements nicht zu den in der Datenbank definierten Typen passen.
 */
// sequelize
// TypeORM
const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'typeorm.sqlite',
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: 'all',
});
const typeOrmDatasource = await AppDataSource.initialize();
const instructorRepo = typeOrmDatasource.getRepository(Instructor);

await instructorRepo.save(instructorRepo.create({
    firstName: 22,
    lastName: true,
    instructor-pk: 1
}));

await instructorRepo.find({
    where: {
        firstName: 2
    }, select: {
        firstname: true
    }
});

await instructorRepo.update();

await instructorRepo.delete({ firstName: 2 });
/*
Prisma deckt alle eingebauten Fehler auf. Diese Fehler resultieren daraus, dass die Statements nicht zu den in der Datenbank definierten Typen passen.
 */


