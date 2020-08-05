// --- Day 5: Add and Search Word - Data structure design ---

// Design a data structure that supports the following two operations:

// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

// Example:

// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true

// Note:
// You may assume that all words are consist of lowercase letters a-z.

// ----------

// NOTE: in leetcode, the solution is not written with class syntax. it is written with a constructor function, and all methods are added to the prototype.

// i use an array, `this.store`, such that `this.store[i]` will point to a set with all added words of length `i`. thus the constructor and the `addWord` methods are straightforward.
// as for `search`, i spread the set into an array, and see if any of the elements match the search query. i use a callback that iterates through the search query, and for non-'.' characters,
// i check for a character match.
class solution_1 {
  constructor () {
    this.store = [];
  }
  addWord (word) {
    const length = word.length;
    if (!(this.store[length])) this.store[length] = new Set();
    this.store[length].add(word);
  }
  search (word) {
    const length = word.length;
    return !!this.store[length] && [...this.store[length]]          // first, check that a set exists at `this.store[length]`. then, convert the set into an array...
      .some(w => {                                                  // ...and see if at least one element matches the search query:
        for (let i = 0; i < length; ++i) {                            // iterate through the search query...
          if (word[i] !== '.' && w[i] !== word[i]) return false;      // ...and for non-'.' characters, check for a character match at the corresponding `i`
        }
        return true;
      });
  }
}

// one-liner - basically the above
class solution_2{constructor(){this.s=[]}addWord(w,l=w.length,s=this.s){if(!s[l])s[l]=new Set();s[l].add(w)}search(w,l=w.length,s=this.s){return !!s[l]&&[...s[l]].some(c=>{for(let i=0;i<l;++i)if(w[i]!='.'&&w[i]!=c[i])return!8;return!0})}}

const WordDictionary = solution_2;

const specialTest = (commands, inputs) => {
  const wordDictionary = new WordDictionary();
  const ref = {                                             // this object holds references to the WordDictionary methods...
    addWord: wordDictionary.addWord,
    search: wordDictionary.search,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(wordDictionary)(...inputs[i])   // ...but each method still needs to be given `WordDictionary` as its `this` context
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
  commands: [ 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search' ],
  inputs: [ ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..'] ],
};
expected = [ undefined, undefined, undefined, false, true, true, true ];  // in leetcode, the output shows up as `null` instead of `undefined` for methods that have no return
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: