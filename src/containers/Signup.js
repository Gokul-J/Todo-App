import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/userActions';
import Navbar from '../components/Navbar';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSubmit(event){
    const {username, password} = this.state;
    this.props.userReq("/api/user/signup", {username, password}, this.props.history);
    event.preventDefault();
  }

  render() {
    const {flashMessage, flash} = this.props;
    let view;

    if(flash){
      view = <p className="flash bg-danger">{flashMessage}</p>
      setTimeout(() => {
        this.props.resetFlash();
      }, 1000);
    }
    
    return (
      <div>
        <Navbar />
        <div id="login" className="login-content text-center" >
          <div className="form-image bg-image"></div>
          <div className="form-content">
            {view}
            <h1 id="form-head">Signup</h1>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input id="username" className="form-control" type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} minLength={4} required/>
              </div>
              <div className="form-group">
                <input id="password" className="form-control" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} minLength={6} maxLength={12} required/>
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
    islogged: state.user.islogged,
    flashMessage: state.user.flashMessage,
    flash: state.user.flash
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    userReq : (url, body, history) => dispatch(actions.userIn(url, body, history)),
    resetFlash: () => dispatch(actions.resetFlash())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);