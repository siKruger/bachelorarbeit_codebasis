import {DataSource} from "typeorm";
import {Assignment, Course, Instructor, Participant} from "./typeormInit";
import {PrismaClient} from '@prisma/client'
import {Sequelize} from "sequelize";
import {instructor} from "./sequelizeInit";

const dataset = {firstName:"Maria",lastName:"Hardy",instructor_pk: 1}


const prismaAnalysability = async () => {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    })

    await prisma.instructor.create({
        data: {
            ...dataset
        }
    })

    await prisma.instructor.findFirst({
        where: {
            instructor_pk: 1
        }
    })

    await prisma.instructor.update({
        where: {
            instructor_pk: 1
        },
        data: {
            firstName: "Ben"
        }
    })

    await prisma.instructor.delete({
        where: {
            instructor_pk: 1
        }
    })
}
// prismaAnalysability().then(() => console.log("finished prisma"))

const typeormAnalysability = async () => {
    const AppDataSource = new DataSource({
        type: "sqlite",
        database: "typeorm.sqlite",
        entities: [Participant, Instructor, Assignment, Course],
        synchronize: true,
        logging: "all",
    })

    const instructorRepo = AppDataSource.getRepository(Instructor)

    await instructorRepo.save(instructorRepo.create({...dataset}))

    await instructorRepo.find({where: {instructor_pk: 1}})

    await instructorRepo.save({
        instructor_pk: 1,
        firstName: "Ben"
    })

    await instructorRepo.delete({instructor_pk: 1})
}
// typeormAnalysability()

const sequelizeAnalysability = async () => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'sequelize.sqlite',
        logging: true
    });

    const usr = await instructor.create({...dataset})

    const user = await instructor.findByPk(1)

    await user.update({firstName: "Ben"})

    await instructor.destroy({
        where: {
            instructor_pk: 1
        }
    })
}
sequelizeAnalysability().then(() => console.log("\n\n\n\n"))