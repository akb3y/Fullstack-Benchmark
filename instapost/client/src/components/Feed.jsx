import React from 'react';
import axios from 'axios';
import Post from './Post.jsx';
import moment from 'moment';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longPost: false
    };
    this.updateLikes = this.updateLikes.bind(this);
    this.toggleLongPost = this.toggleLongPost.bind(this);
  }

  updateLikes(e) {
    e.preventDefault();

    axios.patch(`/api/posts/${e.target.id}`, {
      likes: Number(e.target.value)
    })
      .then((data) => {
        console.log('FE : ', data.data);
        this.props.getAllBlogs();
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleLongPost() {
    this.setState({ longPost: true });
  }

  render() {
    return (
      this.props.data.reverse().map((blog) =>
        <Post blog={blog} updateLikes={this.updateLikes} toggleLongPost={this.toggleLongPost} />
      )
    );
  }
}

export default Feed;
