import React from 'react';
import axios from 'axios';
import Post from './Post.jsx';
import moment from 'moment';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.updateLikes = this.updateLikes.bind(this);
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

  render() {
    return (
      this.props.data.reverse().map((item) =>
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

          {(item.body.length > 144 && this.state.toggle === false) ? (
            <p>{item.body.slice(0, 144)} <button onClick={() => this.setState({toggle: true})}>See more</button></p>
          ) : (
            <p>
              {item.body.split('.').slice(0, 4).join(' ')};
              <br />
              <br />
              {item.body.split('.').slice(4, 8).join(' ')};
              <br />
              <br />
              {item.body.split('.').slice(8, 16).join(' ')};
              <br />
              <br />
              {item.body.split('.').slice(16).join(' ')};
            </p>
          )}

          <div className='post__actions'>
            <div className='post__likes'>Likes: {item.likes}</div>
            <div className='post__buttons'>
              <button id={item._id} onClick={this.updateLikes} value={item.likes}>Like</button>
              <button>Comment</button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Feed;
