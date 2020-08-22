// --- Day 21: Sort Array By Parity ---

// Given an array A of non-negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.

// You may return any answer array that satisfies this condition.

// Example 1:

// Input: [3,1,2,4]
// Output: [2,4,3,1]
// The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

// Note:

// 1 <= A.length <= 5000
// 0 <= A[i] <= 5000

// ----------

// simplest solution i can think of
function solution_1 (A) {
  const even = A.filter(n => !(n % 2));
  const odd = A.filter(n => n % 2);
  return [...even, ...odd];
}

// the intended solution using O(1) space - similar idea to quick sort - start with two pointers at the outer edges. there are four cases: (1) they're both even, (2) they're both odd, (3) left is even while
// right is odd, (4) left is odd while right is even. if (3), both numbers are in a good place, so you move both pointers inward. if (4), you swap them, and move both pointers inward. if (1) or (2), then one
// number is correctly placed but the other is not, so you move the pointer on the side of the correctly placed number inward.
// note: the solution here uses the same logic as above but doesn't break down the control flow in the same case by case way, so as to repeat less code (at the expense of being harder to read).
function solution_2 (A) {
  let left = 0;
  let right = A.length - 1;
  while (left < right) {
    const L = A[left] % 2;
    const R = A[right] % 2;
    if (L && !R) [A[left], A[right]] = [A[right], A[left]];   // case 4 - swap, and both `right` and `left` will move inward because of the next two lines
    if (L || (!L && R)) --right;                              // case 2 (or 4) or 3 - `right` must move inward
    if (!R || (!L && R)) ++left;                              // case 1 (or 4) or 3 - `left` must move inward
  }
  return A;
}

// one-liner - based on reduce. time complexity is bad because we are recreating the array each time
solution_3=A=>A.reduce((o,n)=>n%2?[...o,n]:[n,...o],[])

// alex mok's one-liner - sort
solution_4=A=>A.sort((a,b)=>a%2-b%2)

const sortArrayByParity = solution_4;

const specialTest = A => {
  const output = sortArrayByParity(A);
  let reachedOdd = false;
  for (const num of output) {
    if (num % 2) reachedOdd = true;
    if (reachedOdd && num % 2 === 0) return false;
  }
  return true;
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = sortArrayByParity;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  A: [3, 1, 2, 4],
};
expected = true;
test(specialTest, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: