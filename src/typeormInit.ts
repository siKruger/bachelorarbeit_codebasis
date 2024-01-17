// eslint-disable-next-line max-classes-per-file
import 'reflect-metadata';
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
  Relation,
} from 'typeorm';

@Entity()
export class Course {
  @Column()
    course_name: string;

  @Column()
    max_capacity: number;

  @PrimaryGeneratedColumn()
    course_pk: number;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  @OneToOne(() => Instructor, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'instructor_pk' })
    instructor: Relation<Instructor>;

  @Column({ nullable: true })
    instructor_pk: number;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  @OneToMany(() => Assignment, (assignment) => assignment.course)
    assignments: Relation<Assignment[]>;
}

@Entity()
export class Assignment {
  @Column()
    title: string;

  @Column()
    description: string;

  @PrimaryGeneratedColumn()
    assignment_pk: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_pk' })
    course: Relation<Course>;

  @Column()
    course_pk: number;
}

@Entity()
export class Instructor {
  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @PrimaryGeneratedColumn()
    instructor_pk: number;

  @OneToOne(() => Course, (course) => course.instructor, { nullable: true, onDelete: 'SET NULL' })
    course: Relation<Course>;
}

@Entity()
export class Participant {
  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @PrimaryGeneratedColumn()
    participant_pk: number;

  @ManyToMany(() => Course)
  @JoinTable()
    participates: Course;
}

const start = Date.now();

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'typeorm.sqlite',
  entities: [Participant, Instructor, Assignment, Course],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    const end = Date.now();
    console.log(`Generated TypeORM Database definitions... ${end - start} ms`);
  })
  .catch((error) => console.log(error));
