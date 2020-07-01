import React from 'react';

class Signup extends React.Component {

  render() {
    return (
      <div>
        <h1>SignUp</h1>

        <form>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Signup;