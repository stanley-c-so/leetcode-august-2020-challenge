// --- Day 11: H-Index ---

// Given an array of citations (each citation is a non-negative integer) of a researcher, write a function to compute the researcher's h-index.

// According to the definition of h-index on Wikipedia: "A scientist has index h if h of his/her N papers have at least h citations each, and the other N − h papers have no more than h citations each."

// Example:

// Input: citations = [3,0,6,1,5]
// Output: 3 
// Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had 
//              received 3, 0, 6, 1, 5 citations respectively. 
//              Since the researcher has 3 papers with at least 3 citations each and the remaining 
//              two with no more than 3 citations each, her h-index is 3.

// Note: If there are several possible values for h, the maximum one is taken as the h-index.

// ----------

// once the input is sorted, this is basically a binary search problem, with the added wrinkle that you have a moving "target". whenever you calculate a `middle` index, from there you can derive
// `indexFromEnd`, which is the counting position of that element from the right end of the array (the last element is 1, the one before that is 2, etc.) and if the number at `middle` matches
// `indexFromEnd` then you immediately return because `indexFromEnd` is your answer. the trickier aspect of this problem is dealing with edge cases. where the middle number is greater than `indexFromEnd`,
// it turns out you can just close the window (reassign `right` to `middle - 1`). it is, of course, possible that the current value of `indexFromEnd` will end up being the correct answer (if the h-index
// itself is not represented in the array, but would go to the left of the middle number) but we will still reach this answer following the rest of the logic. on the other hand, where the middle number
// is less than `indexFromEnd`, we close the window (reassign `left` to `middle + 1`), but ADDITIONALLY, we decrement `indexFromEnd`. why? if the while loop continues to run, a new `middle` will be
// calculated, and with it, a new `indexFromEnd`, so the decrement didn't matter. however, if the while loop does NOT continue to run, then that means at the final iteration, `left === right`, the
// h-index is not represented in the array, but would go to the right of the current window, and thus the true output is `indexFromEnd` after it was decremented.
function solution_1 (citations) {
  citations.sort((a, b) => a - b);
  let left = 0;
  let right = citations.length - 1;
  let indexFromEnd = 0;                                     // this is our moving "target" which is defined based on the value of `middle`. default value 0 to handle edge case: empty input
  while (left <= right) {
    const middle = Math.floor((right - left) / 2) + left;
    indexFromEnd = citations.length - middle;               // e.g. final number is 1, the number before that is 2, etc.
    if (citations[middle] === indexFromEnd) break;          // ideal scenario: middle number matches `indexFromEnd`, and you immediately have your answer
    if (citations[middle] > indexFromEnd) {                 // if middle number is too big, close the window and search left half
      right = middle - 1;
    }
    if (citations[middle] < indexFromEnd) {                 // if middle number is too small, close the window and search right half...
      left = middle + 1;
      --indexFromEnd;                                       // ...but also decrement `indexFromEnd` to allow for the output to be just outside of the window, in case window totally closes
    }
  }
  return indexFromEnd;                                      // we reach this line either from a middle number matching `indexFromEnd`, or from the window closing
}

// one-liner - basically the above
solution_2=(c,x=c.length,l=0,r=x-1,i=0)=>eval(`c.sort((a,b)=>a-b);while(l<=r){m=((l+r)/2)|0;i=x-m;if(c[m]==i)break;if(c[m]>i)r=m-1;else{l=m+1;--i}}i`)

// thomas luo's one-liner - other than the sort, this would be a linear time solution, but that's fine because it gets absorbed by the sort anyway
solution_3=(c,h=0)=>c.sort((a,b)=>a-b).map((e,i)=>e-h?h=h>(r=Math.min(e,c.length-i))?h:r:0)|h

const hIndex = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = hIndex;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  citations: [3,0,6,1,5],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: