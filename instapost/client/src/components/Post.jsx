/* eslint-disable func-style */
import React from 'react';
import moment from 'moment';

function Post(props) {
  return (
    <div className='post'>
      <div className='post__byline'>
        <div className='center'>
          <img
            className='avatar'
            src='https://www.w3schools.com/w3images/avatar6.png'
            alt='user avatar'
          />
          <span className='post__byline__user'>{props.blog.username}</span>
        </div>
        {moment(props.blog.createdAt).fromNow()}
      </div>
      <div className='post__image'>
        <img src={props.blog.imageUrl} />
      </div>
      {(props.blog.body.length > 144 ) ? (
        <p>{props.blog.body.slice(0, 144)} <button onClick={props.toggleLongPost}>See more</button></p>
      ) : (
        <p>
          {props.blog.body.split('.').slice(0, 4).join(' ')};
          <br />
          <br />
          {props.blog.body.split('.').slice(4, 8).join(' ')};
          <br />
          <br />
          {props.blog.body.split('.').slice(8, 16).join(' ')};
          <br />
          <br />
          {props.blog.body.split('.').slice(16).join(' ')};
        </p>
      )}

      <div className='post__actions'>
        <div className='post__likes'>Likes: {props.blog.likes}</div>
        <div className='post__buttons'>
          <button id={props.blog._id} onClick={props.updateLikes} value={props.blog.likes}>Like</button>
          <button>Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
