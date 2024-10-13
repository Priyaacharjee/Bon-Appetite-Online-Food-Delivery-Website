// *Update_Category*
import React, { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi2";
import { deleteCategory, updateCategory } from "../utils/utils";
import DeleteButton from "./DeleteButton";

const Update_Category = ({ serial, name, image, id }) => {
  const [display, setdisplay] = useState("block");

  const [clicked_update, setClicked_update] = useState(false);

  const [updatedCategoryName, setupdatedCategoryName] = useState();
  const [updatedCategoryImage, setupdatedCategoryImage] = useState();

  const handleClick_update = async () => {
    setClicked_update(!clicked_update);

    const maxSizeInKB = 70;
    if (
      updatedCategoryImage &&
      updatedCategoryImage.size > maxSizeInKB * 1024
    ) {
      alert(`File size should be less than ${maxSizeInKB} KB.`);
      return;
    }
    let imageData = null;
    if (updatedCategoryImage) {
      imageData = await setFileToBase(updatedCategoryImage);
    }

    updateCategory(id, imageData, updatedCategoryName).then((response) => {
      alert(response);
    });
  };

  const setFileToBase = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  useEffect(() => {
    setdisplay("block");
  }, [id]);

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
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {serial}
        </div>
        <div
          className="col-4"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {name}
        </div>
        <div
          className="col-4"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={image} style={{ height: "100%", width: "30%" }}></img>
        </div>
        <div
          className="col-2"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            height: "4rem",
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
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            deleteCategory(id).then((response) => {
              alert(response);
              setdisplay("none");
            });
          }}
        >
          <DeleteButton style={{ cursor: "pointer" }} />
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
                placeholder="Enter New Category Name..."
                onChange={(e) => {
                  setupdatedCategoryName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <form class="form">
                <span class="form-title">Upload New Category Image</span>
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
                      setupdatedCategoryImage(e.target.files[0]);
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
                onClick={handleClick_update}
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

export default Update_Category;