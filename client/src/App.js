import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

import Register from './component/user/Register'
import Login from './component/user/Login'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/user/register" >Register</Link> ||
          <Link to="/user/login" >Login</Link>

          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
