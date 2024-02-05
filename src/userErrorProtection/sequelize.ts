/**
 * Siehe 5.4.1
 */
import { instructor } from '../sequelizeInit';

instructor.create({
  firstName: 22,
  lastName: true,
  nstructor_pk: 1,
});

instructor.findAll({
  where: {
    firstName: 2,
  },
  include: ['surname'],
});

instructor.update({ firstName: null }, {
  where: {
    firstName: '',
  },
});

instructor.destroy({
  where: {
    instructor_pk: '1',
  },
});
