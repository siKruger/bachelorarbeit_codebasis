/**
 * Siehe 4.9.1
 */
import { instructor } from '../sequelizeInit';

const dataset = { firstName: 'Maria', lastName: 'Hardy', instructor_pk: 1 };

const sequelizeAnalysability = async () => {
  await instructor.create({ ...dataset });

  const user = await instructor.findByPk(1);

  await user.update({ firstName: 'Ben' });

  await instructor.destroy({
    where: {
      instructor_pk: 1,
    },
  });
};
sequelizeAnalysability();
