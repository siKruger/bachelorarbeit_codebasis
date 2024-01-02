import { instructor } from '../sequelizeInit';

await instructor.create({
  firstName: 22,
  lastName: true,
  nstructor_pk: 1,
});

await instructor.findAll({
  where: {
    firstName: 2,
  },
  include: ['surname'],
});

await instructor.update({ firstName: null }, {
  where: {
    firstName: '',
  },
});

await instructor.destroy({
  where: {
    instructor_pk: '1',
  },
});
