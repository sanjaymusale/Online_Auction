import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

import Register from './component/user/Register'
import Login from './component/user/Login'
import ProductNew from './component/product/ProductNew'
import ProductEdit from './component/product/ProductEdit'
import ProductShow from './component/product/ProductShow';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/user/register" >Register</Link> ||
          <Link to="/user/login" >Login</Link> ||
          <Link to="/product" >Add Product</Link>
          <Link to="/product/list">Products</Link>

          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/product" component={ProductNew} />
          <Route exact path="/product/list" component={ProductShow} />
          <Route exact path="/product/edit/:id" component={ProductEdit} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
