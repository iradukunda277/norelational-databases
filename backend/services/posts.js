const Post = require("../models/post");

// GET /posts
async function findAll() {
  return Post.find().populate(
    "author",
    "name email avatar"
  );
}

// GET /posts/:id
async function findById(id) {
  return Post.findById(id).populate(
    "author",
    "name email avatar"
  );
}

// POST /posts
async function create(body) {
  const post = await Post.create(body);

  return post.populate(
    "author",
    "name email avatar"
  );
}

// PUT /posts/:id
async function update(id, body) {
  return Post.findByIdAndUpdate(id, body, {
    new: true
  }).populate(
    "author",
    "name email avatar"
  );
}

// DELETE /posts/:id
async function remove(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
