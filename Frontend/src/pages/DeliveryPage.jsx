import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  fetchDeliveryBoy,
  fetchCompanyDetails,
  logout,
  deliverySuccessfull,
} from "../utils/utils";
import axios from "axios";

function DeliveryPage() {
  const navigate = useNavigate();

  const [deliveryBoy, setdeliveryBoy] = useState();
  const [loading, setLoading] = useState(true);

  const [companyName, setcompanyName] = useState();

  const [allOrders, setallOrders] = useState([]);
  const [otp, setotp] = useState();

  // Logout API
  const handleLogout = async () => {
    setLoading(true);
    try {
      if ((await logout()) === "Logout successfully") {
        navigate("/Login");
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const handleDeliverySuccessfull = async (otp, id) => {
    deliverySuccessfull(otp, id);
  };

  useEffect(() => {
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
    });

    fetchDeliveryBoy().then((response) => {
      setdeliveryBoy(response);
      setallOrders(response.deliveryOrder);
      setLoading(false);
    });
  }, [handleDeliverySuccessfull]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div class="DeliveryBoy_loader"></div>
      </div>
    );
  }

  let s = 1;

  return (
    <>
      {/* Navbar------------------------------------------------------------------------------------------- */}
      <div className="row">
        <Navbar
          expand="lg"
          className="bg-body-tertiary header col-12"
          style={{ display: "flex" }}
        >
          <div
            className="col-lg-10 col-md-9 col-sm-9 col-9 m-0 p-0 logo m-0 p-0"
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
            className="col-lg-2 col-md-3 col-sm-3 col-3 m-0 p-0"
            style={{ float: "left" }}
          >
            <MdOutlineLogout
              className="header_menu"
              style={{ height: "22px", width: "22px" }}
              onClick={handleLogout}
            />
            <span className="header_menu" onClick={handleLogout}>
              &nbsp;&nbsp;Log&nbsp;Out
            </span>
          </div>
        </Navbar>
      </div>
      <div className="my_cart_background m-0 p-0">
        <h3>Hi! {deliveryBoy.username}</h3>
        <div className="row" style={{ padding: "40px 20px 20px 20px" }}>
          <div
            className="col-11"
            style={{ paddingBottom: "20px", paddingTop: "20px" }}
          >
            <table className="col-11">
              <tr className="col-12 Order_table">
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Serial No
                </th>
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Order Items
                </th>
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Restaurant Name
                </th>
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Quantity
                </th>
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Price
                </th>
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Payment Status
                </th>
                <th
                  className="col-2 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Address
                </th>
                <th
                  className="col-1 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Contact User
                </th>
              </tr>
              {Array.isArray(allOrders)
                ? allOrders.map((elem) => (
                    <>
                      <tr className="col-12 pl-1 pr-1">
                        <td className="pl-1 pr-1">{s++}</td>
                        <td className="col-1 pl-1 pr-1">
                          <table style={{ textAlign: "center" }}>
                            {[
                              ...new Set(elem.foodId.map((item) => item.name)),
                            ].map((name) => (
                              <tr>{name}</tr>
                            ))}
                          </table>
                        </td>
                        <td className="pl-1 pr-1">
                          <table>
                            {[
                              ...new Set(
                                elem.foodId.map((item) => item.restaurent)
                              ),
                            ].map((restaurent) => (
                              <tr>{restaurent}</tr>
                            ))}
                          </table>
                        </td>
                        <td className="pl-1 pr-1">
                          <table>
                            {Object.entries(
                              elem.foodId.reduce((acc, item) => {
                                acc[item._id] = (acc[item._id] || 0) + 1;
                                return acc;
                              }, {})
                            ).map(([id, count]) => (
                              <tr>{count}</tr>
                            ))}
                          </table>
                        </td>
                        <td className="pl-1 pr-1">
                          <table>
                            {Object.entries(
                              elem.foodId.reduce((acc, item) => {
                                acc[item._id] = {
                                  count:
                                    (acc[item._id] ? acc[item._id].count : 0) +
                                    1,
                                  price: item.price,
                                };
                                return acc;
                              }, {})
                            ).map(([id, { count, price }]) => (
                              <tr>{count * price}</tr>
                            ))}
                          </table>
                        </td>
                        <td className="pl-1 pr-1">{elem.paymentStatus}</td>
                        <td className="pl-1 pr-1">{elem.orderAddress}</td>
                        <td className="pl-1 pr-1">
                          <table>
                            <tr>{elem.userId.username}</tr>
                            <tr>{elem.userId.contact}</tr>
                          </table>
                        </td>
                        <td className="col-1">
                          <button
                            className="btn btn-success"
                            style={{ color: "white", fontWeight: "bolder" }}
                            data-toggle="modal"
                            data-target={`#exampleModal-${elem._id}`}
                          >
                            ✓
                          </button>
                        </td>
                      </tr>

                      <div
                        class="modal fade"
                        id={`exampleModal-${elem._id}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-body">
                              <h4>Enter OTP</h4>
                              <input
                                type="number"
                                placeholder="Enter OTP"
                                style={{
                                  marginTop: "2rem",
                                  width: "90%",
                                  borderRadius: "5px",
                                  border: "1px solid black",
                                  height: "2.5rem",
                                  paddingLeft: "1rem",
                                }}
                                onChange={(e) => {
                                  setotp(e.target.value);
                                }}
                              ></input>
                            </div>
                            <div class="modal-footer">
                              <button
                                style={{ width: "6rem" }}
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                  handleDeliverySuccessfull(otp, elem._id);
                                }}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : null}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryPage;
