// --- Day 6: Find All Duplicates in an Array ---

// Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements that appear twice in this array.

// Could you do it without extra space and in O(n) runtime?

// Example:
// Input:
// [4,3,2,7,8,2,3,1]

// Output:
// [2,3]

// ----------

// NOTE: i assume by "without extra space" the problem does not mean i cannot make a separate array with the output.
// since we are told that every array element `num` will be between 1 and n, inclusive, that means `num - 1` will map nicely to an array index.
// this also means we can simply flip the sign on whatever element that lives at nums[Math.abs(num)] to indicate that we have encountered `num`. (because we are
// flipping signs, we must work with the absolute value of `num` in case `num` itself has been flipped already.) in the end, any number that only appears once will
// result in the number living at its index value be negative. on the other hand, any number that appears twice will result in the number living at its index value
// be positive. we can complete this in one pass: when we check the number corresponding to `Math.abs(num)`, we flip it negative if it is positive. else, it must be
// positive, so this is our second time encountering `Math.abs(num)`, and we dump `Math.abs(num)` into the `output` array.
function solution_1 (nums) {
  const output = [];
  for (const num of nums) {
    const positive = Math.abs(num);                         // since `num` may already be flipped positive, we only care about its positive counterpart
    if (nums[positive - 1] > 0) nums[positive - 1] *= -1;   // check the value corresponding to `nums[positive - 1]`. if positive, flip it negative...
    else output.push(positive);                             // ...if negative, then this is our second time encountering `positive`, so dump it into the `output`
  }
  return output;
}

// thomas luo's one-liner - basically the above. note that in the expression `e*=e<0?-1:1`, it evaluates like: `e *= (e < 0 ? -1 : 1)` - in other words it is short
// for `e = Math.abs(e)` (it converts it so that further down the rest of the expression, `e` has already been converted to its absolute value)
solution_2=(n,r=[])=>n.map(e=>n[(e*=e<0?-1:1)-1]<0?r.push(e):n[e-1]*=-1)&&r

const findDuplicates = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = findDuplicates;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [4, 3, 2, 7, 8, 2, 3, 1],
};
expected = [2, 3];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: