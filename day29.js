// --- Day 29: Pancake Sorting ---

// NOTE: THERE IS AN ERROR IN THE PROBLEM DESCRIPTION. THE DESCRIPTION USES 0-index FOR `k` (THE SECTION OF THE PANCAKES TO BE "FLIPPED", BUT THE EXAMPLES AS WELL AS THE ACTUAL INTERNALS OF THE PROBLEM
// USE 1-index, SO GO WITH THAT!)

// Given an array of integers A, We need to sort the array performing a series of pancake flips.

// In one pancake flip we do the following steps:

// Choose an integer k where 0 <= k < A.length.
// Reverse the sub-array A[0...k].
// For example, if A = [3,2,1,4] and we performed a pancake flip choosing k = 2, we reverse the sub-array [3,2,1], so A = [1,2,3,4] after the pancake flip at k = 2.

// Return an array of the k-values of the pancake flips that should be performed in order to sort A. Any valid answer that sorts the array within 10 * A.length flips will be judged as correct.

// Example 1:

// Input: A = [3,2,4,1]
// Output: [4,2,4,3]
// Explanation: 
// We perform 4 pancake flips, with k values 4, 2, 4, and 3.
// Starting state: A = [3, 2, 4, 1]
// After 1st flip (k = 4): A = [1, 4, 2, 3]
// After 2nd flip (k = 2): A = [4, 1, 2, 3]
// After 3rd flip (k = 4): A = [3, 2, 1, 4]
// After 4th flip (k = 3): A = [1, 2, 3, 4], which is sorted.
// Notice that we return an array of the chosen k values of the pancake flips.

// Example 2:

// Input: A = [1,2,3]
// Output: []
// Explanation: The input is already sorted, so there is no need to flip anything.
// Note that other answers, such as [3, 3], would also be accepted.

// Constraints:

// 1 <= A.length <= 100
// 1 <= A[i] <= A.length
// All integers in A are unique (i.e. A is a permutation of the integers from 1 to A.length).

// ----------

// we work our way backward through `A`, moving each number to the correct spot (similar to selection sort). since we know that `A` is made up of all the numbers from 1 through `A.length`, it is easy to
// know which number should go into which index. thus, as we iterate backward through `A`, we only need to take action if `A[i] !== n` where `n === i + 1`. if this is the case, we simply call our predefined
// `flip` function on `n`. the way it works is to get `n` into the correct position (at `A[i]`) by performing 2 "pancake flips" without disturbing anything to the right of `A[i]`: (1) flip up to wherever
// the actual number `n` lives, resulting in `n` being in `A[0]`, and then (2) flip up to `A[i]`, resulting in `n` being in `A[i]` as required. by doing it this way, we will also meet the requirement that
// we perform no more than 10 * `A.length` flips, since we will only be doing 2 * `A.length` flips! in order to perform step (1) above, we would need to know where the actual number `n` lives at any given
// point in time. to do this in O(1) time, we can create a complementary `refArr` such that for every `A[i] === n`, we have `refArr[n] === i`. when performing any flips, we make sure to update both `A` and
// `refArr` as needed.
function solution_1 (A) {

  // INITIALIZATION
  const output = [];
  const refArr = [null];                                    // if `A[i] === n`, then `refArr[n] === i`. note that we throw in null into index 0. `A` will never contain 0.
  A.forEach((n, i) => refArr[n] = i);

  // DEFINE `flip` FUNCTION: given `n`, perform 2 flips to get it in the right spot
  function flip (n) {
    const indexOfN = refArr[n];
    for (let i = 0; i < indexOfN/2; ++i) {                  // flip all nums from start to `n` (remember to run the for loop only up to half of `indexOfN`)
      const a = A[i];
      const b = A[indexOfN - i];
      [refArr[a], refArr[b]] = [refArr[b], refArr[a]];        // swap opposite `refArr` elements
      [A[i], A[indexOfN - i]] = [A[indexOfN - i], A[i]];      // swap opposite `A` elements
    }
    for (let i = 0; i < (n - 1)/2; ++i) {                   // flip all nums up to where `n` should go (remember to run the for loop only up to half of `n - 1`)
      const a = A[i];
      const b = A[(n - 1) - i];
      [refArr[a], refArr[b]] = [refArr[b], refArr[a]];
      [A[i], A[(n - 1) - i]] = [A[(n - 1) - i], A[i]];
    }
    output.push(indexOfN + 1, n);                           // represent the two flips we just performed in `output`
  }

  // ITERATION
  for (let i = A.length - 1; i >= 0; --i) {
    const n = i + 1;                                        // `n` is the number that should live in current position
    if (A[i] !== n) flip(n);                                // if `A[i] === n` then this number is correctly sorted
  }

  return output;
}

const pancakeSort = solution_1;

const specialTest = A => {
  function flip (A, n) {                                    // since `pancakeSort` produces an array of 1-index flip positions, `n` here is also 1-index
    for (let i = 0; i < (n - 1)/2; ++i) {                   // (remember to run the for loop only up to half of `n - 1`)
      [A[i], A[(n - 1) - i]] = [A[(n - 1) - i], A[i]];      // swap opposite elements
    }
  }
  const cloneA = [...A];                                    // make sure to clone `A` first - otherwise, `pancakeSort(A)` would mutate `A` before we could test it with `flip`
  const output = pancakeSort(cloneA);                       // make sure to perform `pancakeSort` on `cloneA` rather than `A`
  output.forEach(n => flip(A, n));                          // now, run `A` through a series of flips based on the order given by `output`
  return (
    output.length <= A.length * 10 &&                       // ("Any valid answer that sorts the array within 10 * A.length flips will be judged as correct.")
    A.every((n, i) => n === i + 1)                          // after flipping, `A` should be sorted: 1 through `A.length`
  );
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  A: [3, 2, 4, 1],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  A: [1, 2, 3],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: