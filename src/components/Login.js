import React from 'react';

class Login extends React.Component {

  render() {
    return (
      <div>
        <h1>Login</h1>

        <form>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Login;