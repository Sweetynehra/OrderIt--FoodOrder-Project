//create a store to store the all data
import {
  legacy_createStore as createStore,
  combineReducers, //more reducers restaurants, fooditem, cart to combined
  applyMiddleware, //do extra in action btw action and reducer
  compose, //to read the func , inc readibility
} from "redux";
//legacy_createStore as createStore func of arr

import thunk from "redux-thunk"; //pkg helps to run data fetching, delayed work
import { restaurantReducer } from "./reducer/restaurantReducer";
import { menuReducer } from "./reducer/menuReducer";
import {
  authReducer,
  forgotPasswordReducer,
  userReducer,
} from "./reducer/userReducer";

import { cartReducer } from "./reducer/cartReducer";
import { myOrderReducer, newOrderReducer, orderDetailsReducer } from "./reducer/orderReducer";

//combine all reducers
const reducer = combineReducers({
  restaurants: restaurantReducer,
  menus: menuReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder : newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer
});

//to apply multiple store enhancer in row
//middleware+ devtools
const composeenhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//to connect with dev tools

const middleware = [thunk];

//create store
const store = createStore(
  reducer,
  composeenhancers(applyMiddleware(...middleware))
);

export default store;
