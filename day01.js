// --- Day 1: Detect Capital ---

// Given a word, you need to judge whether the usage of capitals in it is right or not.

// We define the usage of capitals in a word to be right when one of the following cases holds:

// All letters in this word are capitals, like "USA".
// All letters in this word are not capitals, like "leetcode".
// Only the first letter in this word is capital, like "Google".
// Otherwise, we define that this word doesn't use capitals in a right way.
 

// Example 1:

// Input: "USA"
// Output: True
 

// Example 2:

// Input: "FlaG"
// Output: False
 
// Note: The input will be a non-empty word consisting of uppercase and lowercase latin letters.

// ----------

// if the first letter is lower case, then the rest of the string must also be lower case. else, the first letter is upper case, so the rest of the string must be either all lower case or all upper case.
// to be sure, there are shorter implementations than what i have written here (in terms of lines of code), but i wanted to create as few new strings as possible.
function solution_1 (word) {
  const slice = word.slice(1);
  const upperSlice = slice.toUpperCase();
  const lowerSlice = slice.toLowerCase();
  return (
    word[0] === word[0].toLowerCase()
      ? slice === lowerSlice
      : slice === lowerSlice || slice === upperSlice
  );
}

// constant space solution
function solution_2 (word) {
  const L = word.length;
  if (L < 2) return true;
  let testForLowerCase = word[0] === word[0].toLowerCase() || word[1] === word[1].toLowerCase();    // if this is true, then all letters except the first must be lower case. else, they must be upper case.
  for (let i = 1; i < L; ++i) {
    if ((word[i] === word[i].toUpperCase()) === testForLowerCase) return false;                     // make sure that all letters except the first are the correct case, based on `testForLowerCase`
  }
  return true;
}

// one-liner - similar logic to solution 2, but with linear space
solution_3=(w,f=c=>c>='a'&&c<='z',b=f(w[0])||f(w[1]))=>w.split``.slice(1).every(c=>f(c)==b)

// alex mok's one-liner using regex:
solution_4=w=>/^[A-Z]+$|^[a-z]+$|^[A-Z][a-z]+$/.test(w)

const detectCapitalUse = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = detectCapitalUse;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  word: 'USA',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  word: 'FlaG',
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: