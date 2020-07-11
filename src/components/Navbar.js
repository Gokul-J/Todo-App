import React from 'react';
import * as useractions from '../actions/userActions';
import { connect } from 'react-redux';


class Navbar extends React.Component {

  handleLogout(event) {
    // console.log(this.props.isLogged);
    this.props.userOut("http://localhost:5000/logout");
    // console.log(this.props.isLogged);
    event.preventDefault();
  }

  render() {

    const { isLogged, username } = this.props;

    let view;
    if (!isLogged) {
      view =
        <div className="navbar-nav ml-auto">
          <a className="nav-item mr-3 nav-link" href="/login"><i className="fas fa-user mr-2"></i>Login</a>
          <a className="nav-item mr-3 nav-link" href="/signup"><i className="fas fa-user-plus mr-2"></i>SignUp</a>
        </div>
    }
    else {
      view =
        <div className="navbar-nav ml-auto">
          <h6 className="nav-item text-white nav-link">Logged In as {username}</h6>
          <a className="nav-item mr-3 nav-link" href="/"><i className="fas fa-user-slash mr-2"></i>Logout</a>
        </div>
    }

    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <a className="navbar-brand ml-5" href="/">
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg> TODO</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarNav">
          {view}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.user.islogged,
    username: state.user.username,
    id: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userOut: (url) => dispatch(useractions.userOut(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);