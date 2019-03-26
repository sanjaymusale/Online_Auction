import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

import Register from './component/user/Register'
import Login from './component/user/Login'

import ProductNew from './component/product/ProductNew'
import ProductEdit from './component/product/ProductEdit'
import ProductShow from './component/product/ProductShow';

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
          <Link to="/user/login" >Login</Link> ||
          <Link to="/product" >Add Product</Link>||
          <Link to="/product/list">Products</Link>||
          <Link to="/category">Category</Link>

          <Route exact path="/user/register" component={Register} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/product" component={ProductNew} />
          <Route exact path="/product/list" component={ProductShow} />
          <Route exact path="/product/edit/:id" component={ProductEdit} />


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
