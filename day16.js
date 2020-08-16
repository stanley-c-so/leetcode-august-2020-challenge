// --- Day 16: Best Time to Buy and Sell Stock III ---

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete at most two transactions.

// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

// Example 1:

// Input: [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
//              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

// Example 2:

// Input: [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.

// Example 3:

// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

// ----------

// i found this solution on youtube - credit to ayarti tiwari (https://youtu.be/gVavspgEHyM). by simply iterating through all of the prices and "chaining" the buy1 -> sell1 -> buy2 -> sell2 operations,
// although we do not explicitly enforce the constraint that you can only do one thing on any given day, it seems like that constraint becomes self-enforcing inherently by the algorithm. suppose, for
// example, `prices` has no length. then the entire for loop gets skipped, and `sell2` was already initialized at 0. suppose we are in example 2, where we only make one transaction. then even though we
// "simulate" an illegal buy2 --> sell2 each day, the `sell2` value always matches that of `sell1` and thus ultimately we still return the correct answer. or suppose we are in example 3, where we make
// no transactions. then `sell2` never exceeds 0. the takeaway, then, is that while we will not necessarily know whether we really made zero, one, or two transactions, based on this logic, `sell2` will
// always have its correct value, even though the logic appears to relax the restriction that we can only do one thing on any given day.
function solution_1 (prices) {
  let buy1 = buy2 = -Infinity;                // these store your best net gain after executing the first buy and the second buy, respectively
  let sell1 = sell2 = 0;                      // these store your best net gain after executing the first sell and the second sell, respectively
  for (const price of prices) {
    buy1 = Math.max(buy1, -price);            // find the best result after executing the first buy, including buying today as a possibility (which would be 0 - `price`)
    sell1 = Math.max(sell1, buy1 + price);    // find the best result after executing the first sell... (note that even if you "cheat" and also bought today, net is 0, which is no better than initial value)
    buy2 = Math.max(buy2, sell1 - price);     // find the best result after executing the second buy... (again, even if you're "cheating" by ignoring constraint of one action/day, `buy2` equals `buy1`)
    sell2 = Math.max(sell2, buy2 + price);    // find the best result after executing the second sell... (again, even if you only do one sell (e.g. input [1, 2]), this value will just match `sell1`)
  }
  return sell2;
}

// one-liner - basically the above
solution_2=(P,a=c=-Infinity,b=d=0,m=Math.max)=>P.map(p=>(a=m(a,-p),b=m(b,a+p),c=m(c,b-p),d=m(d,c+p)))&&d

const maxProfit = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = maxProfit;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  prices: [3,3,5,0,0,3,1,4],
};
expected = 6;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  prices: [1,2,3,4,5],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  prices: [7,6,4,3,1],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: