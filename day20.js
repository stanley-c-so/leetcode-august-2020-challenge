// --- Day 20: Reorder List ---

// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You may not modify the values in the list's nodes, only nodes itself may be changed.

// Example 1:

// Given 1->2->3->4, reorder it to 1->4->2->3.

// Example 2:

// Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

// ----------

// this is my uninspired solution where i push the nodes in order into an array, and then use pointers to run through the array, reconfiguring each node's .next pointer as needed
function solution_1 (head) {

  // EDGE CASE: empty list
  if (!head) return null;

  // INITIALIZE ARRAY TO HOLD NODES
  const arr = [];
  let node = head;
  while (node) {
    arr.push(node);
    node = node.next;
  }

  // RECONFIGURE .next POINTERS
  let left = 0;
  let right = arr.length - 1;
  while (true) {
    if (left === right) {               // need to check if `left` and `right` have overlapped. if so, the current node (at `left`) is the final one, so set its .next to `null` and break
      arr[left].next = null;
      break;
    } else {
      arr[left].next = arr[right];      // connect current node (at `left`) to next node (at `right`)...
      ++left;                           // ...and increment `left`
      if (left === right) {             // like before, we now must do another check to see if `left` and `right` have overlapped
        arr[right].next = null;         // (if so, current node (at `right`) is now the final one)
        break;
      } else {
        arr[right].next = arr[left];    // connect current node (at `right`) to next node (at `left`)...
        --right;                        // ...and decrement `right`
      }
    }
  }

  return head;
}

const reorderList = solution_1;

// const specialTest = (...args) => {
// };

class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = reorderList;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  head: new ListNode(1, 2, 3, 4),
};
expected = new ListNode(1, 4, 2, 3);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  head: new ListNode(1, 2, 3, 4, 5),
};
expected = new ListNode(1, 5, 2, 4, 3);
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: