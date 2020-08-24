// --- Day 24: Sum of Left Leaves ---

// Find the sum of all left leaves in a given binary tree.

// Example:

//     3
//    / \
//   9  20
//     /  \
//    15   7

// There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.

// ----------

// i write a recursive helper function with a parameter that has a boolean indicating whether or not it is a left node. when i recurse, if i am recursing on a left
// child, i give that parameter a true argument. else, false. when i kick-start the recursion with the root, i set it to false (the root of the tree can never be
// a left leaf, even if it is the only node in the tree).
function solution_1 (root) {
  if (!root) return 0;
  let sum = 0;
  function recurse(node, left) {
    if (left && !node.left && !node.right) sum += node.val;
    if (node.left) recurse(node.left, true);
    if (node.right) recurse(node.right, false);
  }
  recurse(root, false);
  return sum;
}

// one-liner - basically the above
solution_2=(r,s=0,R=(n,l)=>l&&!n.left&&!n.right?s+=n.val:(n.left?R(n.left,1):0,n.right?R(n.right,0):0))=>r?R(r,0)||s:0

// thomas luo's one-liner - instead of using a recursive helper function, the main function itself is the recursive function
z=solution_3=(r,l=0)=>r?!l||r.left||r.right?z(r.left,1)+z(r.right):r.val:0

const sumOfLeftLeaves = solution_3;

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
const func = sumOfLeftLeaves;
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
expected = 24;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: