import React from 'react';
import axios from 'axios';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state={
      username: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSubmit(event){
    const {username, password} = this.state;
    console.log(username +" "+ password );
    axios.post("http://localhost:5000/signup", {username, password})
      .then(res => {
        this.setState({
          username : "",
          password : ""
        })
        console.log(res);
      })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>SignUp</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Signup;