import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      text: "",
      list: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({text : event.target.value});
  }

  handleSubmit(event){
    const {text} = this.state;
    if(text!==""){
      axios.post("http://localhost:5000/", {text})
      .then(res => {
        this.setState({text: ""});
        this.componentDidMount();
      })
    }
    event.preventDefault();
  }

  handleEdit(id, event){
    axios.get("http://localhost:5000/" + id)
      .then(res => {
        this.setState({text: res.data.text});
      })
    this.handleDelete(id, event);
  }

  handleDelete(id, event){
    axios.delete("http://localhost:5000/", {data : {id:id}} )
      .then(res => {
        this.componentDidMount();
      })
    event.preventDefault();
  }

  componentDidMount(){
    axios.get("http://localhost:5000/")
      .then(res => {
        this.setState({list: res.data});
      })
  }

  render(){

    return (
      <div>
        <h1>ToDo List</h1>

        <span>
          <a href="/signup">SignUp</a>
          <a href="/login">Login</a>
          <a href="/logout">Logout</a>
        </span>
        
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add New ToDo" value={this.state.text} onChange={this.handleChange}/>
          <button>Add</button>
        </form>

        
        <ol>
          {this.state.list.map(todo => {
            return (
              <li key={todo._id} onDoubleClick={this.handleEdit.bind(this, todo._id)}>
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

export default App;
