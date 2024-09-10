import React, { useEffect } from 'react'
import FoodItem from "./FoodItem";
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from "../../actions/menuAction";
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

export default function Menu() {
const dispatch = useDispatch();
const {id} =useParams();//to get id all dynamic parameter as obj and destructure
//to get data we use useSelector
const {menus, loading, error}= useSelector((state) => state.menus);
//to get data we give id as menuAction take ids and extract from app route
  useEffect(() => {
    dispatch(getMenus(id));
  }, [dispatch, id]);

  return (
    <div>
     {loading ?( <Loader/>
     ): error ? (
     <Message variant="danger">{error}</Message>
    ): menus && menus.length > 0 ?  (
      menus.map((menu) =>(
      <div key={menu._id}>
        <h2>{menu.category}</h2>
        <hr />
        {/* to dipslay food item */}
        {menu.items && menu.items.length > 0? (
          <div className="row">
            {menu.items.map((fooditem)=>(
              <FoodItem
               key={fooditem._id} 
               fooditem={fooditem}
                restaurant={id}/>
                //key differ food, fooditem data, restro id
            ))}
          </div>
        ) : (
          <Message variant="info">No Fooditem Found</Message>
        )}
      </div>
     ))
    ): (
      <Message variant="info">No Menus Found</Message>
     )}
    </div>
  );
}
