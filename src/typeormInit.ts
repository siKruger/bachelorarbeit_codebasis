import "reflect-metadata"
import {
    Column,
    DataSource,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm"

@Entity()
export class Course {
    @Column()
    course_name: string

    @Column()
    max_capacity: number

    @PrimaryGeneratedColumn()
    course_pk: number

    @OneToOne(() => Instructor)
    @JoinColumn({name: "instructor_pk"})
    instructor: Relation<Instructor>

    @Column()
    instructor_pk: number

    @OneToMany(() => Assignment, (assignment) => assignment.course)
    assignments: Relation<Assignment[]>
}

@Entity()
export class Assignment {
    @Column()
    title: string

    @Column()
    description: string

    @PrimaryGeneratedColumn()
    assignment_pk: number

    @ManyToOne(() => Course, (course) => course.assignments)
    course: Course
}

@Entity()
export class Instructor {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @PrimaryGeneratedColumn()
    instructor_pk: number
}

@Entity()
export class Participant {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @PrimaryGeneratedColumn()
    participant_pk: number

    @ManyToMany(() => Course)
    @JoinTable()
    participates: Course
}

const start = Date.now();

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "typeorm.sqlite",
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        const end = Date.now();
        console.log(`Generated TypeORM Database definitions... ${end - start} ms`)
    })
    .catch((error) => console.log(error))