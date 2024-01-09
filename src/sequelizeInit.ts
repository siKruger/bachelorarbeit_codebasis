import {
  DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sequelize.sqlite',
  logging: false,
});

console.log('Starting sequelize database generation...');
const start = Date.now();

interface Participant extends Model<InferAttributes<Participant>, InferCreationAttributes<Participant>> {
  firstName: string;
  lastName: string;
  participant_pk: number;
}

export const participant = sequelize.define<Participant>('Participant', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  participant_pk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

interface Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  course_name: string;
  max_capacity: number;
  course_pk: number;
  instructor_pk: number;
}

export const course = sequelize.define<Course>('Course', {
  course_name: {
    type: DataTypes.STRING,
  },
  max_capacity: {
    type: DataTypes.INTEGER,
  },
  course_pk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  instructor_pk: {
    type: DataTypes.INTEGER,
  },
});

interface Assignment extends Model<InferAttributes<Assignment>, InferCreationAttributes<Assignment>> {
  title: string;
  description: string;
  assignment_pk: number;
  course_pk: number;
}

export const assignment = sequelize.define<Assignment>('Assignment', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  assignment_pk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  course_pk: {
    type: DataTypes.INTEGER,
  },
});

interface Instructor extends Model<InferAttributes<Instructor>, InferCreationAttributes<Instructor>> {
  firstName: string;
  lastName: string;
  instructor_pk: number;
}

export const instructor = sequelize.define<Instructor>('Instructor', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  instructor_pk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

instructor.hasOne(course, {
  foreignKey: {
    name: 'instructor_pk',
  },
  constraints: false,
});
// course.belongsTo(instructor, {foreignKey: {
//     name: "instructor_pk",
// },
// onDelete: "cascade"})

course.hasMany(assignment, {
  foreignKey: {
    name: 'course_pk',
  },
  constraints: false,
});
// assignment.belongsTo(course);

export const participates = sequelize.define('Participates', {
  participant_pk: {
    type: DataTypes.INTEGER,
    references: {
      model: participant, // 'Movies' would also work
      key: 'id',
    },
  },
  course_pk: {
    type: DataTypes.INTEGER,
    references: {
      model: course, // 'Actors' would also work
      key: 'id',
    },
  },
});

participant.belongsToMany(course, { through: 'A' });
course.belongsToMany(participant, { through: 'A' });

participant.sync();
instructor.sync();
assignment.sync();
participates.sync();
course.sync();

const end = Date.now();
console.log(`Finished sequelize database generation... ${end - start} ms`);
