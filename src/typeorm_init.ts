import "reflect-metadata"
import {
    Column,
    DataSource,
    Entity,
    JoinColumn, JoinTable, ManyToMany, ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn, Relation
} from "typeorm"

@Entity()
class Course {
    @Column()
    course_name: string

    @Column()
    max_capacity: number

    @Column()
    deadline: Date

    @PrimaryGeneratedColumn()
    course_pk: number

    @OneToOne(() => Instructor)
    @JoinColumn()
    instructor: Relation<Instructor>

    @OneToMany(() => Assignment, (assignment) => assignment.course)
    assignments: Relation<Assignment[]>
}

@Entity()
class Assignment {
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
class Instructor {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @PrimaryGeneratedColumn()
    instructor_pk: number
}

@Entity()
class Participant {
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

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "../databases/typeorm.sqlite",
    entities: [Participant, Instructor, Assignment, Course],
    synchronize: true,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        console.log("finished generating")
    })
    .catch((error) => console.log(error))