// --- Day 3: Valid Palindrome ---

// Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

// Note: For the purpose of this problem, we define empty string as valid palindrome.

// Example 1:

// Input: "A man, a plan, a canal: Panama"
// Output: true
// Example 2:

// Input: "race a car"
// Output: false
 
// Constraints:

// s consists only of printable ASCII characters.

// ----------

// we set `left` and `right` pointers on both ends of the string. we use a while loop such that each iteration represents one comparison of the valid character at `s[left]` and `s[right]`. inside the loop,
// we have two sibling while loops to help us skip over invalid characters (by checking for membership in the `permitted` set). the exit condition (return true) occurs if `left` has reached or surpassed
// `right` (the two pointers can cross over each other if in the previous iteration they were adjacent). otherwise, we compare the letter at `left` and `right` (ignoring case difference) and if there is a
// mismatch then we return false. if we survive the check, we increment `left` and decrement `right`.
function solution_1 (s) {
  if (!s) return true;
  const permitted = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
  let left = 0;
  let right = s.length - 1;
  while (true) {
    while (left < right && !(permitted.has(s[left]))) ++left;
    while (left < right && !(permitted.has(s[right]))) --right;
    if (left >= right) return true;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    ++left;
    --right;
  }
}

// one-liner - basically the above
solution_2=(s,L='toLowerCase',l=0,r=s.length-1,p=(c,C=c[L]())=>C>='a'&&C<='z'||C>='0'&&C<='9')=>{if(!s)return!0;while(8){while(l<r&&!p(s[l]))++l;while(l<r&&!p(s[r]))--r;if(l>=r)return!0;if(s[l][L]()!=s[r][L]())return!9;++l;--r}}

const isPalindrome = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = isPalindrome;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: "A man, a plan, a canal: Panama",
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: "race a car",
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: