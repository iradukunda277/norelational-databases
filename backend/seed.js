const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

const usersData = require("./data/users.json");
const postsData = require("./data/posts.json");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

async function main() {
  try {
    await mongoose.connect(URI);

    console.log("Connected to MongoDB");

    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});

    // Insert the professor's sample data
    await User.insertMany(usersData);
    await Post.insertMany(postsData);

    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();

    console.log(`Seeded ${userCount} users and ${postCount} posts.`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
