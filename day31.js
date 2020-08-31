// --- Day 31: Delete Node in a BST ---

// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.
// Note: Time complexity should be O(height of tree).

// Example:

// root = [5,3,6,2,4,null,7]
// key = 3

//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// Given key to delete is 3. So we find the node with value 3 and delete it.

// One valid answer is [5,4,6,2,null,null,7], shown in the following BST.

//     5
//    / \
//   4   6
//  /     \
// 2       7

// Another valid answer is [5,2,6,null,4,null,7].

//     5
//    / \
//   2   6
//    \   \
//     4   7

// ----------

function solution_1 (root, key) {
  if (!root) return null;                                             // EDGE CASE: empty input
  
  // `find` UTILITY FUNCTION - recursively searches input tree for a node with value matching `key`.
  // if such a node exists, returns an array containing (1) the node, and (2) its parent node, or null if the matching node is the root.
  // if such a node does not exist, returns [null, null]
  function find (node, parent = null) {
    if (key < node.val) {
      return node.left ? find(node.left, node) : [null, null];
    } else if (key > node.val) {
      return node.right ? find(node.right, node) : [null, null];
    } else {
      return [node, parent];
    }   
  }

  // INITIALIZATION
  const [node, parent] = find(root);                                  // set `node` (the node to be removed) and `parent` (a reference to its parent)
  if (!node) return root;                                             // if `node` is null, then there is no work to be done. we simply return `root`

  // REMOVE THE NODE BY RECONFIGURING ALL NECESSARY NODE CONNECTIONS
  if (!node.left && !node.right) {                                    // CASE 1: the `node` to be removed has no children
    if (parent) {                                                       // if `parent` is not null...
      parent[parent.val < node.val ? 'right' : 'left'] = null;          // ...disconnect `parent` in the direction of `node`
      return root;                                                      // ...return original root
    }
    return null;                                                        // `parent` may be null if the `node` to be removed was the `root`. since `node` has no children, return empty tree (null)
  } else if (!node.left) {                                            // CASE 2: the `node` to be removed only has a right child
    if (parent) {                                                       // if `parent` is not null...
      parent[parent.val < node.val ? 'right' : 'left'] = node.right;    // ...connect `parent` in the direction of `node` to `node.right`
      return root;                                                      // ...return original root
    }
    return node.right;                                                  // `parent` may be null if the `node` to be removed was the `root`. since `node` has no left child, return `node.right`
  } else if (!node.right) {                                           // CASE 3: reverse the logic of case 2
    if (parent) {
      parent[parent.val < node.val ? 'right' : 'left'] = node.left;
      return root;
    }
    return node.left;
  } else {                                                            // CASE 4: the `node` to be removed has both children

    // find the `replacement` node and its parent (we could either go right, and then keep going as left as possible, or go left, and keep going as right as possible. here i choose the former)
    let replacement = node.right;
    let replacementParent = node;
    while (replacement.left) {
      replacementParent = replacement;
      replacement = replacement.left;
    }
    
    // we decided to go right and then left to find replacement. now we have to hook up `replacement.left` to the original `node.left`...
    replacement.left = node.left;
    
    // ...and then hook up `replacement.right` to the original `node.right` (UNLESS `node.right` IS the `replacement`, in which case we can skip this step)
    if (node.right !== replacement) {
      replacementParent[
        replacementParent.val < replacement.val ? 'right' : 'left'
      ] = replacement.right;                                          // hook up `replacementParent` in the direction of `replacement` to `replacement.right`
      replacement.right = node.right                                  // hook up `replacement.right` to original `node.right`
    } 
      
    // finally, hook up `parent` to `replacement` and return
    if (parent) {       
      parent[parent.val < node.val ? 'right' : 'left'] = replacement;
      return root;                                                    // if `parent`, then we simply return the original `root`
    } else {
      return replacement;                                             // else, it must be the case that the node we removed was the original `root`, so return `replacement`
    }
  }
}

const deleteNode = solution_1;

const specialTest = (root, key, answer1, answer2) => {
  const equals = require('./_equality-checker');
  return equals(deleteNode(root, key), answer1) || equals(deleteNode(root, key), answer2);    // since i believe there are 2 possible answers for every problem (could there possibly be more?)
};

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
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(5)
    .insert(3, 6, true)
    .insert(true, 2, 4, null, 7),
  key: 3,
  answer1: new BinaryTree(5)
  .insert(4, 6, true)
  .insert(true, 2, null, null, 7),
  answer2: new BinaryTree(5)
  .insert(2, 6, true)
  .insert(true, null, 4, null, 7),
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: