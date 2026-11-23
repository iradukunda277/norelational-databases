const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  await users.insertOne({
    name: "Alice",
    address: {
      city: "Paris",
      country: "France",
    },
  });


  // TODO 1 - Insert a user with an embedded address
  await users.insertOne({
    name: "Alice",
    email: "alice@example.com",
    address: {
      city: "Paris",
      country: "France"
    }
  });

  // TODO 2 - Insert a user with at least 3 skills
  await users.insertOne({
    name: "Bob",
    email: "bob@example.com",
    skills: ["JavaScript", "Node.js", "MongoDB"]
  });

  // TODO 3 - Insert at least 5 users in one operation
  await users.insertMany([
    {
      name: "Claire",
      email: "claire@example.com",
      address: { city: "Lyon", country: "France" },
      skills: ["Python", "SQL"]
    },
    {
      name: "David",
      email: "david@example.com",
      address: { city: "Marseille", country: "France" },
      skills: ["Git", "Linux"]
    },
    {
      name: "Emma",
      email: "emma@example.com",
      address: { city: "Berlin", country: "Germany" }
    },
    {
      name: "Frank",
      email: "frank@example.com",
      skills: ["React", "TypeScript"]
    },
    {
      name: "Grace",
      email: "grace@example.com",
      address: { city: "Madrid", country: "Spain" }
    }
  ]);

  // TODO 4 - Retrieve and display all users
  const allUsers = await users.find().toArray();
  console.log("All users:");
  allUsers.forEach(user => console.log(user.name));

  // TODO 5 - Find a user whose address.city is Paris
  const parisUser = await users.findOne({
    "address.city": "Paris"
  });
  console.log("User in Paris:", parisUser?.name);

  // TODO 6 - Find all users living in France
  const frenchUsers = await users.find({
    "address.country": "France"
  }).toArray();

  console.log("Users from France:");
  frenchUsers.forEach(user => console.log(user.name));

  // TODO 7 - Find all users with a skills field
  const skilledUsers = await users.find({
    skills: { $exists: true }
  }).toArray();

  console.log("Users with skills:");
  skilledUsers.forEach(user => console.log(user.name));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
