// --- Day 9: Rotting Oranges ---

// In a given grid, each cell can have one of three values:

// the value 0 representing an empty cell;
// the value 1 representing a fresh orange;
// the value 2 representing a rotten orange.
// Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.

// Example 1:

//  X   O   O         X   X   O         X   X   X         X   X   X         X   X   X
//  O   O   _   -->   X   O   _   -->   X   X   _   -->   X   X   _   -->   X   X   _
//  _   O   O         _   O   O         _   O   O         _   X   O         _   X   X

// Input: [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4

// Example 2:

// Input: [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation:  The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

// Example 3:

// Input: [[0,2]]
// Output: 0
// Explanation:  Since there are already no fresh oranges at minute 0, the answer is just 0.
 
// Note:

// 1 <= grid.length <= 10
// 1 <= grid[0].length <= 10
// grid[i][j] is only 0, 1, or 2.

// ----------

// we start by iterating through the grid, counting up the number of fresh oranges, and collecting the coordinates of all rotten oranges into an array (`rotten`). then we run the simulation, which is a while
// loop that runs as long as there are any fresh oranges remaining (if there were none to begin with, then the loop is skipped entirely, and the number of mins elapsed (`mins`), which was initialized at 0,
// gets returned). inside the while loop, we reset `newRotten` (which is the collection of all oranges newly rotted in this tick). we do not need to iterate through the entire grid - instead, we only need to
// iterate through all oranges that were rotted in the previous tick (`rotten`) and for each one check the 4 neighbors. any oranges newly rotted in this way get their coordinates pushed into `newRotten` (and,
// additionally, we change their status within `grid` and decrement `numFresh`). after iterating through `rotten`, we check whether `newRotten` is empty - if it is, then nothing was newly rotted, and we can
// immediately return -1, because we must still have at least 1 fresh orange (or else the while loop would not have run), but there has been no change in this tick, and therefore we will never rot all the
// oranges. otherwise, if we did newly rot at least one orange, then we increment `mins`, clear `rotten` and grab the contents of `newRotten`, and continue.
function solution_1 (grid) {

  // INITIALIZATIONS (FIND ROTTEN ORANGES AND COUNT FRESH ORANGES)
  const h = grid.length;
  // if (!h) return 0;                                      // UNNECESSARY EDGE CASE HANDLING: no 0-height input
  const w = grid[0].length;
  let numFresh = 0;
  const rotten = [];                                        // array of arrays holding coords of recently discovered rotten oranges
  for (let row = 0; row < h; ++row) {
    for (let col = 0; col < w; ++col) {
      if (grid[row][col] === 2) rotten.push([row, col]);    // discover rotten oranges
      if (grid[row][col] === 1) ++numFresh;                 // count fresh oranges
    }
  }

  // SIMULATION
  let mins = 0;                                             // mark number of mins elapsed
  const newRotten = [];                                     // hold coords of newly discovered oranges
  while (numFresh) {
    newRotten.length = 0;                                   // clear `newRotten`
    for (const [row, col] of rotten) {                      // iterate based on `rotten`
      if (row > 0 && grid[row - 1][col] === 1) {            // check up
        grid[row - 1][col] = 2;                                 // rot the orange
        newRotten.push([row - 1, col]);                         // add the coords to `newRotten`
        --numFresh;                                             // decrement `numFresh`
      }
      if (row < h - 1 && grid[row + 1][col] === 1) {        // check down
        grid[row + 1][col] = 2;
        newRotten.push([row + 1, col]);
        --numFresh;
      }
      if (col > 0 && grid[row][col - 1] === 1) {            // check left
        grid[row][col - 1] = 2;
        newRotten.push([row, col - 1]);
        --numFresh;
      }
      if (col < w - 1 && grid[row][col + 1] === 1) {        // check right
        grid[row][col + 1] = 2;
        newRotten.push([row, col + 1]);
        --numFresh;
      }
    }
    if (!newRotten.length) return -1;                       // if no change, return -1 (note that at the top of the while loop we ensured that there are in fact still some fresh oranges)
    ++mins;                                                 // increment time
    rotten.length = 0;                                      // clear `rotten`
    rotten.push(...newRotten);                              // `rotten` takes all values from `newRotten`
  }

  return mins;
}

// one-liner - basically the above
solution_2=(g,L='length',h=g[L],w=g[0][L],F=m=0,R=[])=>{for(r=0;r<h;++r){for(c=0;c<w;++c){g[r][c]-2?0:R.push([r,c]);g[r][c]-1?0:++F}}while(F){N=[];for([r,c]of R){if(r>0&&g[r-1][c]==1){g[r-1][c]=2;N.push([r-1,c]);--F}if(r<h-1&&g[r+1][c]==1){g[r+1][c]=2;N.push([r+1,c]);--F}if(c>0&&g[r][c-1]==1){g[r][c-1]=2;N.push([r,c-1]);--F}if(c<w-1&&g[r][c+1]==1){g[r][c+1]=2;N.push([r,c+1]);--F}}if(!N[L])return-1;++m;R=N}return m}

const orangesRotting = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = orangesRotting;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  grid: [
    [2,1,1],
    [1,1,0],
    [0,1,1],
  ],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  grid: [
    [2,1,1],
    [0,1,1],
    [1,0,1],
  ],
};
expected = -1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  grid: [
    [0,2],
  ],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: