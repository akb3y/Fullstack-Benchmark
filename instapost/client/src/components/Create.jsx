import React from 'react';
import axios from 'axios';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      url: '',
      body: '',
    };
    this.usernameHandle = this.usernameHandle.bind(this);
    this.urlHandle = this.urlHandle.bind(this);
    this.bodyHandle = this.bodyHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  usernameHandle(e) {
    this.setState({username: e.target.value});
  }

  urlHandle(e) {
    this.setState({url: e.target.value});
  }

  bodyHandle(e) {
    this.setState({body: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/posts', {
      username: this.state.username,
      imageUrl: this.state.url,
      body: this.state.body
    })
      .then(()=> {
        this.setState({ username: '',
          url: '',
          body: '', });
      })
      .then(() => this.props.getAllBlogs())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <form className="create" onSubmit={this.handleSubmit}>
        <h3>Add a Post!</h3>
        <input className="create__input" type="text" placeholder="Username" onChange={this.usernameHandle} value={this.state.username} />
        <input className="create__input" type="text" placeholder="Image URL" onChange={this.urlHandle} value={this.state.url}/>
        <textarea
          className="create__body__textarea"
          placeholder="Here goes your post content."
          onChange={this.bodyHandle}
          value={this.state.body}
        ></textarea>
        <button className="create__button" type="submit" >Send</button>
      </form>
    );
  }
}

export default Create;