// Create a function called processReturns which processes a queue of people returning library books.
// Each person has a name and a list of books with their return dates.
// The function should calculate the late fee for each person based on how many days late each book is (1 day late = $2 fine).
// Remove people from the queue if their total late fee is $0 (all books were returned on time).
// Make sure to implement FIFO (First-In, First-Out)

const Queue = require('../lib/Queue')

function processReturns(queue) {
  // your code here
  let tempQueue = new Queue()

  while (!queue.isEmpty()) {
    let currPerson = queue.dequeue()
    let totalFine = 0
    for (let i = 0; i < currPerson.books.length; i++) {
      totalFine += currPerson.books[i].daysLate * 2
    }
    if (totalFine > 0) {
      currPerson.fine = totalFine
      tempQueue.enqueue(currPerson)
    }
  }

  while (!tempQueue.isEmpty()) {
    queue.enqueue(tempQueue.dequeue())
  }
}

const returns = new Queue();
returns.enqueue({ name: "Alice", books: [{ title: "Book 1", daysLate: 0 }, { title: "Book 2", daysLate: 5 }] });
returns.enqueue({ name: "Bob", books: [{ title: "Book 3", daysLate: 0 }] });
returns.enqueue({ name: "Charlie", books: [{ title: "Book 4", daysLate: 2 }, { title: "Book 5", daysLate: 4 }] });

processReturns(returns);
console.log(returns.printQueue());
// Expected output:
// { name: "Alice", books: [{ title: "Book 1", daysLate: 0 }, { title: "Book 2", daysLate: 5 }] }
// { name: "Charlie", books: [{ title: "Book 4", daysLate: 2 }, { title: "Book 5", daysLate: 4 }] }
