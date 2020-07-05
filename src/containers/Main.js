import React from 'react';
import './User.css';
import Navbar from '../components/Navbar'

class Main extends React.Component {
  render() {

    return (
      <div id="Main">
        <div className="bg-image" ></div>
        <div className="bg-text text-center">
          <Navbar />
          <div className="my-5">
            <h1 className="head-text">TODO LIST</h1>
            <h4> One Place for All your Tasks</h4>
          </div>
          <nav class="navbar fixed-bottom navbar-dark">
            <a class="navbar-brand" href="#">Fixed bottom</a>
          </nav>
        </div>
      </div>
    )
  }
}

export default Main;