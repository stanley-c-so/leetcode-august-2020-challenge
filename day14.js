// --- Day 14: Longest Palindrome ---

// Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.

// This is case sensitive, for example "Aa" is not considered a palindrome here.

// Note:
// Assume the length of given string will not exceed 1,010.

// Example:

// Input:
// "abccccdd"

// Output:
// 7

// Explanation:
// One longest palindrome that can be built is "dccaccd", whose length is 7.

// ----------

// if a letter appears in `s` an even number of times, then each of these letters can appear in the longest palindrome. if a letter appears an odd number of times, all but one of these letters can appear
// in the longest palindrome, with one exception: out of all of the letters that appear an odd number of times, we can include one of these odd letters one time (to form the middle of the palindrome). note
// that we don't care about which letter goes where within the palindrome - we just have to make sure we have included the correct amount. thus, this problem becomes as simple as finding the number of odd
// letters, and subtracting the "double counted" odds from `s.length` (which represents including ALL the letters). if there were no odds, then `s.length` is already the proper count. else, subtract the
// number of odds, and add back 1.
function solution_1 (s) {
  const freq = s.split('').reduce((dict, curr) => {
    if (!dict[curr]) dict[curr] = 0;
    ++dict[curr];
    return dict;
  }, {});
  let numOdds = 0;
  for (const val of Object.values(freq)) {
    if (val % 2) ++numOdds;
  }
  return numOdds ? s.length - numOdds + 1 : s.length;   // if there were no odds (or even if there was only 1), then `s.length` is the proper count. if >1 odds, we double counted a letter for each extra odd
}

// one-liner - basically the above
solution_2=(s,f={},o=0,x=s.length)=>(s.split``.map(c=>f[c]=f[c]+1||1),Object.values(f).map(n=>o+=n%2),o?x-o+1:x)

const longestPalindrome = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = longestPalindrome;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: 'abccccdd',
};
expected = 7;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: