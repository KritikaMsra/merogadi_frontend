import React from 'react';
import {Switch,Route, BrowserRouter} from 'react-router-dom';
import Login from '../Body/Login';
import Register from '../Body/Register';
import Body from '../Body/Body';
import AboutUs from '../About Us/AboutUs';
import Cart from '../Body/Cart';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Admin from '../admin/admin';
import Shop from '../shop/shop';
import SingleProduct from '../shop/singleProduct'
import AddGiveaway from '../admin/addGiveaway'
import ShowGiveaway from '../admin/showGiveaway';
import Chat from '../chat/chat';
import Map from '../Map/map';
import ShowMap from '../Map/showMap';
import HireMe from '../Hire/hireMe';
import Repairman from '../Hire/repairman';


const FurnitureRouter = (props)=>{
    return (
      <>
           <Header/>
            <Route path="/" component={Body} exact></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/AboutUs" component={AboutUs}></Route>
            <Route path="/admins" component={Admin}></Route>
            <Route path="/shop" component={Shop}></Route>
            <Route path="/singleProduct/:pid" component={SingleProduct}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/addGiveaway" component={AddGiveaway} exact></Route>
            <Route path="/showGiveaway" component={ShowGiveaway} exact></Route>
            <Route path = "/chat" component={Chat} exact></Route>
            <Route path="/garages" component={ShowMap}></Route>
            <Route path="/hire" component={HireMe} exact></Route>
            <Route path="/repairmans" component={Repairman} exact></Route>
          
        <Footer/>
      </>
    )
}

export default FurnitureRouter;