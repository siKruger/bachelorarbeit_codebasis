import { isPrime } from 'mathjs';

const calcPrime = (): number => {
  const startTime = Date.now();
  isPrime(Array.from({ length: 5000000 }, (_, index) => index));
  const endTime = Date.now();
  return endTime - startTime;
};

const ITERATIONS = 10;
export const executeCoExistance = async (name: string, ormCalc: () => void) => {
  const times = {
    primeOnly: [], ormIncluded: [],
  };

  console.log('Testing prime numbers w.o. ORM');
  for (let i = 0; i < ITERATIONS; i += 1) {
    times.primeOnly.push(calcPrime());
  }

  console.log(`Testing prime numbers with ${name}`);
  for (let i = 0; i < ITERATIONS; i += 1) {
    times.ormIncluded.push(calcPrime());
    await ormCalc();
  }

  for (const [key, value] of Object.entries(times)) {
    const avg = times[key].reduce((prev, curr) => prev + curr, 0);
    times[key].push(avg / ITERATIONS);
  }

  console.log(`times for ${name}`);
  console.table(times);
};
