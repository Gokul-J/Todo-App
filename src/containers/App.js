import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import * as actions from '../actions/actions';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputfield: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({inputfield: event.target.value})
  }

  handleSubmit(event){
    this.props.postRequest("http://localhost:5000/", {text:this.state.inputfield})
    this.setState({inputfield: ""})
    event.preventDefault();
  }

  handleDelete(id, event){
    this.props.deleteRequest("http://localhost:5000/", {data : {id:id}})
    event.preventDefault();
  }

  componentDidMount(){
    this.props.getRequest("http://localhost:5000/");
  }

  render(){

    const {list} = this.props;

    return (
      <div>
        <h1>ToDo List</h1>

        <span>
          <a href="/signup">SignUp</a>
          <a href="/login">Login</a>
          <a href="/logout">Logout</a>
        </span>
        
        <form onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Add New ToDo" value={this.state.inputfield} onChange={this.handleChange} />
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
                <a href="/" onClick={this.handleDelete.bind(this, todo._id)}> X </a>
              </li>)
          })}
        </ol>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    list: state.data,
    success: state.showSuccessModal
  }
}

const mapDispatchToProps = (dispatch) => {

  return{
    getRequest: (url) => dispatch(actions.getData(url)),
    postRequest: (url, body) => dispatch(actions.postData(url,body)),
    deleteRequest: (url, body) => dispatch(actions.deleteData(url, body))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
