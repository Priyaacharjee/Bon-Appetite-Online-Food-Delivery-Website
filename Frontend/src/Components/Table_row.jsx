import React from "react";
import { useState, useEffect } from "react";
import { confirmOrderDelete } from "../utils/utils";

const Table_row = ({
  serial,
  name,
  phone,
  address,
  time,
  id,
  delivery_sts,
  payment_sts,
  payment_mode,
  payment_id,
  food,
  otp,
  deliveryBoyName,
  deliveryBoyPhone,
  isDeleted,
}) => {
  const [totalAmount, settotalAmount] = useState(0);
  useEffect(() => {
    const total = food.reduce((sum, item) => sum + item.price, 0);
    settotalAmount(total);
  }, []);

  const color = isDeleted ? "red" : "black";
  const display = isDeleted ? "block" : "none";

  const style = {
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
    color: color,
  };

  return (
    <>
      <div
        className="col-12 m-0 p-0 d-flex pt-1 pb-1"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <div className="col-1" style={style}>
          {serial}
        </div>
        <div className="col-1" style={style}>
          {name}
        </div>
        <div className="col-1" style={style}>
          {phone}
        </div>
        <div className="col-3" style={style}>
          {address}
        </div>
        <div className="col-2" style={style}>
          {time}
        </div>
        <div className="col-2" style={style}>
          {id}
        </div>
        <div className="col-1" style={style}>
          {delivery_sts}
        </div>
        <div className="col-2" style={style}>
          {deliveryBoyName}
        </div>
        <div className="col-1" style={style}>
          {deliveryBoyPhone}
        </div>
        <div className="col-1" style={style}>
          {payment_sts}
        </div>
        <div className="col-1" style={style}>
          {payment_mode}
        </div>
        <div className="col-2" style={style}>
          {payment_id}
        </div>
        <div className="col-1" style={style}>
          {otp}
        </div>
        <div className="col-1" style={style}>
          <button
            className="btn-xs btn-success"
            data-toggle="modal"
            data-target={`#exampleModal-${id}`}
          >
            Check
          </button>
        </div>
        <button
          className="btn-xs btn-success"
          style={{ display: display }}
          onClick={() => {
            confirmOrderDelete(id).then((response) => alert(response));
          }}
        >
          Ok
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id={`exampleModal-${id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Order Info
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body d-flex">
              <div className="col-5">
                <div >
                  <b>FoodItem</b>
                </div>
                <br></br>
                <table style={{ textAlign: "center" }}>
                  {[...new Set(food.map((item) => item.name))].map((name) => (
                    <tr>{name}</tr>
                  ))}
                </table>
              </div>
              <div className="col-2">
                <div>
                  <b>Quantity</b>
                </div>
                <br></br>
                <table>
                  {Object.entries(
                    food.reduce((acc, item) => {
                      acc[item._id] = (acc[item._id] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([id, count]) => (
                    <tr>{count}</tr>
                  ))}
                </table>
              </div>
              <div className="col-3">
                <div >
                  <b>Restaurent</b>
                </div>
                <br></br>
                <table>
                  {[...new Set(food.map((item) => item.restaurent))].map(
                    (restaurent) => (
                      <tr>{restaurent}</tr>
                    )
                  )}
                </table>
              </div>
              <div className="col-3">
                <div>
                  <b>Price</b>
                </div>
                <br></br>
                <table>
                  {Object.entries(
                    food.reduce((acc, item) => {
                      acc[item._id] = {
                        count: (acc[item._id] ? acc[item._id].count : 0) + 1,
                        price: item.price,
                      };
                      return acc;
                    }, {})
                  ).map(([id, { count, price }]) => (
                    <tr>{count * price}</tr>
                  ))}
                </table>
              </div>
            </div>
            <div>
            <h6>Total Price: {totalAmount}</h6>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table_row;
