import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css';

import Register from './component/user/Register'
import Login from './component/user/Login'
import Dashboard from './component/user/Dashboard'
import SelectCategory from './component/user/SelectCategory'


import ProductNew from './component/product/ProductNew'
import ProductEdit from './component/product/ProductEdit'
import ProductShow from './component/product/ProductShow';

import ShowCategory from './component/category/CategoryShow'
import AddCategory from './component/category/CategoryAdd'
// import AddCategory from './component/category/CategoryForm'
import EditCategory from './component/category/CategoryEdit'
import ProductDetail from './component/product/ProductDetail';
import SessionAdd from './component/session/SessionAdd';
import SessionShow from './component/session/SessionShow'
import SessionEdit from './component/session/SessionEdit'

import MyProduct from './component/product/MyProduct';
import CurrentProduct from './component/bidding/CurrentProduct';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/user/register" >Register</Link> ||
          <Link to="/user/login" >Login</Link> ||
          <Link to="/user/dashboard">Dashboard</Link>||
          <Link to="/product" >Add Product</Link>||
          <Link to="/product/list">Products</Link>||
          <Link to="/category">Category</Link> ||
          <Link to='/session/add'>Add Session</Link> ||

          <Link to='/myproduct'>My Product</Link> ||
          <Link to='/currentBid'>Current Bid</Link>

          <Link to='/session/list'>View Session</Link>||



          <Switch>
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/dashboard" component={Dashboard} />
            <Route exact path="/product" component={ProductNew} />
            <Route exact path="/user/selectCategory" component={SelectCategory} />


            <Route exact path='/session/add' component={SessionAdd} />
            <Route exact path='/session/list' component={SessionShow} />
            <Route exact path='/session_edit/:id' component={SessionEdit} />

            <Route exact path="/product/list" component={ProductShow} />
            <Route exact path='/product/:id' component={ProductDetail} />
            <Route exact path="/product/edit/:id" component={ProductEdit} />
            <Route exact path="/myproduct" component={MyProduct} />


            <Route exact path="/category" component={ShowCategory} />
            <Route exact path="/category/add" component={AddCategory} />

            <Route exact path="/category/edit/:id" component={EditCategory} />

            <Route exact path="/currentBid" component={CurrentProduct} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
