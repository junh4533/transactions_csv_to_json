const fs = require("file-system");
const transactions = new Map();
const users = new Map();
const userTransactions = [];

// read user excel file and map user "name" to "user_id"
fs.readFile("./users.csv", "utf-8", (err, data) => {
  if (err) console.log(err);

  const splitData = data.split("\n");
  for (let i = 1; i < splitData.length; i++) {
    const rawData = splitData[i].split(","),
      user_id = rawData[0],
      name = rawData[1],
      email = rawData[2];
    users.set(user_id, { name: name, email: email }); // .set() has a O(1) time complexity
  }
});

// read transaction excel file and map user "name" to their transaction(s)
fs.readFile("./transactions.csv", "utf-8", (err, data) => {
  if (err) console.log(err);

  const splitData = data.split("\n");
  for (let i = 1; i < splitData.length; i++) {
    const rawData = splitData[i].split(","),
      transaction_id = rawData[0],
      user_id = rawData[1],
      amount = rawData[2];

    // check if transaction belongs to a user
    if (users.get(user_id) !== undefined) {
      const username = users.get(user_id).name, // .get() has a O(1) time complexity
        email = users.get(user_id).email;

      // add another transaction to EXISTING transaction object
      if (transactions.has(username)) {
        const past_transactions = transactions.get(username).transactions;
        past_transactions.push({ id: transaction_id, amount: amount });
      } else {
        // append new transaction object to array
        transactions.set(username, {
          id: user_id,
          name: username,
          email: email,
          transactions: [{ id: transaction_id, amount: amount }],
        });
      }
    }
  }

  // convert map into array
  transactions.forEach((transaction) => {
    userTransactions.push(transaction);
  });

  console.log(transactions.get("Darrin Becker")); // test user (id: 80672672) to ensure that it returns the correct transactions
  console.log(JSON.stringify(userTransactions, null, 2));
});
