// --- Day 4: Power of Four ---

// Given an integer (signed 32 bits), write a function to check whether it is a power of 4.

// Example 1:

// Input: 16
// Output: true

// Example 2:

// Input: 5
// Output: false

// Follow up: Could you solve it without loops/recursion?

// ----------

// based on thomas' one-liner (shown below) - using recursion, keep dividing `num` by 4 until it is not greater than 3, and then see if the result is 1.
function solution_1 (num) {
  return num > 3 ? isPowerOfFour(num / 4) : num === 1;
}

// thomas luo's one-liner (works on leetcode, but won't work with node):
// z=isPowerOfFour=p=>p>3?z(p/4):p==1

// convert the num to its binary representation, and then make sure that the length is odd, the first digit is '1', and the rest are '0'
function solution_2 (num) {
  const binary = num.toString(2);
  return binary.length % 2 &&
    binary.split('')
      .every((digit, i) => !i && +digit || i && !+digit);
};

// one-liner - basically the above
solution_3=(n,b=n.toString(2).split``)=>b.length%2&&b.every((d,i)=>!i!=!+d)

// similar idea to the above, but no need to convert to array - we can directly compare against a string we generate
function solution_4 (num) {
  const binary = num.toString(2);
  return binary.length % 2 && binary === '1' + '0'.repeat(binary.length - 1);
}

// one-liner - basically the above
solution_5=(n,b=n.toString(2),L=b.length)=>L%2&&b=='1'+'0'.repeat(L-1)

const isPowerOfFour = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = isPowerOfFour;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  num: 16,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  num: 5,
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: