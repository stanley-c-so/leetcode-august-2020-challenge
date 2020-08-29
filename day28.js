// --- Day 28: Implement Rand10() Using Rand7() ---

// Given a function rand7 which generates a uniform random integer in the range 1 to 7, write a function rand10 which generates a uniform random integer in the range 1 to 10.

// Do NOT use system's Math.random().

// Example 1:
// Input: 1
// Output: [7]

// Example 2:
// Input: 2
// Output: [8,4]

// Example 3:
// Input: 3
// Output: [8,1,10]

// Note:

// rand7 is predefined.
// Each testcase has one argument: n, the number of times that rand10 is called.

// Follow up:

// What is the expected value for the number of calls to rand7() function?
// Could you minimize the number of calls to rand7()?

// ----------

// we make two independent calls to `rand7`. if we imagine that these point to a specific `row` and `col` (1-index) of a 7x7 grid, where each cell is numbered from 1 to 49, then we have now generated a
// random number from 1 to 49 with uniform probability. the highest number divisible by 10 that does not exceed 49 is 40. thus, if we land on 41-49, we can "discard" our result and recurse our function.
// otherwise, if we land on 1-40, each of those map to a number from 1-10 (1, 11, 21, and 31 map to 1; etc.) - simply find `num % 10`. (of course, if `num` is 10, 20, 30, or 40, return 10 instead of 0.)
function solution_1 () {
  const row = rand7();                            // (1-indexed)
  const col = rand7();                            // (1-indexed)
  const num = (row - 1) * 7 + col;                // to map to a number from 1-49, subtract 1 from `row` before multiplying by 7, and then add `col`
  return num > 40 ? rand10() : num % 10 || 10;    // discard 41-49 by recursing. otherwise, return `num % 10` (or if it results in 0, return 10)
}

// one-liner - basically the above
z=solution_2=()=>(n=(x=rand7)()*7-7+x())>40?z():n%10||10

const rand10 = solution_1;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = rand10;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// not really sure how to test this...

// // Test case 1
// input = {
//   ARG_1: `INPUT_HERE`,
// };
// expected = 'EXPECTED_HERE';
// test(func, input, expected, testNum, lowestTest, highestTest);

// // Test case 2
// input = {
//   ARG_1: `INPUT_HERE`,
// };
// expected = 'EXPECTED_HERE';
// test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: