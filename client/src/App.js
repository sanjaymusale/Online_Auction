//add some line public/index.html<24-35>


import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';


import Register from './component/user/Register'
import LogOut from './component/user/LogOut'
import SignIn from './component/user/SignIn'
import UserDashboard from './component/user/Dashboard'
import NavBar from './component/dashboard/NavBar';
import PublicRoute from './component/Route/PublicRoute'
import AdminRoute from './component/Route/AdminRoute'
import UserRoute from './component/Route/UserRoute'
import ProductHero from './component/home/ProductHero'

//admin
import AdminProductView from './component/product/AdminProductView'
import ShowCategory from './component/category/CategoryShow'
import AddCategory from './component/category/CategoryAdd'
import EditCategory from './component/category/CategoryEdit'

//User
import ProductNew from './component/product/ProductNew'
import ProductEdit from './component/product/ProductEdit'
import ProductShow from './component/product/ProductShow';
import ProductDetail from './component/product/ProductDetail';
import UserProduct from './component/product/UserProduct'
import SessionAdd from './component/session/SessionAdd';
import MyProduct from './component/product/MyProduct';
import CurrentProduct from './component/bidding/CurrentProduct';
import CurrentBidding from './component/bidding/CurrentBidding';
import Product from './component/product/ProductDetailCommon'
import MyBids from './component/product/MyBids'
import NotFound from './component/dashboard/NotFound'
import ProductBidder from './component/product/MyProductParticipants'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <NavBar />

          <Switch>
            <Route exact path='/' component={ProductHero} />
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/login" component={SignIn} />
            <PublicRoute exact path='/productmt/:id' component={Product} />
            <PublicRoute exact path='/user/dashboard' component={UserDashboard} />
            <PublicRoute exact path="/logout" component={LogOut} />
            <PublicRoute exact path='/userProduct/:id' component={UserProduct} />

            //Admin
            <AdminRoute exact path="/category" component={ShowCategory} />
            <AdminRoute exact path="/category/add" component={AddCategory} />
            <AdminRoute exact path="/category/edit/:id" component={EditCategory} />
            <AdminRoute exact path="/product/list" component={AdminProductView} />


            //User

            <UserRoute exact path="/product" component={ProductNew} />

            <UserRoute exact path='/session/add/:id' component={SessionAdd} />




            <UserRoute exact path='/session/addForm/:id' component={SessionAdd} />
            <UserRoute exact path="/product/edit/:id" component={ProductEdit} />
            <UserRoute exact path="/myproduct" component={MyProduct} />

            <UserRoute exact path="/myBids" component={MyBids} />
            <UserRoute exact path="/bidders" component={ProductBidder} />
            <UserRoute exact path="/currentBid" component={CurrentProduct} />

            <UserRoute exact path='/biddingroom/:id' component={CurrentBidding} />

            <Route component={NotFound} />


          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
