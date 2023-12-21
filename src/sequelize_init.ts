import {DataTypes, INTEGER} from "sequelize";

const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../databases/sequelize.sqlite'
});

console.log("Starting sequelize database generation...")
const start = Date.now();

const participant = sequelize.define('Participant', {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    participant_pk: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
})

const course = sequelize.define('Course', {
    course_name: {
        type: DataTypes.STRING,
    },
    max_capacity: {
        type: DataTypes.INTEGER,
    },
    course_pk: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    deadline: {
        type: DataTypes.DATE,
    }
})

const assignment = sequelize.define('Assignment', {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    assignment_pk: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
})

const instructor = sequelize.define('Instructor', {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    instructor_pk: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
})

instructor.hasOne(course)
course.belongsTo(instructor)

course.hasMany(assignment)
assignment.belongsTo(course)

const participates = sequelize.define('Participates', {
    participant_pk: {
        type: DataTypes.INTEGER,
        references: {
            model: participant, // 'Movies' would also work
            key: 'id'
        }
    },
    course_pk: {
        type: DataTypes.INTEGER,
        references: {
            model: course, // 'Actors' would also work
            key: 'id'
        }
    }
});

participant.belongsToMany(course, { through: "A"})
course.belongsToMany(participant, { through: "A"})


participant.sync()
instructor.sync()
assignment.sync()
participates.sync()
course.sync()


const end = Date.now();
console.log(`Finished sequelize database generation... ${end - start} ms`)