// *Card.jsx*
import React, { useEffect, useState } from "react";
import { addToCart, findUser } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, image, price, restaurent }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(id);
      alert(response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const user = await findUser();
        const cartIds = user.cart ? user.cart.map((item) => item._id) : [];
        setUserCart(cartIds);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    fetchUserCart();
  }, [handleAddToCart]);

  return (
    <div
      className="col-12 col-md-3 mt-3 float-left"
      style={{ paddingBottom: "3rem" }}
    >
      <div className="card m-2 pb-2">
        <div
          className="m-0 p-0"
          style={{ height: "345px", color: "black", borderRadius: "0.75rem" }}
        >
          <div
            className="justify-center items-center"
            style={{
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              backgroundColor: "indigo",
              height: "50%",
            }}
          >
            <img
              src={`/foodItemsPictures/${image}`}
              alt={name}
              style={{
                borderTopLeftRadius: "0.20rem",
                borderTopRightRadius: "0.20rem",
                height: "100%",
                width: "100%",
                margin: "auto",
              }}
            />
          </div>

          <div
            className="flex flex-col justify-center items-center m-0 p-0"
            style={{ height: "20%" }}
          >
            <h6 className="mt-1">{name}</h6>
            <h6 className="mt-1">{restaurent}</h6>
            <span>Price: {price}/-</span>
          </div>

          <div className="pt-5">
            <button
              className="btn-xs btn-warning"
              onClick={() => {
                if (userCart.includes(id)) {
                  navigate("/My_cart");
                } else {
                  handleAddToCart();
                }
              }}
            >
              {userCart.includes(id) ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;