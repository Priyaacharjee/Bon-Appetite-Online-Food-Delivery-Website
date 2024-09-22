import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { fetchCompanyDetails, signUp } from "../utils/utils";

const Sign_up = () => {
  const [companyName, setcompanyName] = useState();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");

  const [usernameerror, setusernameerror] = useState(false);
  const [contacterror, setcontacterror] = useState(false);
  const [emailerror, setemailerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [notsame, setnotsame] = useState(false);
  const [wrongcontact, setwrongcontact] = useState(false);
  const [wrongpasswordlength, setwrongpasswordlength] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    // Username is required-----------------------
    if (username.length == 0) setusernameerror(true);
    else setusernameerror(false);

    // Password is Required!---------------------------
    if (password.length == 0) setpassworderror(true);
    else setpassworderror(false);

    // Contact no. is Required!-------------------------
    if (contact.length == 0) setcontacterror(true);
    else setcontacterror(false);

    // Email is Required!-----------------------------
    if (contact.length == 0) setemailerror(true);
    else setemailerror(false);

    // Password is not same!---------------------------
    if (password != confirm_password) setnotsame(true);
    else setnotsame(false);

    // Wrong Contact no!-------------------------------
    if (contact.length > 0 && contact.length != 10) setwrongcontact(true);
    else setwrongcontact(false);

    // Password should have atleast 6 character!-------------------------
    if (password.length > 0 && password.length < 6)
      setwrongpasswordlength(true);
    else setwrongpasswordlength(false);

    // Sign up API
    if (
      username.length > 0 &&
      password.length >= 6 &&
      password === confirm_password &&
      contact.length == 10 &&
      email.length > 0
    ) {
      signUp(email, password, username, contact).then((response) => {
        if (response !== "User created successfully") {
          alert(response);
        } else {
          setLoading(true);
          
          setTimeout(() => {
            setLoading(false);
            navigate("/Home2");
          }, 3000);
        }
      });
    }
  };

  useEffect(() => {
    // Fetch company details
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
    });
  }, []);

  return (
    <>
      <div
        className="c1 container-fluid m-0 p-0"
        style={{ overflow: "hidden" }}
      >
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
              <div className="col-lg-7 col-md-4 col-xs-6"></div>
            </div>
          </Navbar>
        </div>
        <div className="row">
          <div className="col-12 m-0 p-0 LoginPage">
            <div className="col-lg-9 col-md-10 col-sm-12 col-xs-9">
              <form
                className="col-xs-9 col-sm-7 col-xl-5 col-lg-6 pl-0 pr-0"
                style={{ marginTop: "30px" }}
              >
                <h1 className="login_heading">
                  <b>Sign Up</b>
                </h1>
                <div
                  className="col-12"
                  style={{
                    paddingLeft: "8%",
                    paddingBottom: "10%",
                    paddingTop: "5%",
                    paddingBottom: "15px",
                  }}
                >
                  <input
                    className="login_input"
                    name="username"
                    placeholder="Username"
                    type="text"
                    required=""
                    onChange={(e) => setusername(e.target.value)}
                  ></input>
                  {usernameerror && username.length <= 0 ? (
                    <label style={{ color: "red" }}>
                      Username is Required!
                    </label>
                  ) : null}

                  <input
                    className="login_input"
                    name="email"
                    placeholder="Email Id"
                    type="email"
                    required=""
                    onChange={(e) => setemail(e.target.value)}
                  ></input>
                  {emailerror && email.length <= 0 ? (
                    <label style={{ color: "red" }}>Email is Required!</label>
                  ) : null}

                  <input
                    className="login_input"
                    name="contact"
                    placeholder="Contact No."
                    type="text"
                    required=""
                    onChange={(e) => setcontact(e.target.value)}
                  ></input>
                  {contact.length > 0 && contact.length < 10 ? (
                    <label style={{ color: "red" }}>Wrong Contact no!</label>
                  ) : null}
                  {contacterror && contact.length <= 0 ? (
                    <label style={{ color: "red" }}>
                      Contact no. is Required!
                    </label>
                  ) : null}

                  <input
                    className="login_input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required=""
                    onChange={(e) => setpassword(e.target.value)}
                  ></input>
                  {password.length > 0 && password.length < 6 ? (
                    <label style={{ color: "red" }}>
                      Password should have atleast 6 character!
                    </label>
                  ) : null}
                  {passworderror && password.length <= 0 ? (
                    <label style={{ color: "red" }}>
                      Password is Required!
                    </label>
                  ) : (
                    ""
                  )}

                  <input
                    className="login_input"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    type="password"
                    required=""
                    onChange={(e) => setconfirm_password(e.target.value)}
                  ></input>
                  {passworderror && confirm_password.length <= 0 ? (
                    <label style={{ color: "red" }}>
                      Confirm your password!
                    </label>
                  ) : null}
                  {confirm_password.length > 0 &&
                  password != confirm_password ? (
                    <label style={{ color: "red" }}>
                      Password is not same!
                    </label>
                  ) : null}
                </div>
                <button className="login_button" onClick={handleChange}>
                  Submit
                </button>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 d-none d-sm-none d-md-none d-lg-none"></div>
          </div>
        </div>
      </div>

      {/* -------------------------Loader dimming------------------ */}
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

export default Sign_up;
