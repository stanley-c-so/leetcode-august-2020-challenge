// --- Day 9: Path Sum III ---

// You are given a binary tree in which each node contains an integer value.

// Find the number of paths that sum to a given value.

// The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

// The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

// Example:

// root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

//       10
//      /  \
//     5   -3
//    / \    \
//   3   2   11
//  / \   \
// 3  -2   1

// Return 3. The paths that sum to 8 are:

// 1.  5 -> 3
// 2.  5 -> 2 -> 1
// 3. -3 -> 11

// ----------

// we use DFS to traverse the tree. for each node, we keep track of a `data` object with keys representing all possible totals for paths terminating at that node's parent, and correpsonding values for
// the number of such paths that add up those totals. based on any node's parent's `data` object, we can construct the corresponding `newData` object for the current node: iterate through all old totals,
// and map them to the old total plus the current node's value. additionally, add in the new single-node path starting and ending at the current node. having constructed the `newData` object, increment
// `paths` (a "tracking" variable initialized at 0) by the number of paths terminating at the current node that add up to the target `sum`. at the conclusion of the DFS, return `paths`.
function solution_1 (root, sum) {
  if (!root) return 0;                                  // EDGE CASE: null root --> 0
  let paths = 0;

  function DFS (node, data = {}) {                      // `data` has keys representing all possible totals for paths ending at current node's parent, and values representing number of paths to those totals
    const newData = {};                                 // `newData` is the same idea, but ending at current node (we construct this based on the parent's object)
    for (const total of Object.keys(data)) {            // iterate through all totals for paths ending at parent node...
      const newTotal = Number(total) + node.val;          // ...increment by current node value to get totals for paths terminating at current node
      if (!newData[newTotal]) newData[newTotal] = 0;
      newData[newTotal] += data[total];
    }
    newData[node.val] = newData[node.val] + 1 || 1;     // also count a new single-node path that starts and ends at the current node
    paths += newData[sum] || 0;                         // increment `paths` by the number of paths to get to target `sum`, if any
    if (node.left) DFS(node.left, {...newData});        // recurse left, if applicable (create a clone of `newData` object)
    if (node.right) DFS(node.right, {...newData});      // recurse right, if applicable (create a clone of `newData` object)
  }

  DFS(root);                                            // kick-start DFS
  return paths;
}

// one-liner - basically the above
solution_2=(r,s,p=0,D=(n,d={},N={})=>{for(t of Object.keys(d)){x=+t+n.val;if(!N[x])N[x]=0;N[x]+=d[t]}N[n.val]=N[n.val]+1||1;p+=N[s]||0;if(n.left)D(n.left,{...N});if(n.right)D(n.right,{...N})})=>r?D(r)|p:0

const pathSum = solution_2;

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
const func = pathSum;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(10)
    .insert(5, -3, true)
    .insert(false, 3, 2, null, 11)
    .insert(true, 3, -2, null, 1, null, null),
  sum: 8,
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: