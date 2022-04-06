const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema(
  {
    username: String,
    imageUrl: String,
    body: String,
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

const fetchAll = (callback) => {
  Post.find({})
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};

module.exports = {Post, fetchAll};
