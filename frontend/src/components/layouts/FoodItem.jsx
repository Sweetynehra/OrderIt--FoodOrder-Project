import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartQuantity,
} from "../../actions/cartAction";
import { useAlert } from "react-alert";

export default function FoodItem({ fooditem, restaurant }) {
  const [quantity, setQuantity] = useState(1);
  const [showButtons, setShowButtons] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth); //pass var together with same name to reduce var like user2 ...auth is key val pair
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  //not destruc as taking cartitems
  const cartItems = useSelector((state) => state.cart.cartItems);

  //how to handle data
  useEffect(() => {
    const cartItem = cartItems.find(
      (item) => item.foodItem._id === fooditem._id
    );
    //foodItem._id - come from cart item in db
    //fooditem._id - come from menu at present

    if (cartItem) {
      setQuantity(cartItem.quantity);
      setShowButtons(true); // + - to show
    } else {
      setQuantity(1);
      setShowButtons(false); //default
    }
  }, [cartItems, fooditem]); //variables

  //how dispatch data
  const increaseQty = () => {
    if (quantity < fooditem.stock) {
      //less than stock
      const newQuantity = quantity + 1;
      setQuantity(newQuantity); //set new quant
      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    } else {
      alert.error("Exceed stock limit");
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      //greater than 1 then able to delete
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    } else {
      //qnty ==1 or neg, remove item from cart
      setQuantity(0); //quanty =0
      setShowButtons(false); //button not show
      dispatch(removeItemFromCart(fooditem._id)); //remove taht particular type item from cart or delete item
    }
  };
  //to add the item into cart and toggle of add to cart btn and + - btns
  const addToCartHandler = () => {
    if (!isAuthenticated && !user) {
      //user not logged in so first direct to login page
      return navigate("/users/login");
    }

    if (fooditem && fooditem._id) {
      dispatch(addItemToCart(fooditem._id, restaurant, quantity, alert));
      setShowButtons(true);
    } else {
      console.error("Food item id is not defined");
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          src={fooditem.images[0].url}
          alt={fooditem.name}
          className="card-img-top mx-auto"
        />
        {/* Heading and description */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{fooditem.name}</h5>
          <p className="fooditem_des">{fooditem.description}</p>
          <p className="card-text">
            <LiaRupeeSignSolid />
            {fooditem.price}
            <br />
          </p>

          {!showButtons ? (
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              disabled={fooditem.stock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          ) : (
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>
                -
              </span>
              {/* input tag */}
              <input
                type="number"
                className="form-control count d-inline"
                value={quantity}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={increaseQty}>
                +
              </span>
            </div>
          )}
          <br />
          <p>
            Status:{" "}
            <span
              id="stock-status"
              className={fooditem.stock ? "greenColor" : "redColor"}
            >
              {fooditem.stock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
