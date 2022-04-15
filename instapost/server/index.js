const express = require('express');
const modules = require('../database/Post.js');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/api/posts', function(req, res) {
  modules.fetchAll((err, data) =>{
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.patch('/api/posts/:postId', (req, res) => {
  var info = {id: req.params.postId, likes: req.body.likes};

  modules.updateLike(info, (err, data) =>{
    if (err) {
      res.status(400).send('Cannot update: ', err);
    } else {
      res.send(data);
    }
  });
});

app.post('/api/posts', (req, res) =>{
  var data = {
    username: req.body.username,
    url: req.body.imageUrl,
    body: req.body.body
  };
  modules.addBlog(data, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(result);
    }
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
