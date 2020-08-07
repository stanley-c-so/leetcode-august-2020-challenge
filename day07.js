// --- Day 7: Vertical Order Traversal of a Binary Tree ---

// Given a binary tree, return the vertical order traversal of its nodes values.

// For each node at position (X, Y), its left and right children respectively will be at positions (X-1, Y-1) and (X+1, Y-1).

// Running a vertical line from X = -infinity to X = +infinity, whenever the vertical line touches some nodes, we report the values of the nodes in order from top to bottom (decreasing Y coordinates).

// If two nodes have the same position, then the value of the node that is reported first is the value that is smaller.

// Return an list of non-empty reports in order of X coordinate.  Every report will have a list of values of nodes.

// Example 1:

//            3
//           / \
//          9   20
//             /  \
//            15   7

// Input: [3,9,20,null,null,15,7]
// Output: [[9],[3,15],[20],[7]]

// Explanation: 
// Without loss of generality, we can assume the root node is at position (0, 0):
// Then, the node with value 9 occurs at position (-1, -1);
// The nodes with values 3 and 15 occur at positions (0, 0) and (0, -2);
// The node with value 20 occurs at position (1, -1);
// The node with value 7 occurs at position (2, -2).

// Example 2:

//              1
//            /    \
//           2      3
//          /  \   /  \
//         4    5 6    7

// Input: [1,2,3,4,5,6,7]
// Output: [[4],[2],[1,5,6],[3],[7]]
// Explanation: 
// The node with value 5 and the node with value 6 have the same position according to the given scheme.
// However, in the report "[1,5,6]", the node value of 5 comes first since 5 is smaller than 6.

// Note:

// The tree will have between 1 and 1000 nodes.
// Each node's value will be between 0 and 1000.

// ----------

// using DFS, we generate a `data` object with the following format (although the problem has y values decreasing as you go down the tree, here we treat them as increasing, but it won't make a difference):
// {
//  -1: [[...], [...]],
//   0: [[root.val, ...], [...], [...]],     // since root is at (0, 0), it corresponds to key 0 (for x) in the `data` object, and inside there, its val lives inside another array at index 0 (for y)
//   1: [[...], [...]],
// }
// as shown above, the keys of the `data` object represent x. the index positions of the corresponding arrays represent y. since multiple nodes can occupy the same (x, y), we have further subarrays
// where node values are simply added in the same DFS order in which we find them - we will sort them when converting this data into output.
// once the `data` object has been created, we sort its keys (because in reality the negative keys will NOT be sorted correctly automatically within the object) and then we iterate through those sorted keys.
// for each one, navigate through the corresponding array (which will typically have many empty elements, so we make sure to skip the empty ones) and we sort the contents of the subarray before dumping
// all values into an array called `xGroup` (there will be one `xGroup` for each value of x in the number line where any node exists at any y). all `xGroup`s are collected into one `output` array and returned.

function solution_1 (root) {
  const output = [];

  // STEP 1: DFS to build up `data` object
  const data = {};
  const stack = [[root, 0, 0]];
  while (stack.length) {
    const [node, x, y] = stack.pop();
    if (!data[x]) data[x] = [];
    if (!data[x][y]) data[x][y] = [];
    data[x][y].push(node.val);
    if (node.left) stack.push([node.left, x - 1, y + 1]);
    if (node.right) stack.push([node.right, x + 1, y + 1]);
  }

  // STEP 2: construct `output` based on `data` object
  const sortedX = Object.keys(data).sort((a, b) => a - b);        // since negative x values are not automatically sorted within the `data` object, we must sort the keys of `data`
  for (const x of sortedX) {
    const xGroup = [];
    for (const coord of data[x]) {
      if (coord) xGroup.push(...coord.sort((a, b) => a - b));     // the `if (coord) ...` is necessary to skip over empty elements (for values of y where no nodes live)
    }
    output.push(xGroup);
  }
  return output;
}

const verticalTraversal = solution_1;

// const specialTest = (...args) => {
// };

// NOTE: I developed the following BinaryTree and Batch classes for easy creation of binary trees with arbitrary values.

class BinaryTree {
  constructor (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  insert (left, right, firstInsert = false) {
    if (left !== null) this.left = new BinaryTree(left);
    if (right !== null) this.right = new BinaryTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }
}

class Batch {
  constructor (root, nodes) {
    this.root = root;
    this.batch = nodes;
  }
  insert (lastInsert, ...values) {
    const nextBatch = [];
    for (let i = 0; i < this.batch.length; i++) {
      if (this.batch[i] !== null) {
        nextBatch.push(...(this.batch[i].insert(
          values[2 * i] === undefined ? null : values[2 * i],
          values[2 * i + 1] === undefined ? null : values[2 * i + 1],
        )));
      } else {
        nextBatch.push(null, null);
      }
    }
    return lastInsert ? this.root : new Batch (this.root, nextBatch);
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = verticalTraversal;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(3)
    .insert(9, 20, true)
    .insert(true, null, null, 15, 7),
};
expected = [[9], [3, 15], [20], [7]];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree(1)
  .insert(2, 3, true)
  .insert(true, 4, 5, 6, 7),
};
expected = [[4], [2], [1, 5, 6], [3], [7]];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: