// --- Day 10: Excel Sheet Column Number ---

// Given a column title as appear in an Excel sheet, return its corresponding column number.

// For example:

//     A -> 1
//     B -> 2
//     C -> 3
//     ...
//     Z -> 26
//     AA -> 27
//     AB -> 28 
//     ...

// Example 1:
// Input: "A"
// Output: 1

// Example 2:
// Input: "AB"
// Output: 28

// Example 3:
// Input: "ZY"
// Output: 701
 
// Constraints:

// 1 <= s.length <= 7
// s consists only of uppercase English letters.
// s is between "A" and "FXSHRXW".

// ----------

// this is similar to base conversion: simply analyze the string character by character, multiplying total so far by 26 and adding the next digit. to start off, we
// create `dict` to get the letter-to-number mapping. then we initialze `sum` as the numerical value of the first character. we iterate through remaining characters
// via the procedure described above.
function solution_1 (s) {
  const dict = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .reduce((d, c, i) => {
      if (i) d[c] = i;
      return d;
    }, {});
  let sum = dict[s[0]];
  for (let i = 1; i < s.length; ++i) {
    sum *= 26;
    sum += dict[s[i]];
  }
  return sum;
}

// one-liner - basically the above, but using a helper function `f=c=>c.charCodeAt(0)-64` to find the numerical value of each letter
solution_2=(s,f=c=>c.charCodeAt(0)-64)=>s.split``.map((c,i)=>t=i?(t*=26,t+=f(c)):f(c))|t

const titleToNumber = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = titleToNumber;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: 'A',
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: 'AB',
};
expected = 28;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  s: 'ZY',
};
expected = 701;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: