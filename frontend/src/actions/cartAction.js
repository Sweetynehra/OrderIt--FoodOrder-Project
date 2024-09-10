import axios from "axios"
import { ADD_TO_CART, FETCH_CART, REMOVE_ITEM_CART, UPDATE_CART_ITEM } from "../constants/cartConstant";



export const fetchCartItems = (alert)=> async(dispatch) =>{
    try{
        const response = await axios.get("/api/v1/eats/cart/get-cart");
        dispatch({
            type:FETCH_CART,
            payload: response.data.data,
        })
    }catch(error){
        console.error("Fetch cart error :", error)
        if(alert){
            alert.info("Cart is hungry")
        }
    }
}
//add to cart 
export const addItemToCart =
 (foodItemId, restaurant, quantity, alert)=> async(dispatch, getState) =>{
try {
    //curr state of tree last val returned by store
    const {user} = getState().auth //to get user logged in or not , return currnt store , when user logged in then only add item to cart for authoriztn
    const response = await axios.post("/api/v1/eats/cart/add-to-cart", {//post obj userid to send to api
        userId: user._id,//ur account to store cart items
        foodItemId,
        restaurantId: restaurant,
        quantity,
    })
    alert.success("Item added to cart", response.data.cart);
    dispatch({
        type: ADD_TO_CART,
        payload: response.data.cart,
    })
} catch (error) {  
    alert.error(error.response? error.response.data.message : error.message)
}
};



//Update cart Item quantity 
export const updateCartQuantity = (foodItemId, quantity, alert)=> async(dispatch, getState)=>{
    try {
        const {user} = getState().auth //to get user logged in or not , return currnt store 

 if(typeof foodItemId === "object"){
    foodItemId = foodItemId._id//converting obj to id
 }

    const response = await axios.post("/api/v1/eats/cart/update-cart-item", {
        userId: user._id,
        foodItemId: foodItemId,
        quantity,
    })

    dispatch({
        type: UPDATE_CART_ITEM,
        payload: response.data.cart,
    })
    } catch (error) {  
        alert.error(error.response? error.response.data.message : error.message)
    }
}

//Remove items from cart remove from mongo db
export const removeItemFromCart = (foodItemId, getState)=> async(dispatch, getState)=>{
    try {
        const {user} = getState().auth //to get user logged in or not , return currnt store 

 if(typeof foodItemId === "object"){
    foodItemId = foodItemId._id
 }

    const response = await axios.delete("/api/v1/eats/cart/delete-cart-item", {
       data: {userId: user._id, foodItemId},
    })

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: response.data,
    })
    } catch (error) {  
        alert.error(error.response? error.response.data.message : error.message)
    }
}
