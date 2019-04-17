//add some line public/index.html<24-35>


import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

// import Register from './component/user/Register'
import Register from './component/user/Registermt'
// import Login from './component/user/Login'
// import HomePage from './component/user/HomePage'
// import Dashboard from './component/user/Dashboard'
import LogOut from './component/user/LogOut'
import AdminProductView from './component/product/AdminProductView'

import ProductNew from './component/product/ProductNew'
import ProductEdit from './component/product/ProductEdit'
import ProductShow from './component/product/ProductShow';

import ShowCategory from './component/category/CategoryShow'
import AddCategory from './component/category/CategoryAdd'
// import AddCategory from './component/category/CategoryForm'
import EditCategory from './component/category/CategoryEdit'
import ProductDetail from './component/product/ProductDetail';
import UserProduct from './component/product/UserProduct'
import SignIn from './component/user/SignIn'
// import SessionForm from './component/session/SessionForm'

import SessionAdd from './component/session/SessionAdd';

import SessionEdit from './component/session/SessionEdit'

import MyProduct from './component/product/MyProduct';
import CurrentProduct from './component/bidding/CurrentProduct';
import NavBar from './component/dashboard/NavBar';
import CurrentBidding from './component/bidding/CurrentBidding';

import UserDashboard from './component/user/DashboardMt'
import Product from './component/product/ProductDetailmt'
import CustomizedSnackbars from './component/user/alert'
import MyBids from './component/product/MyBids'
import ProductBidder from './component/product/MyProductParticipants'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <NavBar />

          <Switch>
            {/* <Route exact path="/" component={HomePage} /> */}
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/login" component={SignIn} />
            <Route exact path="/logout" component={LogOut} />

            {/* <Route exact path="/user/dashboard" component={Dashboard} /> */}
            <Route exact path="/product" component={ProductNew} />

            <Route exact path='/productmt/:id' component={Product} />
            <Route exact path='/session/add/:id' component={SessionAdd} />

            <Route exact path='/session_edit/:id' component={SessionEdit} />

            <Route exact path="/product/list" component={AdminProductView} />
            <Route exact path='/product/:id' component={ProductDetail} />
            <Route exact path='/userProduct/:id' component={UserProduct} />
            <Route exact path='/user/dashboard' component={UserDashboard} />
            <Route exact path='/session/addForm/:id' component={SessionAdd} />

            <Route exact path='/alert' component={CustomizedSnackbars} />


            <Route exact path="/product/edit/:id" component={ProductEdit} />
            <Route exact path="/myproduct" component={MyProduct} />

            <Route exact path="/myBids" component={MyBids} />
            <Route exact path="/bidders" component={ProductBidder} />

            <Route exact path="/sign" component={SignIn} />

            <Route exact path="/category" component={ShowCategory} />
            <Route exact path="/category/add" component={AddCategory} />

            <Route exact path="/category/edit/:id" component={EditCategory} />

            <Route exact path="/currentBid" component={CurrentProduct} />

            <Route exact path='/biddingroom/:id' component={CurrentBidding} />


          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
