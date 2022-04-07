const mongoose = require('mongoose');
const db = require('./index.js');
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

const Post = mongoose.model('Post', postSchema);

const fetchAll = (callback) => {
  Post.find({})
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
};

const updateLike = (data, callback) => {
  const newLikes = data.likes + 1;

  Post.updateOne({_id: data.id}, {likes: newLikes})
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      console.log('updateOne error: ', error);
      callback(error, null);
    });
};


module.exports = {Post, fetchAll, updateLike};
