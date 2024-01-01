// Prisma
import { PrismaClient } from '@prisma/client';
import {DataSource} from "typeorm";
import {Assignment, Course, Instructor, Participant} from "./typeormInit";
import {instructor} from "./sequelizeInit";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


/*
Eingebaute Fehler:
firstName ist vom Typ String
lastName ist vom Typ String
instructor-pk existiert nicht.
Erkannte Fehler:
Alle
 */
await prisma.instructor.create({
  data: {
      firstName: 22,
      lastName: true,
      instructor-pk: 1
  },
});

/*
Eingebaute Fehler:
firstName ist vom Typ String
Surname existiert nicht
Erkannte Fehler:
Alle
 */
await prisma.instructor.findMany({
    where: {
        firstName: 2
    }, select: {
        surname: true
    }
})

/*
Eingebaute Fehler:
firstName darf keine Number sein
Erkannte Fehler:
Alle
ZUSATZ: Prisma sagt, dass firstName keine unique Auswahl trifft.
 */
await prisma.instructor.update({
    where: {
        firstName: ""
    },
    data: {
        firstName: 1
    }
})

/*
Eingebaute Fehler:
firstName ist vom Typ String
Erkannte Fehler:
Keine
 */
await prisma.instructor.delete({
    where: {
        firstName: ""
    },
})

// sequelize
/*
Eingebaute Fehler:
firstName ist vom Typ String
lastName ist vom Typ String
instructor-pk existiert nicht.
Erkannte Fehler:
Alle
 */
await instructor.create({
    firstName: 22,
    lastName: true,
    instructor-pk: 1
})

/*
Eingebaute Fehler:
firstName ist vom Typ String
Surname existiert nicht
Erkannte Fehler:
Keiner
 */
await instructor.findAll({
    where: {
        firstName: 2
    }, include: ["surname"]
})

/*
Eingebaute Fehler:
firstName ist vom Typ String
Surname existiert nicht
Erkannte Fehler:
Keine
 */
await instructor.update({ firstName: 1 }, {
    where: {
        lastName: ""
    }
});

/*
Eingebaute Fehler:
firstName ist vom Typ String
Erkannte Fehler:
Keine
 */
await instructor.destroy({
    where: {
        firstName: 2
    }
})


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
/*
Eingebaute Fehler:
firstName ist vom Typ String
lastName ist vom Typ String
instructor-pk existiert nicht.
Erkannte Fehler:
Alle
 */
await instructorRepo.save(instructorRepo.create({
    firstName: 22,
    lastName: true,
    instructor-pk: 1
}));

/*
Eingebaute Fehler:
firstName ist vom Typ String
Surname existiert nicht
Erkannte Fehler:
Alle
 */
await instructorRepo.find({
    where: {
        firstName: 2
    }, select: {
        surname: true
    }
});

/*
Eingebaute Fehler:
firstName ist vom Typ String
Surname existiert nicht
Erkannte Fehler:
Alle
 */
await instructorRepo.update({firstName: ""}, {firstName: 1});


/*
Eingebaute Fehler:
firstName ist vom Typ String
Erkannte Fehler:
Alle
 */
await instructorRepo.delete({ firstName: 2 });



