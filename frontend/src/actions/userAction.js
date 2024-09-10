import axios from "axios";
import { CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../constants/userConstant"
import { CLEAR_CART } from "../constants/cartConstant";




//login 
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type: LOGIN_REQUEST});
        //to send the data for login  send email passw, send the headers 
        const config = {
            // obj
            headers :{
                "Content-Type": "application/json",
            },
        };
        //destruc post on this api send email passw
        const {data} = await axios.post(
            `/api/v1/users/login`, //info of users come here who register 
            {email, password},
            config
        );
        dispatch({//send dat in store then success
            type: LOGIN_SUCCESS,
            payload:data.data.user,
        });
    } catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: "Login Failed",
        });
    }
}

// register
export const register = (userData) => async(dispatch) =>{
    try{
        dispatch({type: REGISTER_USER_REQUEST});
        const config = { // form data here 
            headers: {"Content-Type" : "multipart/form-data"},
        };
        const {data} = await axios.post(`/api/v1/users/signup`, userData, config);//sending userdata with header to signup to update in db
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.data.user,
        });

        return data.data.user;//useful if calling func needs this data, want immediate data so return 

    }catch (error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload:error.response.data.message,
        })
    }
}

// load user action
//match in db and data get from user
export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios.get(`/api/v1/users/me`); //get all users data same time
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}


//UPDATE USER
export const updateProfile = (userData) =>async(dispatch) => {
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST})
        const config ={
            headers: {
                "Content-Type" : "multipart/form-data"
            },
        }

        const {data} = await axios.put(
            '/api/v1/users/me/upadate',
            userData,
            config
        )
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload:data.success});
    }catch(error){
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        })    
}
}




//Logout action
export const logout = () => async(dispatch) =>{
    try{
       await axios.get(`/api/v1/users/logout`);
        dispatch({
            type:LOGOUT_SUCCESS,
        })
        //As after logout it show cart items numb so after logout make cart items number 0 or clear cart
        dispatch({type: CLEAR_CART})
    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.rexponse.data.message,
        });
    }
}

//clear errors 
export const clearErrors = () => async(dispatch) =>{
    dispatch({
            type:CLEAR_ERRORS,
    });
};


//update passw
export const updatePassword=(passwords)=> async(dispatch) =>{
try{
dispatch({type: UPDATE_PASSWORD_REQUEST})
const config = {
    headers: {
        "Content-Type": "application/json"
    }
}
const {data} = await axios.put(
    "/api/v1/users/password/update",
passwords,
config
);
dispatch({
type: UPDATE_PASSWORD_SUCCESS,
payload: data.success,
})
}catch(error){
    dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
        });
}
}


//forgot passw
export const forgotPassword=(email)=> async(dispatch) =>{
    try{
    dispatch({type: FORGOT_PASSWORD_REQUEST})
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const {data} = await axios.post(
        "/api/v1/users/forgetPassword",
    email,
    config
    );
    dispatch({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data.success,
    })
    }catch(error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
            });
    }
    }

//reset passw
    export const resetPassword=(token , passwords)=> async(dispatch) =>{
        try{
        dispatch({type: NEW_PASSWORD_REQUEST})
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.patch(
            `/api/v1/users/resetPassword/${token}`,
        passwords,
        config
        );
        dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: data.success,
        })
        }catch(error){
            dispatch({
                type: NEW_PASSWORD_FAIL,
                payload: error.response.data.message,
                });
        }
        }