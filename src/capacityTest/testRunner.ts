import fs from 'fs';

export function sleep(milliseconds: number) {
  return new Promise((resolve) => { setTimeout(resolve, milliseconds); });
}

const TEST_RUNS = 5;

const capacity = { current: 1, reached: false, capacityHistory: [] };
// eslint-disable-next-line max-len
export const executeCapacityTest = async (capacityFunction: (reached: { current: number, reached: boolean, capacityHistory: number[] }) => void, name: string) => {
  // test for capacity
  for (let x = 0; x < TEST_RUNS; x += 1) {
    capacity.current = 1;
    capacity.reached = false;
    // eslint-disable-next-line max-len
    while (!capacity.reached && process.memoryUsage().heapUsed < 4000000000 && capacity.current <= 100000) {
      capacityFunction(capacity);

      await sleep(1);

      capacity.current += 1;
      console.log(`current capacity ${capacity.current} with ~${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}mb of Heap for ${name}`);
    }
    console.log(`capacity reached at ${capacity.current}. ${x < TEST_RUNS ? 'Rerunning tests...' : ''} for ${name}`);
    await sleep(10000);
    capacity.capacityHistory.push(capacity.current);
  }
  // avg
  const avg = capacity.capacityHistory.reduce((prev, curr) => prev + curr, 0);
  capacity.capacityHistory.push(avg / TEST_RUNS);

  console.log(`After ${TEST_RUNS}, this is the result for ${name}`);
  console.table(capacity.capacityHistory);
  if (capacity.capacityHistory[capacity.capacityHistory.length - 1]) console.log('Maximum test iterations have been reached on all runs...');
  fs.writeFile(`${name}.txt`, `${capacity.capacityHistory}`, () => {});
  await sleep(5000);
};
