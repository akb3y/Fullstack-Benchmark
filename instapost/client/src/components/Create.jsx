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
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
        <input className="create__input" name="username" type="text" placeholder="Username" onChange={this.handleFormChange} value={this.state.username} />
        <input className="create__input" name="url" type="text" placeholder="Image URL" onChange={this.handleFormChange} value={this.state.url}/>
        <textarea
          name="body"
          className="create__body__textarea"
          placeholder="Here goes your post content."
          onChange={this.handleFormChange}
          value={this.state.body}
        ></textarea>
        <button className="create__button" type="submit" >Send</button>
      </form>
    );
  }
}

export default Create;