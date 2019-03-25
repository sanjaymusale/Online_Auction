import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

import Register from './component/user/Register'
import FormikApp from './component/user/formik'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/user/register" >Register</Link> ||
          <Link to="/user/login" >Login</Link>

          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/login" component={FormikApp} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
