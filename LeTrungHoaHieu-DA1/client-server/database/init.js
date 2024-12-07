// Switch to the 'bank' database
db = db.getSiblingDB("bank");

// Create the 'accounts' collection
db.createCollection("accounts");

// Clean the 'accounts' collection
db.accounts.deleteMany({});

// Insert initial data into the 'accounts' collection
db.accounts.insertMany([
  {
    userId: "pvh",
    email: "pvhoang940@gmail.com",
    password: "12345",
    balance: 10000,
  },
  {
    userId: "jdoe",
    email: "johndoe@example.com",
    password: "password123",
    balance: 5000,
  },
  {
    userId: "asmith",
    email: "annasmith@example.com",
    password: "mypassword",
    balance: 7500,
  },
  {
    userId: "bwayne",
    email: "brucewayne@example.com",
    password: "batman",
    balance: 20000,
  },
  {
    userId: "ckent",
    email: "clarkkent@example.com",
    password: "superman",
    balance: 15000,
  },
]);
