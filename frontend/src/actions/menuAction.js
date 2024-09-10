import { GET_MENU_FAIL, GET_MENU_REQUEST, GET_MENU_SUCCESS } from "../constants/menuConstant"
import axios from "axios";

export const getMenus = (id)=> async(dispatch) =>{
    try{
        dispatch({type: GET_MENU_REQUEST});
        // id for a single restro and show its all menus 
        const response = await axios.get(`/api/v1/eats/stores/${id}/menus`);
        console.log(response.data.data[0].menu);
        //to dispatch data to reducer so success
        dispatch({
            type: GET_MENU_SUCCESS,
            payload: response.data.data[0].menu,

        });
    }catch(error) {
        dispatch({
            type: GET_MENU_FAIL,
            payload: error.message,
        });
    }
}