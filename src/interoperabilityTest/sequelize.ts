import { instructor } from '../sequelizeInit';

const sequelizeCreate = await (instructor.build({
  instructor_pk: 'w',
  lastName: 1,
  KeinWert: 'nicht',
})).save();

// Es werden keine Typen angezeigt. Es besteht somit keine Typsicherkeit
const sequelizeResult = await instructor.findAll({
  where: {
    lastName: 'Test',
  },
  attributes: ['firstName'],
});
