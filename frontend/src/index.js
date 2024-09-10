import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider} from "react-alert"; 
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
{/* <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    /> */}


const options= {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset:"30px",
transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //store attribute and provide to it , to fetch data
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
   
    <App />
  
    </AlertProvider>

  </Provider>
);

//connect store with proj (react -- redux)
//store attri with store func from js- provider by redux
