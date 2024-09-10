import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant";
import axios from "axios";

//func to get all restro
const getRestaurants = ()=>{
    //dispatch to give order
return async(dispatch) =>{
    try{
        dispatch({type: ALL_RESTAURANTS_REQUEST});
    let link = `/api/v1/eats/stores`;
    //hold restro data
    const {data} = await axios.get(link);
    console.log(data);
    const {restaurants , count} = data;
    // destructure
    //that u get the data
    dispatch({
        type: ALL_RESTAURANTS_SUCCESS,
        payload:{restaurants , count},//data to send to store using reducer
    })
    }catch (err) {
        dispatch({
            type: ALL_RESTAURANTS_FAIL,
            payload:err.response.data.message,
        })
    }
}
}

export default getRestaurants

export const sortByRatings = () => {
    return {
        type: SORT_BY_RATINGS,
    }
}

export const sortByReviews = () => {
    //no interaction with so just sort so give type only
    return {
        type: SORT_BY_REVIEWS,
    }
}

export const toggleVegOnly = () => {
    return {
        type: TOGGLE_VEG_ONLY,
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERROR,
    }
}
// async to take the data from outside source -backend folder other one and axios
// ALL_RESTAURANTS_REQUEST val read
// disptach to take order give cmd verbal communicatn
//api to fetch data -- api documentation postman
// https://localhost:4000/api/v1/eats/stores
// dispatch send obj payload is db to