import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineLogout } from "react-icons/md";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { logout, findUser, fetchCompanyDetails } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";

const My_account = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [updateButtonClick, setupdateButtonClick] = useState(false);

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");

  const [newname, setnewname] = useState(name);
  const [newphone, setnewphone] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newaddress, setnewaddress] = useState("");
  const [profilePicture, SetprofilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = () => {
    findUser().then((user) => {
      setname(user.username);
      setemail(user.email);
      setphone(user.contact);
      setaddress(user.address);
      if (user.image) SetprofilePicture(user.image.url);
      setLoader(false);
    });
  };

  const update_username = () => {
    setupdateButtonClick(true);
  };
  const handleSubmit = async () => {
    setupdateButtonClick(false);
    setLoading(true);
    try {
      let response = await axios.put(
        "http://localhost:8000/users/updateuser",
        {
          username: newname || name,
          contact: newphone || phone,
          email: newemail || email,
          address: newaddress || address,
        },
        { withCredentials: true }
      );
      fetchUser();
      alert(response.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout API
  const handleLogout = async () => {
    setLoading(true);
    try {
      if ((await logout()) === "Logout successfully") {
        setTimeout(() => {
          setLoading(false);
          navigate("/Home2");
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const fileInputRef = useRef(null);

 
  // Upload profile image
  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please Upload an Image");
      return;
    }
    const maxSizeInKB = 70;
    if (file.size > maxSizeInKB * 1024) {
      alert(`File size should be less than ${maxSizeInKB} KB.`);
      return;
    }

    const imageData = await setFileToBase(file);

    try {
      const response = await axios.post(
        "http://localhost:8000/users/uploadprofilepicture",
        { image: imageData },
        {
          withCredentials: true,
        }
      );
      alert(response.data);
      fetchUser();
    } catch (err) {
      console.log(err.message);
    }
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

  const [companyName, setcompanyName] = useState();

  useEffect(() => {
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
    });

    fetchUser();
  }, []);

  if (loader) {
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
        <div class="myAccount_loader"></div>
      </div>
    );
  }

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
      <div className="col-12 my_cart_background m-0 p-0">
        <div className="col-12 m-0 p-0 pt-5" style={{ display: "flex" }}>
          <div
            className="col-12 col-sm-12 col-md-10 col-lg-7"
            style={{ display: "flex", marginLeft: "10%" }}
          >
            <div
              className="col-2"
              style={{
                height: "5rem",
                alignItems: "center",
                display: "flex",
              }}
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  style={{
                    height: "70px",
                    width: "70px",
                    cursor: "pointer",
                    borderRadius: "50px",
                  }}
                ></img>
              ) : (
                <MdAccountCircle
                  title="Upload new Profile Image"
                  style={{ height: "70px", width: "70px", cursor: "pointer" }}
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileImage}
                accept="image/*"
              />
            </div>
            <h2
              className="col-11 col-md-11 col-sm-11"
              style={{
                display: "flex",
                justifyContent: "left",
                height: "5rem",
                alignItems: "center",
                marginLeft: "-3rem",
              }}
            >
              <strong>Hi!</strong>&nbsp; {name}
            </h2>
          </div>
        </div>
        <div
          className="col-12 ml-0 pl-0 mt-5 col-md-10 col-lg-12 pb-0"
          style={{ display: "flex" }}
        >
          <div className="col-1 col-lg-0"></div>
          <div className="col-10 col-lg-5 m-0 p-0 my_account_info pt-5 pb-5">
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-3 pt-2">
                <h5>Name: </h5>
              </div>
              <div
                className="col-8 pt-2"
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
              >
                {name}
              </div>
            </div>
            <div className="col-12 pt-3" style={{ display: "flex" }}>
              <div className="col-3 pt-2">
                <h5>Phone: </h5>
              </div>
              <div
                className="col-8 pt-2"
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
              >
                {phone}
              </div>
            </div>
            <div className="col-12 pt-3" style={{ display: "flex" }}>
              <div className="col-3 pt-2">
                <h5>Email: </h5>
              </div>
              <div
                className="col-8 pt-2"
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
              >
                {email}
              </div>
            </div>
            <div className="col-12 pt-3" style={{ display: "flex" }}>
              <div className="col-3 pt-2">
                <h5>Address: </h5>
              </div>
              <div
                className="col-8 pt-2"
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  maxHeight: "15vh",
                  paddingBottom: "1rem",
                }}
              >
                {address}
              </div>
            </div>
            <div style={{ marginTop: "5%" }}>
              <b>Update Details</b>{" "}
              <PiPencilSimpleLineBold
                onClick={update_username}
                className="pencil"
                style={{ height: "25px", width: "25px" }}
              />
            </div>
          </div>
          {updateButtonClick ? (
            <div className="col-lg-5 update mt-0 pt-5 mt-0 pb-3 d-none d-sm-none d-md-none d-lg-block d-xl-block">
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4 pl-0 pt-0">
                  <h5>Enter Username: </h5>
                </div>
                <input
                  className="col-8 pt-0"
                  placeholder="Enter New Username..."
                  style={{
                    borderStyle: "solid",
                    borderRadius: "5px",
                    height: "50px",
                  }}
                  onChange={(e) => setnewname(e.target.value)}
                ></input>
              </div>
              <div className="col-12 pt-3" style={{ display: "flex" }}>
                <div className="col-4 pl-0 pt-0">
                  <h5>Enter Phone no: </h5>
                </div>
                <input
                  className="col-8 pt-0"
                  placeholder="Enter New Phone no..."
                  style={{
                    borderStyle: "solid",
                    borderRadius: "5px",
                    height: "50px",
                  }}
                  onChange={(e) => setnewphone(e.target.value)}
                ></input>
              </div>
              <div className="col-12 pt-3" style={{ display: "flex" }}>
                <div className="col-4 pl-0 pt-0">
                  <h5>Enter Email Id: </h5>
                </div>
                <input
                  className="col-8 pt-0"
                  placeholder="Enter New Email Id..."
                  style={{
                    borderStyle: "solid",
                    borderRadius: "5px",
                    height: "50px",
                  }}
                  onChange={(e) => setnewemail(e.target.value)}
                ></input>
              </div>
              <div className="col-12 pt-3" style={{ display: "flex" }}>
                <div className="col-4 pl-0 pt-0">
                  <h5>Enter Address: </h5>
                </div>
                <input
                  className="col-8 pt-0"
                  placeholder="Enter New Address..."
                  style={{
                    borderStyle: "solid",
                    borderRadius: "5px",
                    height: "50px",
                  }}
                  onChange={(e) => setnewaddress(e.target.value)}
                ></input>
              </div>
              <button
                className="btn btn-success"
                style={{ marginLeft: "70%", marginTop: "6%" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          ) : null}
        </div>
        {updateButtonClick ? (
          <div
            className="col-10 col-md-9 mt-5 update col-4 pt-5 pb-3 d-lg-none d-xl-none d-block d-sm-block"
            style={{ marginLeft: "8%" }}
          >
            <div className="col-12 pl-0" style={{ display: "flex" }}>
              <div className="col-4 pl-0 pt-2">
                <h5>Enter Username: </h5>
              </div>
              <input
                className="col-8 pt-0"
                placeholder="Enter New Username..."
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
                value={name}
                onChange={(e) => setnewname(e.target.value)}
              ></input>
            </div>
            <div className="col-12 pt-3 pl-0" style={{ display: "flex" }}>
              <div className="col-4 pl-0 pt-2">
                <h5>Enter Phone no: </h5>
              </div>
              <input
                className="col-8 pt-0"
                placeholder="Enter New Phone no..."
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
                value={phone}
                onChange={(e) => setnewphone(e.target.value)}
              ></input>
            </div>
            <div className="col-12 pt-3 pl-0" style={{ display: "flex" }}>
              <div className="col-4 pl-0 pt-2">
                <h5>Enter Email Id: </h5>
              </div>
              <input
                className="col-8 pt-0"
                placeholder="Enter New Email Id..."
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
                value={email}
                onChange={(e) => setnewemail(e.target.value)}
              ></input>
            </div>
            <div className="col-12 pt-3 pl-0" style={{ display: "flex" }}>
              <div className="col-4 pl-0 pt-2">
                <h5>Enter Address: </h5>
              </div>
              <input
                className="col-8 pt-0"
                placeholder="Enter New Address..."
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  height: "50px",
                }}
                value={address}
                onChange={(e) => setnewaddress(e.target.value)}
              ></input>
            </div>
            <button
              className="btn btn-success"
              style={{ marginLeft: "70%", marginTop: "6%" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        ) : null}
      </div>

      {loading && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          ></div>
          <Loader />
        </>
      )}
    </>
  );
};
export default My_account;
