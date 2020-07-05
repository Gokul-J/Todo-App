import React from 'react';
import {connect} from 'react-redux';
import * as todoactions from '../actions/todoActions';
import * as useractions from '../actions/userActions';
import Navbar from '../components/Navbar'

class User extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputfield: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event){
    this.setState({inputfield: event.target.value})
  }

  handleSubmit(event){
    this.props.postRequest("http://localhost:5000/", {text:this.state.inputfield, username: this.props.username})
    this.setState({inputfield: ""})
    event.preventDefault();
  }

  handleDelete(id, event){
    this.props.deleteRequest("http://localhost:5000/", {data : {id:id}, username: this.props.username})
    event.preventDefault();
  }

  handleLogout(event){
    console.log(this.props.isLogged);
    this.props.userOut("http://localhost:5000/logout");
    console.log(this.props.isLogged);
    event.preventDefault();
  }

  componentDidMount(){
    this.props.getRequest("http://localhost:5000/", this.props.username);
  }

  render(){

    const {list, isLogged, username} = this.props;
    // console.log(this.props.isLogged);

    // let view;
    // if(!isLogged){
    //   view = <div>
    //       <a href="/signup">SignUp</a>
    //       <a href="/login">Login</a>
    //   </div>
    // }
    // else{
    //   view = <div>
    //     <h4>Logged In as {username}</h4>
    //     <button onClick={this.handleLogout}>Logout</button>
    //     </div>
    // }

    return (
      <div>
        <Navbar />
        <h1>ToDo List</h1>

        {/* <span>
          {view}
        </span> */}
        
        <form onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Add New ToDo" value={this.state.inputfield} onChange={this.handleChange} />
          <button>Add</button>
        </form>

        
        <ol>
          {list.map(todo => {
            return (
              <li key={todo._id} >
                <input type="checkbox" /><span className="checkbox">{todo.text}</span>
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
  console.log(state);
  return{
    list: state.todo.data,
    success: state.todo.showSuccessModal,
    isLogged: state.user.islogged,
    username: state.user.username,
    id: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {

  return{
    getRequest: (url, body) => dispatch(todoactions.getData(url, body)),
    postRequest: (url, body) => dispatch(todoactions.postData(url,body)),
    deleteRequest: (url, body) => dispatch(todoactions.deleteData(url, body)),
    userOut: (url) => dispatch(useractions.userOut(url))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User);
