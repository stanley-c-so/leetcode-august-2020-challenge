// --- Day 18: Numbers With Same Consecutive Differences ---

// Return all non-negative integers of length N such that the absolute difference between every two consecutive digits is K.

// Note that every number in the answer must not have leading zeros except for the number 0 itself. For example, 01 has one leading zero and is invalid, but 0 is valid.

// You may return the answer in any order.

// Example 1:

// Input: N = 3, K = 7
// Output: [181,292,707,818,929]
// Explanation: Note that 070 is not a valid number, because it has leading zeroes.

// Example 2:

// Input: N = 2, K = 1
// Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
 
// Note:
// 1 <= N <= 9
// 0 <= K <= 9

// ----------

// there are two edge cases we should handle first: (1) if `N` is 1 then the answer will always be `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]` regardless of `K`. (2) other than the previous case, if `K` is 0,
// the answer is an array of 9 elements, where each element is the digits from 1-9, repeated `N` times.
// in the regular cases, we can start with an empty `output` array. we have a `recurse` function which takes in a string (representing a partial candidate number in string form). if and only if the
// input string length is equal to N, we convert it to a number and push to `output`. otherwise, if the input is empty (as it will be when we kickstart the recursion in the main function), we iterate
// through the digits 1-9 and recurse with those (in string form) as inputs. otherwise, the input was not empty, so we grab the most recent digit, and check whether we can decrement it and/or increment
// it by `K` and still result in a single digit between 0-9 - in each case, if so, we tack on the newly created digit and recurse.
function solution_1 (N, K) {
  // UTILITY
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];             // we will be reusing this a few times
  
  // EDGE CASES: N === 1, and K === 0
  if (N === 1) return [0, ...digits];                     // i.e. return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (!K) return digits.map(n => String(n).repeat(N));    // e.g. if `N` is 3, return [111, 222, ... , 999]

  // RECURSION
  function recurse (s) {                                  // recursive helper function
    if (s.length === N) {
      output.push(+s);                                    // result found
    } else if (!s) {
      digits.forEach(n => recurse(String(n)));            // if this is the initial call of `recurse`, call it again on '1', '2', ... , '9'
    } else {
      const digit = +s[s.length - 1];
      if (digit >= K) recurse(s + (digit - K));           // recurse if last digit can be decremented by 'K'
      if (digit + K <= 9) recurse(s + (digit + K));       // recurse if last digit can be incremented by 'K'
    }
  }
  const output = [];
  recurse('');                                            // kickstart the helper function
  return output;
}

// one-liner - basically the above, except by using a set, we do not need to handle the edge case of `K === 0` (the regular recursion logic works, but `d+K` and `d-K` would create duplicates without a set)
solution_2=(N,K,D=[1,2,3,4,5,6,7,8,9],L='length',R=(s,d)=>s[L]==N?o.add(+s):s?(d=+s[s[L]-1],d>=K?R(s+(d-K)):0,d+K<=9?R(s+(d+K)):0):D.map(c=>R(c+'')),o=new Set())=>N-1?(R(''),[...o]):[0,...D]

const numsSameConsecDiff = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = numsSameConsecDiff;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  N: 3,
  K: 7,
};
expected = [ 181, 292, 707, 818, 929 ];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// Test case 2
input = {
  N: 2,
  K: 1,
};
expected = [ 10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98 ];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: