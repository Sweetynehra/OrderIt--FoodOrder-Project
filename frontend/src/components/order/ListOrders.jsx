import React, { useEffect } from "react";
// import { MDBDataTable } from "mdbreact";
import { FaRegEye } from "react-icons/fa6";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import  getRestaurants  from "../../actions/restaurantAction";
import { MDBDataTable } from "mdbreact";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListOrders = () => {
  const alert = useAlert()
const dispatch = useDispatch()

const {loading, error, orders} = useSelector((state)=> state.myOrders)
const restaurants = useSelector((state)=> state.restaurants)

const restaurantList = Array.isArray(restaurants.restaurants)?//array or not
 restaurants.restaurants :
[];//else empty array

//table
useEffect(()=>{
  dispatch(myOrders())
  dispatch(getRestaurants())

  if(error){
    alert.error(error)
    dispatch(clearErrors())
  }
},[dispatch, alert, error])

//col create table bootstrap, 3rd party mdb
const setOrders= ()=>{
  const data= {
    columns:[
      {
        label: "Restaurant Name",
        field: "restaurant",
        sort: "asc",
      },
      {//one col
        label: "Order Items",
        field: "orderItems",
        sort: "asc",
      },
      {
        label: "Num of Items",
        field: "numOfItems",
        sort: "asc",
      },
      {
        label: "Amount",
        field: "amount",
        sort: "asc",
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
      },
      {
        label: "Order Date",
        field: "orderDate",
        sort: "asc",
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
      },
    ],
    rows: [],
  }
  if(orders && orders.length> 0 && restaurantList.length > 0){
    const sortedOrders = orders.sort(
      (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)//date is method
    )

    sortedOrders.forEach((order)=>{
      const orderItemsNames = order.orderItems
      .map((item)=> item.name)//name will store and separated by ,    map return arr
      .join(",")

      const restaurant = restaurantList.find((restaurant) => restaurant._id.toString() === order.restaurant._id
    )
    data.rows.push({//push elem at last of arr and create a new arr
      restaurant: restaurant?.name || "unknown Restaurant",
      numOfItems: order.orderItems.length,
      amount: (<span>
        <FaRupeeSign />
        {order.finalTotal}
        </span>
      ),
      status: order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
        <p style={{color: "green"}}>{order.orderStatus}</p>
      ): (<p style={{color: "red"}}>{order.orderStatus}</p>),//in processing
      orderItems: orderItemsNames,
      orderDate: new Date(order.createdAt).toLocaleDateString(),//to convert into date
      actions: (//orders with particular id and order
        // <Link to={`/eats/orders/${order._id}`}></Link>
        <Link to={`/eats/orders/${order._id}`}>
              <FaRegEye />
            </Link>

      ),
    })
    })

  }
  return data;
};


  return (
    <>
      <div className="cartt">
        <h1 className="my-5">My Orders</h1>

        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable 
          data={setOrders()} className="px-3" bordered striped hover />
         
        )}
      </div>
    </>
  );
};

export default ListOrders;
