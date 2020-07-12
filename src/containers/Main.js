import React from 'react';
import './App.css';
import Navbar from '../components/Navbar'
import Axios from 'axios';

class Main extends React.Component {
  componentDidMount(){
    Axios.get("http:localhost:5000/")
      .then(res => console.log(res))
  }
  render() {

    return (
      <div id="Main">
        <div className="main-image bg-image" ></div>
        <div className="bg-text text-center">
          <Navbar />
          <div className="my-5">
            <h1 className="head-text">TODO LIST</h1>
            <h4> One Place for All your Tasks</h4>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light fixed-bottom">
            <a className="navbar-brand mx-auto" href="https://github.com/Gokul-J/Todo-App" rel="noopener noreferrer" target="_blank"><i className="fab fa-github" ></i></a>
          </nav>
        </div>
      </div>
    )
  }
}

export default Main;