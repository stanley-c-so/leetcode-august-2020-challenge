// --- Day 19: Goat Latin ---

// A sentence S is given, composed of words separated by spaces. Each word consists of lowercase and uppercase letters only.

// We would like to convert the sentence to "Goat Latin" (a made-up language similar to Pig Latin.)

// The rules of Goat Latin are as follows:

// If a word begins with a vowel (a, e, i, o, or u), append "ma" to the end of the word.
// For example, the word 'apple' becomes 'applema'.
 
// If a word begins with a consonant (i.e. not a vowel), remove the first letter and append it to the end, then add "ma".
// For example, the word "goat" becomes "oatgma".
 
// Add one letter 'a' to the end of each word per its word index in the sentence, starting with 1.
// For example, the first word gets "a" added to the end, the second word gets "aa" added to the end and so on.
// Return the final sentence representing the conversion from S to Goat Latin. 

// Example 1:

// Input: "I speak Goat Latin"
// Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"

// Example 2:

// Input: "The quick brown fox jumped over the lazy dog"
// Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"

// Notes:

// S contains only uppercase, lowercase and spaces. Exactly one space between each word.
// 1 <= S.length <= 150.

// ----------

// split `S` into component words. for each word, rotate the first letter if it is a consonant, else leave it alone. then in all cases, add 'ma', and then add the appropriate number of 'a's. join it all up.
function solution_1 (S) {
  return S.split(' ')
    .map((word, i) => {
      return ('aeiouAEIOU'.includes(word[0])
        ? word
        : word.slice(1) + word[0])
        + 'ma'
        + 'a'.repeat(i + 1);
    })
    .join(' ');
}

// one-liner - basically the above
solution_2=S=>S.split` `.map((w,i)=>('aeiouAEIOU'.includes(w[0])?w:w.slice(1)+w[0])+'ma'+'a'.repeat(i+1)).join` `

// thomas luo's one-liner - only things noteworthy are the `z=w[0]` trick to avoid referring to `w[0]` again, and `'m'+'a'.repeat(i+2)` to save another character
solution_3=S=>S.split(' ').map((w,i)=>('aeiouAEIOU'.includes(z=w[0])?w:w.slice(1)+z)+'m'+'a'.repeat(i+2)).join(' ')

// combination of our one-liners
solution_4=S=>S.split` `.map((w,i)=>('aeiouAEIOU'.includes(x=w[0])?w:w.slice(1)+x)+'m'+'a'.repeat(i+2)).join` `

const toGoatLatin = solution_4;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = toGoatLatin;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  S: 'I speak Goat Latin',
};
expected = 'Imaa peaksmaaa oatGmaaaa atinLmaaaaa';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  S: 'The quick brown fox jumped over the lazy dog',
};
expected = 'heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa';
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: