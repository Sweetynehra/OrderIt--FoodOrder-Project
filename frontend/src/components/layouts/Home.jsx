import React, { useEffect } from 'react'
import CountRestaurant from "./CountRestaurant";
import Restaurant from "./Restaurant";
import { useDispatch, useSelector } from 'react-redux';
import getRestaurants, { sortByRatings, sortByReviews, toggleVegOnly } from "../../actions/restaurantAction";
// import restaurants from ".";
import Loader from "./Loader";
import Message from "./Message";

export default function Home() {

 const dispatch = useDispatch();//give commd to store data
const{
  loading:restaurantsLoading,
   error: restaurantError,
   restaurants,
   showVegOnly,//mutated btw veg and all btn, if true then 1 restro show
}= useSelector((state)=> state.restaurants);
//extract data from store

 useEffect(()=>{
  dispatch(getRestaurants())
 }, [dispatch]);

 //onclick func
 const handleSortByReview = ()=>{
  dispatch(sortByReviews());
 }
const handleSortByRatings = () =>{
  dispatch(sortByRatings());
}
const handleToogleVegOnly = () =>{
  dispatch(toggleVegOnly());
}

  return (
    <div>
      <CountRestaurant></CountRestaurant>
      {restaurantsLoading ? (
        <Loader/> 
      ) : restaurantError ?(
      <Message variant="danger">{restaurantError}</Message>
      ) : (
        <>
        {/* compo to render  */}
        <section>
        <div className="sort">
            <button className="sort_veg p-3" onClick={handleToogleVegOnly} >
              {/* showvegonly true show all btn shows  */}
              {showVegOnly? "Show All" : "Pure Veg"}</button>
            <button className="sort_rev p-3" onClick={handleSortByReview}>Sort By Review</button>
            <button className="sort_rate p-3" onClick={handleSortByRatings}>Sort By Rating</button>
        </div>
        <div className="row mt-4">
          {/* to show differ len or cnt */}
            {restaurants 
            ? ( restaurants.map(
              (restaurant)=>
                // to show restro
              !showVegOnly || (showVegOnly && restaurant.isVeg)?(
              <Restaurant key={restaurant._id}  restaurant={restaurant}></Restaurant>
              // one restro as all come key here for unique each restro
            ): null
          )
        ) : (
          <Message variant="info">No Restaurant Found</Message>
        )}
            {/* map func use if we have data */}
        </div>
      </section>
      </>
      )}
     
    </div>
  )
}
//trigger and dispatch our first action