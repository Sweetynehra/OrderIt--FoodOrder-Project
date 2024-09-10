
import React from 'react'
import Search from "./Search";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/userAction";
// jsx for to write compo into compo

export default function Header() {
  const alert= useAlert();
const dispatch = useDispatch();

//for user image login take state
const {user, loading} = useSelector((state)=> state.auth);
const {cartItems} = useSelector((state)=>state.cart)

const logoutHandler=()=>{
  dispatch(logout());
  alert.success("Logged Out Successfully");
};

  return (
  <nav className="navbar row sticky-top">
    {/* logo  */}
    <div className='col-12 col-md-3'>
      {/* when we click on logo then open home page-/ */}
      <Link to="/">
        <img src="/images/logo.webp" alt="logo" className="logo" />
        </Link>
    </div>
    {/* search bar and search icon */}
    <div className="col-12 col-md-6 mt-2 mt-md-6">
      <Search></Search>
    </div>
{/* cart button */}
    <div className="col-12 col-md-3 mt-4 mt-md-0">
      <Link to={"/cart"} style={{textDecoration: "none"}}>
      <span className="ml-3" id="cart">
      Cart
    </span>
    {/* count for cart */}
    <span className="ml-1" id="cart_count">
      {cartItems.length}
      {/* in header card length show only a different new fooditem not quantity */}
    </span>
      
      </Link>
    

{/* conditional statement for account profile */}
    {
      user ?  ( //we have user here
        <>
        <div className="ml-4 dropdown d-inline">
          <Link
           to="/" className='btn dropdown-toggle text-white mr-4' type='button' id='dropDownMenuButton' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
           >
        
        <figure className="avatar avatar-nav">
        <img src={user.avatar.url} alt="avatar" className="rounded-circle"/>
        </figure>

        <span >
          {user && user.name}
        </span>
          </Link>
{/* aria to apply global css */}
          <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
            <Link className="dropdown-item" to="/eats/orders/me/myOrders">Orders</Link>

            <Link className="dropdown-item" to="/users/me">Profile</Link>

            <Link className="dropdown-item" to="/"  onClick={logoutHandler}>Logout</Link> 
            {/* when u click it should log out handler */}
          </div>
        </div>
        </>
      ): (
        !loading && (
          <Link to="/users/login" className='btn ml-4' id='login_btn'>
          Login
          </Link>
        )
      )
    }


    </div>
  </nav>
  );
}
// anchor open new page reloading whole page
// link open only , not losse state management as only compo change nav and footer remain same