// --- Day 26: Fizz Buzz ---

// Write a program that outputs the string representation of numbers from 1 to n.

// But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.

// Example:

// n = 15,

// Return:
// [
//     "1",
//     "2",
//     "Fizz",
//     "4",
//     "Buzz",
//     "Fizz",
//     "7",
//     "8",
//     "Fizz",
//     "Buzz",
//     "11",
//     "Fizz",
//     "13",
//     "14",
//     "FizzBuzz"
// ]

// ----------

// very straightforward - run a for loop from 1 to `n`, and check for the 4 cases: (1) divisible by both -> 'FizzBuzz'; (2) divisible by 3 -> 'Fizz'; (3) divisible by 5 -> 'Buzz'; (4) neither -> `String(i)`
function solution_1 (n) {
  const output = [];
  for (let i = 1; i <= n; ++i) {
    output.push(
      !(i % 3) && !(i % 5) ? 'FizzBuzz'
      : !(i % 3) ? 'Fizz'
      : !(i % 5) ? 'Buzz'
      : String(i)
    );
  }
  return output;
}

// run a for loop from 1 to `n`, and initialize `string` as empty. add 'Fizz' if divisible by 3. add 'Buzz' if divisible by 5. if `string` is still empty, then it is not divisible by 3 or 5 -> `String(i)`.
// this solution is interesting because it is not written with mutually exclusive cases baked into its logic, but it still works.
function solution_2 (n) {
  const output = [];
  for (let i = 1; i <= n; ++i) {
    let string = '';
    if (!(i % 3)) string += 'Fizz';
    if (!(i % 5)) string += 'Buzz';
    if (!string) string += i;
    output.push(string);
  }
  return output;
}

// one-liner - basically solution 1
solution_3=n=>eval(`o=[];for(i=1;i<=n;++i)o.push(i%3&&i%5?i+'':i%3?'Buzz':i%5?'Fizz':'FizzBuzz');o`)

const fizzBuzz = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = fizzBuzz;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 15,
};
expected = [
  "1",
  "2",
  "Fizz",
  "4",
  "Buzz",
  "Fizz",
  "7",
  "8",
  "Fizz",
  "Buzz",
  "11",
  "Fizz",
  "13",
  "14",
  "FizzBuzz",
];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: