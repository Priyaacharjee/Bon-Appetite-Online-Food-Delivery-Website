// Update_Food.jsx
import React, { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi2";
import {
  deleteFoodItem,
  updateFoodItem,
  fetchAllCategory,
  fetchAllRestaurent,
  setAsTodaysOffer,
} from "../utils/utils";
import DeleteButton from "./DeleteButton";

const Update_Food = ({
  id,
  serial,
  name,
  category,
  image,
  price,
  restaurent,
  quantity,
  setAsTodaysOfferStatus,
}) => {
  const [clicked_update, setClicked_update] = useState(false);

  const [updatedItemName, setupdatedItemName] = useState();
  const [updatedItemQuantity, setupdatedItemQuantity] = useState();
  const [updatedItemPrice, setupdatedItemPrice] = useState();
  const [updatedItemRestaurent, setupdatedItemRestaurent] = useState();
  const [updatedItemCategory, setupdatedItemCategory] = useState();

  const [foodImage, setfoodImage] = useState();
  const [display, setdisplay] = useState("block");

  const handleUpdateFood = () => {
    setClicked_update(!clicked_update);

    const formData = new FormData();

    formData.append("id", id);
    formData.append("image", foodImage);
    formData.append("name", updatedItemName);
    formData.append("price", updatedItemPrice);
    formData.append("category", updatedItemCategory);
    formData.append("quantity", updatedItemQuantity);
    formData.append("restaurent", updatedItemRestaurent);

    updateFoodItem(formData).then((response) => {
      alert(response);
    });
  };
  const [allCategory, setallCategory] = useState([]);
  const [allRestaurent, setallRestaurent] = useState([]);

  const [alreadySetAsTodaysOffer, setalreadySetAsTodaysOffer] = useState(
    setAsTodaysOfferStatus
  );

  useEffect(() => {
    fetchAllCategory().then((response) => {
      setallCategory(response);
    });

    fetchAllRestaurent().then((response) => {
      setallRestaurent(response);
    });
  }, []);

  useEffect(() => {
    setdisplay("block");
  }, [setAsTodaysOffer]);

  return (
    <div style={{ display: `${display}` }}>
      <div
        className="col-12 m-0 p-0 d-flex pt-1 pb-1"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {serial}
        </div>
        <div
          className="col-2"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {name}
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "100%", width: "70%" }}
            src={`/foodItemsPictures/${image}`}
          ></img>
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {category}
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {price}
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {quantity === "undefined" ? "" : quantity}
        </div>
        <div
          className="col-2"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {restaurent}
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HiPencil
            style={{ cursor: "pointer" }}
            onClick={() => {
              setClicked_update(!clicked_update);
            }}
          />
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeleteButton
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              deleteFoodItem(id).then((response) => {
                alert(response);
                setdisplay("none");
              });
            }}
          />
        </div>
        <div
          className="col-1"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!alreadySetAsTodaysOffer && (
            <div
              className="btn btn-success"
              style={{
                fontSize: "1.5rem",
                width: "2.8rem",
                height: "2.8rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "10px",
              }}
              onClick={(e) => {
                setAsTodaysOffer(id);
                setalreadySetAsTodaysOffer(true);
              }}
            >
              <strong>+</strong>
            </div>
          )}
        </div>
      </div>

      {clicked_update ? (
        <div className="pb-4">
          <div class="pb-2 pt-2">
            <h5 class="modal-title">Change the Details of '{name}'</h5>
          </div>
          <div
            class=" col-5 m-auto"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            }}
          >
            <div className="pt-2">
              <input
                className="mt-3 form-control"
                type="text"
                placeholder="Enter Food Name..."
                onChange={(e) => {
                  setupdatedItemName(e.target.value);
                }}
              ></input>
            </div>
            <div className="pt-2">
              <input
                className="mt-3 form-control"
                type="number"
                placeholder="Enter Price..."
                onChange={(e) => {
                  setupdatedItemPrice(e.target.value);
                }}
              ></input>
            </div>
            <div className="pt-2">
              <input
                className="mt-3 form-control"
                type="text"
                placeholder="Enter Quantity..."
                onChange={(e) => {
                  setupdatedItemQuantity(e.target.value);
                }}
              ></input>
            </div>
            <div className="d-flex mt-3 p-0">
              <select
                className="form-select ml-1"
                style={{
                  width: "35rem",
                  height: "2.2rem",
                  borderRadius: "4px",
                }}
                onChange={(e) => {
                  setupdatedItemCategory(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select Item Category...
                </option>
                {allCategory.map((option) => (
                  <option value={option.value}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="d-flex mt-3 p-0">
              <select
                className="form-select ml-1"
                style={{
                  width: "35rem",
                  height: "2.2rem",
                  borderRadius: "4px",
                }}
                onChange={(e) => {
                  setupdatedItemRestaurent(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select Restaurent Name...
                </option>
                {allRestaurent.map((option) => (
                  <option value={option.value}>{option.name}</option>
                ))}
              </select>
            </div>
            <div>
              <form class="form">
                <span class="form-title">Upload Your Food Image</span>
                <p class="form-paragraph">File should be an image</p>
                <label for="file-input" class="drop-container">
                  <span class="drop-title">Drop files here</span>
                  or
                  <input
                    type="file"
                    accept="image/*"
                    required=""
                    id="file-input"
                    onChange={(e) => {
                      if (e) setfoodImage(e.target.files[0]);
                    }}
                  />
                </label>
              </form>
            </div>

            <div className="mt-4 pb-4">
              <button
                style={{ width: "6rem" }}
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={handleUpdateFood}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Update_Food;
