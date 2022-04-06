import React from 'react';
import axios from 'axios';
import Post from './Post.jsx';
import moment from 'moment';

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
      this.state.data.reverse().map((item) =>
        <div className='post'>
          <div className='post__byline'>
            <div className='center'>
              <img
                className='avatar'
                src='https://www.w3schools.com/w3images/avatar6.png'
                alt='user avatar'
              />
              <span className='post__byline__user'>{item.username}</span>
            </div>
            {moment(item.createdAt).fromNow()}
          </div>
          <div className='post__image'>
            <img src={item.imageUrl}/>
          </div>
          <p>
            {item.body};
          </p>

          <div className='post__actions'>
            <div className='post__likes'>Likes: {item.likes}</div>
            <div className='post__buttons'>
              <button>Like</button>
              <button>Comment</button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Feed;
