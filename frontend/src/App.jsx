import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Home from './components/layouts/Home'
import Footer from "./components/layouts/Footer";
// import Search from "./components/layouts/Search";
import Menu from "./components/layouts/Menu";
import Cart from "./components/cart/Cart";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import  Login  from "./components/users/Login";
import  Register  from "./components/users/Register";
import { loadUser } from "./actions/userAction";
import  store  from "./store";
import  Profile  from "./components/users/Profile";
import  ForgotPassword  from "./components/users/ForgotPassword";
import  UpdateProfile  from "./components/users/UpdateProfile";
import  NewPassword from "./components/users/NewPassword";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

//import { useDispatch, useSelector } from "react-redux";
// import { fetchCartItems } from "./actions/cartAction";

export default function App() {
//dipatched exactly once when the component is first render , and check if user is Authenticated or not
console.log(store)
//when we reload then app.js run and loaduser run
useEffect(()=>{
store.dispatch(loadUser());
}, []); //first thing which load current user

//const dispatch = useDispatch()
// const {user} = useSelector(state => state.auth)
// if(user){//if user is there then fetch cart items as we have problem that when relogin then prev cart items of same user get 0 so we want that cartitems  
//   dispatch(fetchCartItems())
// } 
//but it also fetch empty cart and gives GET error

  return (
    //wrap all  pages u want url change and display compo
    <BrowserRouter>
  <div className="App">
    <Header/>
    <div className="container container-fluid">
   
    <Routes>
      {/* routes is container to wrap route / page, path- url  */}
      <Route path="/" element={<Home/>}></Route>
      <Route path="/eats/stores/:id/menus" element={<Menu/>}></Route>
      <Route path="/users/login" element={<Login/>}></Route>
      <Route path="/users/signup" element={<Register/>}></Route>
      <Route path="/users/me" element={<Profile></Profile>}></Route>
      <Route path="/users/me/update" element={<UpdateProfile></UpdateProfile>}></Route>
      <Route path="/users/forgotPassword" element={<ForgotPassword/>}></Route>
      <Route path="/users/resetPassword/:token" element={<NewPassword/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/success" element={<OrderSuccess/>}></Route>
      <Route path="/eats/orders/me/myOrders" element={<ListOrders/>}></Route>
      <Route path="/eats/orders/:id" element={<OrderDetails/>}></Route>
{/* if other than any above path then h1 tag render */}
      <Route path="*" element={<h1>The Page doesnot exist</h1>}></Route>
      
      </Routes>
    </div>
    
    <Footer></Footer>
  </div>
  </BrowserRouter>
  );
}


//react cycle - const , action all func to dispatch with api , reducer , Store and add reducer in it, then add routes in app.jsx, components