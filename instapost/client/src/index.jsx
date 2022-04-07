import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import Feed from './components/Feed.jsx';
import Create from './components/Create.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.getAllBlogs = this.getAllBlogs.bind(this);
  }

  componentDidMount() {
    this.getAllBlogs();
  }

  getAllBlogs() {
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
      <div>
        <div className="nav">
          <span className="nav__logo" >
            Instapost
          </span>
        </div>

        <div className="main">
          <Create getAllBlogs={this.getAllBlogs} />
          <Feed data={this.state.data} getAllBlogs={this.getAllBlogs} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
