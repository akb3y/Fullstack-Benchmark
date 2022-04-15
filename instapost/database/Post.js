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

  Post.updateOne({_id: data.id}, {likes: newLikes}, {runValidators: true})
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      console.log('updateOne error: ', error);
      callback(error, null);
    });
};

const addBlog = (data, callback) => {
  var information = new Post({
    username: data.username,
    imageUrl: data.url,
    body: data.body,
  });
  information.save((err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};


module.exports = {Post, fetchAll, updateLike, addBlog};
