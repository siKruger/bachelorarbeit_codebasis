/**
 * Siehe 4.2.1
 */
const ITERATIONS = 20;

// eslint-disable-next-line max-len
const executeTimeBehaviour = async (name: string, testFunction: (iteration: number) => Promise<number>) => {
  const times = [];

  for (let x = 0; x < ITERATIONS; x += 1) {
    times.push(await testFunction(x));
  }

  // avg
  const avg = times.reduce((prev, curr) => prev + curr, 0);
  times.push(avg / ITERATIONS);

  console.log(`times for ${name}`);
  console.table(times);
};

export default executeTimeBehaviour;
