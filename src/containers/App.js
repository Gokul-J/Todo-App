import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import * as actions from '../actions/actions';

class App extends React.Component {

  // handleSubmit(props){
  //   this.props.postRequest("http://localhost:5000", this.props.inputfield)
  // }

  componentDidMount(){
    this.props.getRequest("http://localhost:5000/");
  }

  render(){

    const {list, onInputChange, inputfield, postRequest} = this.props;

    return (
      <div>
        <h1>ToDo List</h1>

        <span>
          <a href="/signup">SignUp</a>
          <a href="/login">Login</a>
          <a href="/logout">Logout</a>
        </span>
        
        <form onSubmit={postRequest} >
          <input type="text" placeholder="Add New ToDo" onChange={onInputChange} />
          <button>Add</button>
        </form>

        
        <ol>
          {list.map(todo => {
            return (
              <li key={todo._id} >
                <input type="checkbox" />{todo.text}
                {/* <button onClick={this.handleEdit.bind(this, todo._id)}>
                        Edit
                      </button> */}
                {/* <a href="/" onClick={this.handleDelete.bind(this, todo._id)}> X </a> */}
              </li>)
          })}
        </ol>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(state.todo);
  const body = state.todo;
  console.log(body);
  return{
    list: state.index.data,
    inputfield: state.todo.inputField
  }
}

const mapDispatchToProps = (dispatch) => {

  return{
    onInputChange: (event) => dispatch(actions.setTodoInput(event.target.value)),
    getRequest: (url) => dispatch(actions.getData(url)),
    postRequest: (url, body) => dispatch(actions.postData(url,body))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
