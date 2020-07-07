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
        <div id="login" className="login-content text-center" >
          <div className="form-image bg-image"></div>
          <div className="form-content">
            <h1 id="form-head">Signup</h1>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                {/* <label for="username">Username</label> */}
                <input id="username" className="form-control" type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                {/* <label for="password">Password</label> */}
                <input id="password" className="form-control" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
              </div>
              <input className="btn btn-success btn-lg m-3 px-5" type="submit" />
            </form>
          </div>
        </div>
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