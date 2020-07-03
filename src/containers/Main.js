import React from 'react';
import './User.css';

class Main extends React.Component {
  render() {

    return (
      <div id="Main" className="container text-center">
        <h1 className="text-center">Welcome to Todo App</h1>
        <div className="row">
          <div className="col">
            <a href="/signup">SignUp</a>
          </div>
          <div className="col">
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;