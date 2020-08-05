// --- Day 2: Design HashSet ---

// Design a HashSet without using any built-in hash table libraries.

// To be specific, your design should include these functions:

// add(value): Insert a value into the HashSet. 
// contains(value) : Return whether the value exists in the HashSet or not.
// remove(value): Remove a value in the HashSet. If the value does not exist in the HashSet, do nothing.

// Example:

// MyHashSet hashSet = new MyHashSet();
// hashSet.add(1);         
// hashSet.add(2);         
// hashSet.contains(1);    // returns true
// hashSet.contains(3);    // returns false (not found)
// hashSet.add(2);          
// hashSet.contains(2);    // returns true
// hashSet.remove(2);          
// hashSet.contains(2);    // returns false (already removed)

// Note:

// All values will be in the range of [0, 1000000].
// The number of operations will be in the range of [1, 10000].
// Please do not use the built-in HashSet library.

// ----------

// NOTE: in leetcode, the solution is not written with class syntax. it is written with a constructor function, and all methods are added to the prototype.

// this is the fastest JS solution in leetcode. however, i would say that it violates the rule of not using "the built-in HashSet library"
class solution_1 {
  constructor () {
    this.set = new Set();
  }
  add (key) {
    this.set.add(key);
  }
  remove (key) {
    this.set.delete(key);
  }
  contains (key) {
    return this.set.has(key);
  }
}

// this solution is still silly but technically complies with the rule. it uses a lot of space, but has O(1) time complexity. still, its time performance is bad in leetcode,
// likely because of the time taken by the constructor.
class solution_2 {
  constructor () {
    this.cache = Array(1000001).fill(false);
  }
  add (key) {
    this.cache[key] = true;
  }
  remove (key) {
    this.cache[key] = false;
  }
  contains (key) {
    return this.cache[key];
  }
}

// i believe using a hashmap as a set complies with the rules too.
class solution_3 {
  constructor () {
    this.hash = {};
  }
  add (key) {
    this.hash[key] = true;
  }
  remove (key) {
    delete this.hash[key];
  }
  contains (key) {
    return key in this.hash;
  }
}

// one-liner - basically the above. the double bang works well here to derive true/false from single digit number vs. undefined
class solution_4{constructor(){this.c={}}add(k){this.c[k]=8}remove(k){delete this.c[k]}contains(k){return !!this.c[k]}}

const MyHashSet = solution_4;

const specialTest = (commands, inputs) => {
  const myHashSet = new MyHashSet();
  const ref = {                                       // this object holds references to the MyHashSet methods...
    add: myHashSet.add,
    remove: myHashSet.remove,
    contains: myHashSet.contains,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(myHashSet)(...inputs[i])  // ...but each method still needs to be given `MyHashSet` as its `this` context
    );
  }
  return output;
};

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
  commands: [ 'add', 'add', 'contains', 'contains', 'add', 'contains', 'remove', 'contains' ],
  inputs: [ [1], [2], [1], [3], [2], [2], [2], [2] ],
};
expected = [ undefined, undefined, true, false, undefined, true, undefined, false ];  // in leetcode, the output shows up as `null` instead of `undefined` for methods that have no return
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: