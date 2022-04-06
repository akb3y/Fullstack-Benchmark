import React from 'react';
import axios from 'axios';
import Post from './Post.jsx';

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get('/api/posts')
      .then(result => {
        this.setState({data: result.data});
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className='feed'>
        {/* section for post form */}

        {/* section for all posts */}
        <Post />
      </div>
    );
  }
}

export default Feed;
