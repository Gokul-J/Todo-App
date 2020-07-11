import React from 'react';
import { connect } from 'react-redux';
import * as todoactions from '../actions/todoActions';
import * as useractions from '../actions/userActions';
import Navbar from '../components/Navbar';
import './App.css';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputfield: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event) {
    this.setState({ inputfield: event.target.value })
  }

  handleSubmit(event) {
    if (this.state.inputfield !== "") {
      this.props.postRequest("http://localhost:5000/", { text: this.state.inputfield, username: this.props.username })
      this.setState({ inputfield: "" })
    }
    event.preventDefault();
  }

  handleDelete(id, event) {
    this.props.deleteRequest("http://localhost:5000/", { data: { id: id }, username: this.props.username }, this.props.history)
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getRequest("http://localhost:5000/", this.props.username);
  }

  render() {

    const { list, islogged, flash, flashMessage} = this.props;
    let view;

    if (!islogged) {
      this.props.history.push("/");
    }
    if(flash){
      view = <p className="flash bg-success">{flashMessage}</p>
      setTimeout(() => {
        this.props.resetFlash();
      }, 1000);
    }
    return (
      <div>
        <Navbar />
        <div>
          <div className="user-image bg-image"></div>
          <div className="list text-center">
            {view}

            <h1 className="head-text head-space">ToDo List</h1>

            <form onSubmit={this.handleSubmit} >
              <input id="todo-input" type="text" placeholder="Add New ToDo" value={this.state.inputfield} onChange={this.handleChange} />
              <button className="btn btn-success add">Add</button>
            </form>

          </div>
          <div className="elements" >
            <ol>
              {list.map(todo => {
                return (
                  <li key={todo._id} >
                    <input className="mx-3" type="checkbox" />
                    <span className="checkbox">{todo.text}</span>
                    <i class="fas fa-trash-alt text-right" onClick={this.handleDelete.bind(this, todo._id)}></i>
                  </li>)
              })}
            </ol>
          </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(state);
  return {
    list: state.todo.data,
    success: state.todo.showSuccessModal,
    username: state.user.username,
    id: state.user.id,
    islogged: state.user.islogged,
    flashMessage: state.user.flashMessage,
    flash: state.user.flash
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    getRequest: (url, body) => dispatch(todoactions.getData(url, body)),
    postRequest: (url, body) => dispatch(todoactions.postData(url, body)),
    deleteRequest: (url, body) => dispatch(todoactions.deleteData(url, body)),
    userOut: (url) => dispatch(useractions.userOut(url)),
    resetFlash: () => dispatch(useractions.resetFlash())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
