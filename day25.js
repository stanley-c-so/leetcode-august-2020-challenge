// --- Day 25: Minimum Cost For Tickets ---

// In a country popular for train travel, you have planned some train travelling one year in advance.  The days of the year that you will travel is given as an array days.  Each day is an integer from 1 to 365.

// Train tickets are sold in 3 different ways:

// a 1-day pass is sold for costs[0] dollars;
// a 7-day pass is sold for costs[1] dollars;
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.  For example, if we get a 7-day pass on day 2, then we can travel for 7 days: day 2, 3, 4, 5, 6, 7, and 8.

// Return the minimum number of dollars you need to travel every day in the given list of days.

// Example 1:

// Input: days = [1,4,6,7,8,20], costs = [2,7,15]
// Output: 11
// Explanation: 
// For example, here is one way to buy passes that lets you travel your travel plan:
// On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
// On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
// On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
// In total you spent $11 and covered all the days of your travel.

// Example 2:

// Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
// Output: 17
// Explanation: 
// For example, here is one way to buy passes that lets you travel your travel plan:
// On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
// On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
// In total you spent $17 and covered all the days of your travel.
 

// Note:

// 1 <= days.length <= 365
// 1 <= days[i] <= 365
// days is in strictly increasing order.
// costs.length == 3
// 1 <= costs[i] <= 1000

// ----------

// we use dynamic programming here: `output` will be an array where each index position represents one of the calendar days (including initial "day 0") up to the highest day in `days` input (no need to
// go any higher). e.g. if the highest travel day is 20, then `output` is a 21-length array. the value stored at each position of `output` represents the minimum cost we have identified for all the travel
// we need to do from day 0 up to and including that day (`output[0]` is initialized to 0). if on that day we are not traveling (i.e. that `i` is not in `days`) then the cost for that day is equal to the
// cost of the previous day, i.e. there has been no change. however, if we are traveling on that day, there are only 3 ways to ensure coverage: (1) we bought a 1-day pass today, (2) we bought a 7-day pass
// 6 days ago, covering all 7 days between then and today, or (3) we bought a 30-day pass 29 days ago, covering all 30 days between then and today. this means we only need to look at the minimum costs
// already stored in `output` for day (1) `i - 1`, (2) `i - 7`, or (3) `i - 30`, and add the additional cost of the ticket purchased thereafter - (1) costs[0], (2) costs[1], or (3) costs[2]. after
// considering all 3 cases, we can choose the smallest option, and store that into `output[i]`.
// NOTE: of course, it is entirely possible that the best ticketing scheme to cover all our travel up to day `i` may differ from the best ticketing scheme to cover all our travel up to day `i - 1`. this
// doesn't matter. each position inside the `output` array only considers the best way to achieve coverage up to and including day `i` with no thought to anything that might come afterward. yet, the best
// way to cover up to day `i` is nevertheless a function of the best ways to cover up to days `i - 1`, `i - 7`, and `i - 30`. thus, we can be confident that our final answer, `output[output.length - 1]`,
// is correct.
function solution_1 (days, costs) {

  // INITIALIZATION - save each travel day from `days` into a set or hash table for O(1) access
  const travelDays = new Set();
  days.forEach(day => travelDays.add(day));

  // ITERATE THROUGH `output` ARRAY (starting at `i` === 1) AND PERFORM DYNAMIC PROGRAMMING
  const output = Array(days[days.length - 1] + 1);                                                // make the array 1 position longer than the highest day in `days`
  output[0] = 0;                                                                                  // initialize `output[0]` with a cost of 0
  for (let i = 1; i < output.length; ++i) {                                                       // start iteration from `i` === 1
    if (travelDays.has(i)) {                                                                      // if today is a travel day...
      output[i] = Math.min(                                                                         // ...find the minimum of the 3 possible ways to cover travel for today:
        output[i - 1] + costs[0],                                                                   // (1) `output[i - 1]` will never be out of bounds because we start the for loop at `i` === 1
        output[Math.max(0, i - 7)] + costs[1],                                                      // (2) if `i` < 7 we cannot look back 7 days, so in that case we will use `i` === 0 instead
        output[Math.max(0, i - 30)] + costs[2]                                                      // (3) if `i` < 30 we cannot look back 30 days, so in that case we will use `i` === 0 instead
      );
    } else {
      output[i] = output[i - 1];                                                                  // else, if we do not travel today, then the cost to cover up to today is the same as that of yesterday
    }
  }

  return output[output.length - 1];
}

const mincostTickets = solution_1;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = mincostTickets;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  days: [1, 4, 6, 7, 8, 20],
  costs: [2, 7, 15],
};
expected = 11;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31],
  costs: [2, 7, 15],
};
expected = 17;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: