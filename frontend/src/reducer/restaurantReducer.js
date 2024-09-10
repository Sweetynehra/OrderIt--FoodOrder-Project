import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant";

const initialState ={
    restaurants: [],//state
    // for data to come it is empty
}


export const restaurantReducer =(state= initialState, action) =>{
//switch case

    switch (action.type) {
        case ALL_RESTAURANTS_REQUEST:
            return {
                ...state,//spread empty state
                loading: true,//load new data
                error: null,
            }
        case ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,//spread empty state
                loading: false,//data updated
                count: action.payload.count,//send data to store , payload have data
                restaurants: action.payload.restaurants,
            }
        case ALL_RESTAURANTS_FAIL:
            return {
                    ...state,//initial state
                    loading: false,//data updated
                    error: action.payload,
            }
        case SORT_BY_RATINGS:
            return {
                        ...state,//all restaurants data come 
                        restaurants: [...state.restaurants].sort((a,b)=> b.ratings - a.ratings
                    ),//sort ratings, arr to spread all restro , higher come first
            }
        case SORT_BY_REVIEWS:
            return {
                        ...state,//all restaurants data come 
                        restaurants: [...state.restaurants].sort((a,b)=> b.numOfReviews - a.numOfReviews
                    ),//sort ratings, arr to spread all restro , higher come first
            }
        case TOGGLE_VEG_ONLY://change the pureveg button into show all button
            return {
                            ...state,//all restaurants data come 
                            showVegOnly: !state.showVegOnly,//false in first, middleware
                            pureVegRestaurantsCount: calculatePureVegCount(
                                state.restaurants,
                                !state.showVegOnly
                            ),//cal the pure veg cnt in this and toggle           
            }
            //toggle button and change the resstro count acc to btn u press
            case CLEAR_ERROR:
                return {
                            ...state,//intial state
                            error: null,//as wee remove the all error
                }
        default:
            return state;
    }
}
//hold the store , state
//action.type from dispatch and func

//acting as middleware for show all and pure veg btn
const calculatePureVegCount= (restaurants, showVegOnly) =>{
    if(!showVegOnly) {
        return restaurants.length;//total len
    }else{
        return restaurants.filter((restaurant)=> restaurant.isVeg).length;
    }//only show veg cnt of restro
}