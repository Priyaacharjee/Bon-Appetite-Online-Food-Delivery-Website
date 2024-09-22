// My_cart.jsx
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { FaBagShopping } from "react-icons/fa6";
import NavLink from "react-bootstrap/esm/NavLink";
import {
  addToCartIncreaseQuantity,
  deleteCartItem,
  fetchCompanyDetails,
  findUser,
  deleteCartItemDecreaseQuantity,
  createOrder,
} from "../utils/utils";

const My_cart = () => {
  const [modal, setModal] = useState(false);

  const handleOrderNow = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    const time = new Date(Date.now()).toString().substring(0, 24);
    createOrder({ userCart, totalAmount, time }).then((response) => {
      alert(response);
    });
  };

  const [companyName, setcompanyName] = useState();
  const [userCart, setuserCart] = useState([]);
  const [uniqueCart, setUniqueCart] = useState([]);

  const [userAddress, setuserAddress] = useState();

  const [loading, setLoading] = useState(true);

  const [totalAmount, settotalAmount] = useState(0);

  const getQuantity = (itemId) => {
    return userCart.filter((item) => item._id === itemId).length;
  };

  const handledeleteCartItem = (id) => {
    deleteCartItem(id);
  };

  const handleQuantityIncrease = (id) => {
    addToCartIncreaseQuantity(id);
  };

  const handleQuantityDecrease = (id) => {
    deleteCartItemDecreaseQuantity(id);
  };

  useEffect(() => {
    // Fetch company details
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
    });

    findUser().then((user) => {
      setuserCart(user.cart);
      setuserAddress(user.address);

      const total = userCart.reduce((sum, item) => sum + item.price, 0);
      settotalAmount(total);

      const uniqueItems = Array.from(
        new Map(user.cart.map((item) => [item._id, item])).values()
      );
      setUniqueCart(uniqueItems);
      // console.log(user.cart)
      setLoading(false);
    });
  }, [handledeleteCartItem]);

  var s = 1;
  if (loading) {
    return (
      <>
        <div class="myCart_loader">
          <div class="myCart_panWrapper">
            <div class="myCart_pan">
              <div class="myCart_food"></div>
              <div class="myCart_panBase"></div>
              <div class="myCart_panHandle"></div>
            </div>
            <div class="myCart_panShadow"></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* Navbar */}
      <div className="row">
        <Navbar
          expand="lg"
          className="bg-body-tertiary header col-12"
          style={{ display: "flex" }}
        >
          <div
            className="col-lg-10 col-md-9 col-sm-9 col-8 m-0 p-0 logo m-0 p-0"
            style={{ display: "flex" }}
          >
            <div className="col-lg-2 col-md-2 col-sm-1 col-xs-8">
              <h4>
                <i
                  className="fa-solid fa-burger"
                  style={{ paddingTop: "10px" }}
                ></i>
              </h4>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-5 col-xs-5"
              style={{ paddingTop: "0.5%", fontFamily: "brittany" }}
            >
              <h4>{companyName}</h4>
            </div>
            <div className="col-lg-7 col-md-4"></div>
          </div>
          <div
            className="col-lg-2 col-md-3 col-sm-3 col-4 m-0 p-0"
            style={{ float: "left" }}
          >
            <NavLink to href={"/My_order"} style={{ paddingTop: "0px" }}>
              <FaBagShopping
                className="header_menu"
                style={{ height: "22px", width: "22px" }}
              />
              <span className="header_menu">&nbsp;&nbsp;My&nbsp;Orders</span>
            </NavLink>
          </div>
        </Navbar>
      </div>

      {/* Cart Section */}
      <div className="my_cart_background m-0 p-0 ">
        <div className="row" style={{ padding: "40px 20px 20px 20px" }}>
          <div
            className="col-9"
            style={{ paddingBottom: "20px", paddingTop: "20px" }}
          >
            <table className="col-12 ">
              <tbody>
                <tr className="col-12 cart_table">
                  <th
                    className="col-1 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Serial No
                  </th>
                  <th
                    className="col-2 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Image
                  </th>
                  <th
                    className="col-4 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Item Name
                  </th>
                  <th
                    className="col-3 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Restaurant Name
                  </th>
                  <th
                    className="col-1 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    className="col-1 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Price
                  </th>
                  <th
                    className="col-1 pt-2 pb-2"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      borderStyle: "solid",
                      borderColor: "black",
                    }}
                  >
                    Delete
                  </th>
                </tr>
                {uniqueCart.map((elem) => {
                  const { _id, image, name, restaurent, price } = elem;
                  const itemQuantity = getQuantity(_id);
                  return (
                    <tr>
                      <td className="col-1">{s++}</td>
                      <td className="col-2">
                        <img
                          src={`/foodItemsPictures/${image}`}
                          style={{ height: "45px", width: "70px" }}
                        ></img>
                      </td>
                      <td className="col-3">{name}</td>
                      <td className="col-3">{restaurent}</td>
                      <td className="col-2">
                        <button
                          className="btn btn-xxs btn-warning"
                          style={{ fontWeight: "bolder", fontSize: "1rem" }}
                          onClick={() => {
                            handleQuantityDecrease(_id);
                          }}
                        >
                          -
                        </button>
                        &nbsp;&nbsp;{itemQuantity}&nbsp;&nbsp;
                        <button
                          className="btn btn-xxs btn-warning"
                          style={{ fontWeight: "bolder", fontSize: "1rem" }}
                          onClick={() => {
                            handleQuantityIncrease(_id);
                          }}
                        >
                          +
                        </button>
                      </td>
                      <td className="col-1">{price * itemQuantity}</td>
                      <td className="col-1">
                        <button
                          className="btn-sm btn-danger mt-2 mb-2 ml-4"
                          style={{ height: "35px" }}
                          onClick={() => {
                            handledeleteCartItem(_id);
                          }}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-9 "></div>
        <div
          className="col-11 d-flex"
          style={{ gap: "13%", paddingLeft: "5rem" }}
        >
          <div
            className="col-3 m-0 p-0"
            style={{
              marginLeft: "10rem",
              height: "3.3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              className="col-6 m-0 p-0 btn btn-success"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h5 style={{ margin: 0, fontSize: "1.5rem" }}>
                Total : {totalAmount}
              </h5>
            </button>
          </div>
          <button
            className="btn btn-success pl-5 pr-5 pt-3 pb-2 ml-5"
            style={{
              marginLeft: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleOrderNow}
            data-toggle="modal"
            data-target="#orderModal"
          >
            <h5 style={{ fontSize: "1.3rem" }}>Order Now</h5>
          </button>
        </div>
      </div>

      {/* Order Now Modal */}
      {modal && (
        <div
          className={`modal fade show`}
          id="orderModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!modal}
          style={{ display: modal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Order Info
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body d-flex">
                <div className="col-5">
                  <div>
                    <b>Food Item</b>
                  </div>
                  <br />
                  {uniqueCart.map((item) => (
                    <div>{item.name}</div>
                  ))}
                </div>
                <div className="col-2">
                  <div>
                    <b>Quantity</b>
                  </div>
                  <br />
                  {uniqueCart.map((elem) => {
                    const { _id } = elem;
                    const itemQuantity = getQuantity(_id);
                    return <div key={_id}>{itemQuantity}</div>;
                  })}
                </div>
                <div className="col-3">
                  <div>
                    <b>Restaurant</b>
                  </div>
                  <br />
                  {uniqueCart.map((elem) => {
                    const { _id, restaurent } = elem;
                    return <div key={_id}>{restaurent}</div>;
                  })}
                </div>
                <div className="col-2">
                  <div>
                    <b>Price</b>
                  </div>
                  <br />
                  {uniqueCart.map((elem) => {
                    const { _id, price } = elem;
                    const itemQuantity = getQuantity(_id);
                    return <div key={_id}>{price * itemQuantity}</div>;
                  })}
                </div>
              </div>
              <div>
                <h6>Total Price: {totalAmount}</h6>
              </div>
              <div className="pt-1">
                <h6>
                  <strong>Delivery Address: </strong>
                  {userAddress}
                </h6>
              </div>
              <div style={{ color: "red" }}>
                Want to change the delivery address?
              </div>
              <span>
                Change it from <strong>"My Account"</strong>
              </span>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default My_cart;