import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

import Register from './component/user/Register'
import Login from './component/user/Login'
import ShowCategory from './component/category/CategoryShow'
import AddCategory from './component/category/CategoryAdd'
// import AddCategory from './component/category/CategoryForm'
// import EditCategory from './component/category/CategoryEdit'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/user/register" >Register</Link> ||
          <Link to="/user/login" >Login</Link>||
          {/* <Link to="/add_category">Category</Link> */}
          <Link to="/category">Category</Link>

          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/category" component={ShowCategory} />
          <Route exact path="/category/add" component={AddCategory} />
          {/* <Route exact path="/add_category" component={AddCategory} />
          <Route exact path="/edit_category" component={EditCategory} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
