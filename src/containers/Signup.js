import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/userActions';
import Navbar from '../components/Navbar'

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
    this.props.userReq("http://localhost:5000/signup", {username, password}, this.props.history);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar />
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

const mapStateToProps = (state) => {
  return{
    username: state.user.username,
    islogged: state.user.islogged
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    userReq : (url, body, history) => dispatch(actions.userIn(url, body, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);