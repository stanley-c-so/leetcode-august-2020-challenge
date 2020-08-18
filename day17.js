// --- Day 17: Distribute Candies to People ---

// We distribute some number of candies, to a row of n = num_people people in the following way:

// We then give 1 candy to the first person, 2 candies to the second person, and so on until we give n candies to the last person.

// Then, we go back to the start of the row, giving n + 1 candies to the first person, n + 2 candies to the second person, and so on until we give 2 * n candies to the last person.

// This process repeats (with us giving one more candy each time, and moving to the start of the row after we reach the end) until we run out of candies.  The last person will receive all of our remaining candies (not necessarily one more than the previous gift).

// Return an array (of length num_people and sum candies) that represents the final distribution of candies.

// Example 1:

// Input: candies = 7, num_people = 4
// Output: [1,2,3,1]
// Explanation:
// On the first turn, ans[0] += 1, and the array is [1,0,0,0].
// On the second turn, ans[1] += 2, and the array is [1,2,0,0].
// On the third turn, ans[2] += 3, and the array is [1,2,3,0].
// On the fourth turn, ans[3] += 1 (because there is only one candy left), and the final array is [1,2,3,1].

// Example 2:

// Input: candies = 10, num_people = 3
// Output: [5,2,3]
// Explanation: 
// On the first turn, ans[0] += 1, and the array is [1,0,0].
// On the second turn, ans[1] += 2, and the array is [1,2,0].
// On the third turn, ans[2] += 3, and the array is [1,2,3].
// On the fourth turn, ans[0] += 4, and the final array is [5,2,3].

// Constraints:

// 1 <= candies <= 10^9
// 1 <= num_people <= 1000

// ----------

// very straightforward - just keep distributing candy person by person until you run out
function solution_1 (candies, num_people) {
  const output = Array(num_people).fill(0);
  let i = 0;                                    // tracks which person you are giving candy to
  let n = 1;                                    // tracks the current number of candies being given out (if no shortage)
  while (candies) {
    const amount = Math.min(n, candies);        // tracks the actual number of candies being given out (Math.min handles the event of a shortage)
    output[i] += amount;
    candies -= amount;
    i = i === num_people - 1 ? 0 : i + 1;       // iterate to the next person, or loop around - also the same as `i = (i + 1) % num_people`
    ++n;
  }
  return output;
}

// one-liner - basically the above
solution_2=(c,p)=>eval(`o=Array(p).fill(0);i=0;n=1;while(c){a=n<c?n:c;o[i]+=a;c-=a;i=(i+1)%p;++n}o`)

// alex mok's one-liner
solution_3=(c,n,a=Array(n).fill(i=0))=>eval(`while((c-=i)>0)a[i%n]+=c>++i?i:c,a`)

const distributeCandies = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = distributeCandies;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  candies: 7,
  num_people: 4,
};
expected = [1, 2, 3, 1];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  candies: 10,
  num_people: 3,
};
expected = [5, 2, 3];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: