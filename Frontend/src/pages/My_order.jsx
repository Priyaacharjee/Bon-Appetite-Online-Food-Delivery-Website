// My_order.jsx
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import {
  fetchCompanyDetails,
  cancelSingleOrder,
  findUser,
} from "../utils/utils";

const My_order = () => {
  const [companyName, setcompanyName] = useState();

  const [loading, setLoading] = useState(true);

  const [orders, setorders] = useState([]);
  const [cancledOrders, setcancledOrders] = useState([]);
  const [delivereddOrders, setdelivereddOrders] = useState([]);

  const handleCancelOrder = (id) => {
    cancelSingleOrder(id).then((response) => {
      alert(response);
    });
  };

  useEffect(() => {
    // Fetch company details
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
    });

    findUser().then((response) => {
      setorders(response.orders);
      setcancledOrders(response.cancledOrders);
      setdelivereddOrders(response.deliveredOrders);
      setLoading(false);
    });
  }, [handleCancelOrder]);

  let s1 = 1,
    s2 = 1,
    s3 = 1;
  if (loading) {
    return (
      <>
        <div className="myOrder_loader">
          <div className="myOrder_truckWrapper">
            <div className="myOrder_truckBody">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 198 93"
                className="myOrder_trucksvg"
              >
                <path
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#F83D3D"
                  d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                />
                <path
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#7D7C7C"
                  d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                />
                <path
                  strokeWidth="2"
                  stroke="#282828"
                  fill="#282828"
                  d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                />
                <rect
                  strokeWidth="2"
                  stroke="#282828"
                  fill="#FFFCAB"
                  rx="1"
                  height="7"
                  width="5"
                  y="63"
                  x="187"
                />
                <rect
                  strokeWidth="2"
                  stroke="#282828"
                  fill="#282828"
                  rx="1"
                  height="11"
                  width="4"
                  y="81"
                  x="193"
                />
                <rect
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#DFDFDF"
                  rx="2.5"
                  height="90"
                  width="121"
                  y="1.5"
                  x="6.5"
                />
                <rect
                  strokeWidth="2"
                  stroke="#282828"
                  fill="#DFDFDF"
                  rx="2"
                  height="4"
                  width="6"
                  y="84"
                  x="1"
                />
              </svg>
            </div>
            <div className="myOrder_truckTires">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 30"
                className="myOrder_tiresvg"
              >
                <circle
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#282828"
                  r="13.5"
                  cy="15"
                  cx="15"
                />
                <circle fill="#DFDFDF" r="7" cy="15" cx="15" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 30"
                className="myOrder_tiresvg"
              >
                <circle
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#282828"
                  r="13.5"
                  cy="15"
                  cx="15"
                />
                <circle fill="#DFDFDF" r="7" cy="15" cx="15" />
              </svg>
            </div>
            <div className="myOrder_road"></div>

            <svg
              xmlSpace="preserve"
              viewBox="0 0 453.459 453.459"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              version="1.1"
              fill="#000000"
              className="myOrder_lampPost"
            >
              <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0zM232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z" />
            </svg>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* Navbar-------------------------------------------------------------------------------- */}
      <div className="row">
        <Navbar expand="lg" className="bg-body-tertiary header">
          <div
            className="col-lg-12 m-0 p-0 logo m-0 p-0"
            style={{ display: "flex" }}
          >
            <div className="col-lg-2 col-md-2 col-sm-1 col-xs-1">
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
        </Navbar>
      </div>

      {/* Main Content---------------------------------------------------------------------------- */}
      <div className="my_cart_background m-0 p-0">
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
                  Time
                </th>
                <th
                  className="col-2 pt-2 pb-2"
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
                  OTP
                </th>
                <th
                  className="col-2 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Contact our delivery agent
                </th>
                <th
                  className="col-2 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Expected Delivery Time
                </th>
              </tr>
              {Array.isArray(orders)
                ? orders.map((elem) => (
                    <>
                      <tr className="col-12 pl-1 pr-1">
                        <td className="pl-1 pr-1">{s1++}</td>
                        <td className="pl-1 pr-1">{elem.time}</td>
                        <td className="pl-1 pr-1">
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
                        <td className="pl-1 pr-1">{elem.orderAddress}</td>
                        <td className="pl-1 pr-1">{elem.OTP}</td>
                        <td className="pl-1 pr-1">
                          <table>
                            <tr>{elem.deliveryBoy.username? elem.deliveryBoy.username: ""}</tr>
                            <tr>{elem.deliveryBoy.contact}</tr>
                          </table>
                        </td>
                        <td className="pl-1 pr-1">
                          <table>
                            <tr>{elem.expectedDeliveryTime}</tr>
                          </table>
                        </td>
                        <td className="col-2">
                          <button
                            className="btn-sm btn-warning mt-1"
                            data-toggle="modal"
                            data-target={`#exampleModal-${elem._id}`}
                          >
                            Cancel Order
                          </button>
                        </td>
                      </tr>
                      {/* Modal------------------------------------------------------------- */}
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
                              Are you sure you want to cancel the order?{" "}
                              {[
                                ...new Set(
                                  elem.foodId.map((item) => item.name)
                                ),
                              ].map((name) => (
                                <li>{name}</li>
                              ))}
                            </div>
                            <div class="modal-footer">
                              <button
                                style={{ width: "6rem" }}
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                  handleCancelOrder(elem._id);
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

            <div
              style={{
                marginTop: "5rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "2rem",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              Cancled Orders
            </div>

            {/* Show cancled orders */}
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
                  Time
                </th>
                <th
                  className="col-2 pt-2 pb-2"
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
                  className="col-2 pt-2 pb-2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  Address
                </th>
              </tr>
              {Array.isArray(orders)
                ? cancledOrders.map((elem) => (
                    <>
                      <tr className="col-12 pl-1 pr-1">
                        <td className="pl-1 pr-1">{s2++}</td>
                        <td className="pl-1 pr-1">{elem.time}</td>
                        <td className="pl-1 pr-1">
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
                        <td className="pl-1 pr-1">{elem.orderAddress}</td>
                      </tr>
                      {/* Modal------------------------------------------------------------- */}
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
                              Are you sure you want to cancel the order?{" "}
                              {[
                                ...new Set(
                                  elem.foodId.map((item) => item.name)
                                ),
                              ].map((name) => (
                                <li>{name}</li>
                              ))}
                            </div>
                            <div class="modal-footer">
                              <button
                                style={{ width: "6rem" }}
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                  handleCancelOrder(elem._id);
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

            <div
              style={{
                marginTop: "5rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "2rem",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              Delivered Orders
            </div>

            {/* Show delivered orders */}
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
                  Time
                </th>
                <th
                  className="col-2 pt-2 pb-2"
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
                  Payment Status
                </th>
              </tr>
              {Array.isArray(orders)
                ? delivereddOrders.map((elem) => (
                    <>
                      <tr className="col-12 pl-1 pr-1">
                        <td className="pl-1 pr-1">{s3++}</td>
                        <td className="pl-1 pr-1">{elem.time}</td>
                        <td className="pl-1 pr-1">
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
                        <td className="pl-1 pr-1">{elem.orderAddress}</td>
                        <td className="pl-1 pr-1">{elem.paymentStatus}</td>
                      </tr>
                      {/* Modal------------------------------------------------------------- */}
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
                              Are you sure you want to cancel the order?{" "}
                              {[
                                ...new Set(
                                  elem.foodId.map((item) => item.name)
                                ),
                              ].map((name) => (
                                <li>{name}</li>
                              ))}
                            </div>
                            <div class="modal-footer">
                              <button
                                style={{ width: "6rem" }}
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                  handleCancelOrder(elem._id);
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
};

export default My_order;