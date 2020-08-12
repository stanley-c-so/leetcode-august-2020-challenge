// --- Day 12: Pascal's Triangle II ---

// Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle.

// Note that the row index starts from 0.

//        1
//       1 1
//      1 2 1
//     1 3 3 1
//    1 4 6 4 1

// In Pascal's triangle, each number is the sum of the two numbers directly above it.

// Example:

// Input: 3
// Output: [1,3,3,1]

// Follow up:
// Could you optimize your algorithm to use only O(k) extra space?

// ----------

// this solution uses only O(k) extra space. we simply keep track of current row (`curr`) and use it to derive the next row (`next`). at the end of each iteration we clear out old data.
function solution_1 (rowIndex) {
  const curr = [1];
  const next = [];
  while (rowIndex--) {
    next.length = 0;                            // clear `next`
    next.push(1);                               // initialize `next` as [1]
    for (let i = 1; i < curr.length; ++i) {
      next.push(curr[i - 1] + curr[i]);         // calculate sums between each adjacent pair of numbers in `curr`
    }
    next.push(1);                               // add final 1 to `next`
    curr.length = 0;                            // clear `curr`
    curr.push(...next);                         // copy `next` into `curr`
  }
  return curr;
}

// one-liner - basically the above, except i'm not sure if it's really using O(k) extra space under the hood every time i reassign arrays - not sure if garbage collection is happening
solution_2=k=>eval(`c=[1];while(k--){n=[1];c.map((e,i)=>i&&n.push(c[i-1]+e));n.push(1);c=n}c`)

const getRow = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = getRow;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  rowIndex: 3,
};
expected = [1, 3, 3, 1];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: