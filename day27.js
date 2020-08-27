// --- Day 27: Find Right Interval ---

// Given a set of intervals, for each of the interval i, check if there exists an interval j whose start point is bigger than or equal to the end point of the interval i, which can be called that j is on the "right" of i.

// For any interval i, you need to store the minimum interval j's index, which means that the interval j has the minimum start point to build the "right" relationship for interval i. If the interval j doesn't exist, store -1 for the interval i. Finally, you need output the stored value of each interval as an array.

// Note:
// You may assume the interval's end point is always bigger than its start point.
// You may assume none of these intervals have the same start point.
 

// Example 1:
// Input: [ [1,2] ]
// Output: [-1]
// Explanation: There is only one interval in the collection, so it outputs -1.
 
// Example 2:
// Input: [ [3,4], [2,3], [1,2] ]
// Output: [-1, 0, 1]
// Explanation: There is no satisfied "right" interval for [3,4].
// For [2,3], the interval [3,4] has minimum-"right" start point;
// For [1,2], the interval [2,3] has minimum-"right" start point.

// Example 3:
// Input: [ [1,4], [2,3], [3,4] ]
// Output: [-1, 2, -1]
// Explanation: There is no satisfied "right" interval for [1,4] and [3,4].
// For [2,3], the interval [3,4] has minimum-"right" start point.

// NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.

// ----------

// i created a custom class called IntervalBST where each interval from the input gets converted into a BST node containing: (1) the start point of that interval, which forms the basis of the BST insertion,
// and (2) the index of that interval within the input, for quick reference. thus, i begin by initializing such a BST based on the input. then, in the main function, i iterate through the input with a .map
// function, mapping each interval (based on its `end` point) to the index position resulting from feeding that `end` into a recursive `search` function. the recursive process is kickstarted at the root of
// the BST. if the current node's `start` position is too high, we recurse to the left (with current `node` replacing `tempNode`, which stores the lowest node found so far that starts higher than `end`). if
// there is no node to the left, we return the index of the current `node`. if the current node's `start` position is too low, we recurse to the right (keeping whatever value `tempNode` is set to). if there
// is no node to the right, then either `tempNode.i` is our answer, or if it is still null, then -1. and finally, if the current node matches the current `end` at issue, then obviously `node.i` is the answer.
function solution_1 (intervals) {
  // if (!intervals.length) return [];                                      // UNNECESSARY EDGE CASE HANDLING (there is no such edge case here, but if there were, it would trip up the next line)
  
  // INITIALIZATION
  const tree = new IntervalBST(intervals[0][0], 0);                         // initialize `tree` with first interval (the first arg is the start point of the interval, and the second arg is the index)
  intervals.forEach((interval, i) => i && tree.insert(interval[0], i));     // insert remaining intervals into the tree (taking advantage of the truthiness of `i`)

  // RECURSIVE `search` FUNCTION
  function search(end, node, tempNode) {                                    // takes the `end` of the interval at issue, and a current `node` within the `tree`. `tempNode` is the smallest larger node so far.
      if (node.start > end) {
          if (node.left) return search(end, node.left, node);               // if current `node` starts after the `end` of the interval at issue, first attempt to recurse to the left, UPDATING `tempNode`
          else return node.i;                                               // of course, if there is no node to the left, then `node.i` is the answer
      } else if (node.start < end) {
          if (node.right) return search(end, node.right, tempNode);         // if current `node` starts before the `end` of the interval at issue, first attempt to recurse to the right, KEEPING `tempNode`
          else return tempNode ? tempNode.i : -1;                           // and if there is no node to the right, then either `tempNode.i` is the answer, or if `tempNode` is null, then -1
      } else {
          return node.i;                                                    // if current `node` starts at the same value as the `end` of the interval at issue, `node.i` is the answer
      }
  }
  
  return intervals.map(([_, end]) => search(end, tree, null));
}

// i use this custom class in my solution(s) above. note: for some reason, if i move this class definition inside and to the top of my main function, that will cause leetcode to timeout, even though it works
// perfectly fine here in node (albeit i obviously don't have all the large tests from leetcode). not exactly sure why.
class IntervalBST {
  constructor(start, i) {
    this.start = start;
    this.i = i;
    this.left = null;
    this.right = null;
  }
  insert(start, i) {
    const dir = start < this.start ? 'left' : 'right';
    if (this[dir]) this[dir].insert(start, i);
    else this[dir] = new IntervalBST(start, i);
  }
}

const findRightInterval = solution_1;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = findRightInterval;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  intervals: [ [1, 2] ],
};
expected = [ -1 ];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  intervals: [ [3, 4], [2, 3], [1, 2] ],
};
expected = [ -1, 0, 1 ];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  intervals: [ [1, 4], [2, 3], [3, 4] ],
};
expected = [ -1, 2, -1 ];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: