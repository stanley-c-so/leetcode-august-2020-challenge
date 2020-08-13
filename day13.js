// --- Day 13: Iterator for Combination ---

// Design an Iterator class, which has:

// A constructor that takes a string characters of sorted distinct lowercase English letters and a number combinationLength as arguments.
// A function next() that returns the next combination of length combinationLength in lexicographical order.
// A function hasNext() that returns True if and only if there exists a next combination.
 

// Example:

// CombinationIterator iterator = new CombinationIterator("abc", 2); // creates the iterator.

// iterator.next(); // returns "ab"
// iterator.hasNext(); // returns true
// iterator.next(); // returns "ac"
// iterator.hasNext(); // returns true
// iterator.next(); // returns "bc"
// iterator.hasNext(); // returns false
 

// Constraints:

// 1 <= combinationLength <= characters.length <= 15
// There will be at most 10^4 function calls per test.
// It's guaranteed that all calls of the function next are valid.

// ----------

// NOTE: in leetcode, the solution is not written with class syntax. it is written with a constructor function, and all methods are added to the prototype.

// i use an array (`this.arr`) of the same length as `combinationLength`, which gets initialized where each element matches its index (i.e. 0, 1, 2, ...). this represents the indices of the original
// string that are currently being pointed to. so for example, if the original string is 'abcdefg', the `combinationLength` is 3, and `this.arr` is [0, 2, 6], then we are currently pointing at "acg".
// in this way, whenever the `next` method is called, we only need to figure out the next arrangement of `this.arr` and then we form the string that gets returned. the way we do that is by starting at
// the final index of `this.arr` and seeing whether its number can be incremented (without going out of bounds). if not, we go to the previous `i`, until we find one that can (without bumping into the
// number of any subsequent `i`). once a possible increment is found, we do it, and then fix the numbers for all subsequent `i`s to be the positions immediately following the number we incremented to.
// so, for example, if `this.arr` is [0, 2, 6], then we cannot increment the 6, so next we examine the 2, and we find that we can increment it to 3, and thus the 6 then becomes a 4 and we get [0, 3, 4].
// then, we build up the `output` based on the index positions of `this.arr`.
// the only complication to the above is that the very first call to `next` should yield an initial slice of the input string, without going through the aforementioned process of finding the next
// combination of `this.arr` based on its current state. to solve that we simply use a boolean `this.started` initialized to false. if false when `next` is called, we set it to true, and return a slice.
// under this scheme, the `hasNext` method then becomes very easy. if `this.arr[0]` is already at its final position (which is `characters.length - combinationLength`), then we immediately know we are
// on the final iteration, and thus there could not be a next.
class solution_1 {
  constructor (characters, combinationLength) {
    this.chars = characters;
    this.k = combinationLength;
    this.arr = Array(combinationLength).fill(0).map((_, i) => i);
    this.started = false;
  }
  next () {
    if (!this.started) {
      this.started = true;
      return this.chars.slice(0, this.k);                                   // the very first output, e.g. 'abc'
    }
    if (!this.hasNext()) throw "There should be no invalid call to .next";  // there is no next, we have already reached final iteration. (the problem says this won't happen.)
    let i = this.arr.length - 1;
    while (true) {
      if (i === this.arr.length - 1                                         // is `i` at the final index of `this.arr` ?
        ? this.arr[i] < this.chars.length - 1                               // if so, check whether its current number less than the final index of `this.chars`
        : this.arr[i] < this.arr[i+1] - 1                                   // if not, check whether there is any space between its current number and the next
      ) {
        ++this.arr[i];                                                      // if the above is true, then the current number at `i` can be incremented, so we do so
        while (i < this.arr.length - 1) {                                   // then we reset the numbers for all subsequent index positions
          ++i;                                                              // (go to the next index)
          this.arr[i] = this.arr[i-1] + 1;                                  // (set it to the number immediately after that of the previous index)
        }
        break;                                                              // (break out of this loop)
      }
      --i;                                                                  // if the above condition was not true, move down to the next lowest `i`
                                                                            // NOTE: we will never go out of bounds with `i`, since earlier we called `this.hasNext()` and made sure there is a next
    }
    let output = '';
    this.arr.forEach(n => output += this.chars[n]);                         // build up the `output` based on the index positions of `this.arr`
    return output;
  }
  hasNext () {
    return this.arr[0] !== this.chars.length - this.k;
  }
}

const CombinationIterator = solution_1;

const specialTest = (characters, combinationLength, commands, inputs) => {
  const combinationIterator = new CombinationIterator(characters, combinationLength);
  const ref = {                                                   // this object holds references to the CombinationIterator methods...
    next: combinationIterator.next,
    hasNext: combinationIterator.hasNext,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(combinationIterator)(...inputs[i])    // ...but each method still needs to be given `CombinationIterator` as its `this` context
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
  characters: 'abc',
  combinationLength: 2,
  commands: [ 'next', 'hasNext', 'next', 'hasNext', 'next', 'hasNext' ],
  inputs: [ [], [], [], [], [], [] ],
};
expected = [ 'ab', true, 'ac', true, 'bc', false ];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: