const ITERATIONS = 5;

export const executeTimeBehaviour = async (name: string, testFunction: (iteration: number) => Promise<number>) => {
  const times = [];

  for (let x = 1; x <= ITERATIONS; x += 1) {
    times.push(await testFunction(x));
  }
  console.table(times);
};
