import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import {
  loginUser,
  loginAdmin,
  fetchCompanyDetails,
  loginDeliveryBoy,
} from "../utils/utils";

const Login = () => {
  const [companyName, setcompanyName] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    // Login API
    loginUser(email, password).then((userResponse) => {
      if (userResponse === "Login successfully") {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/Home2");
        }, 3000);
      } else {
        loginAdmin(email, password).then((adminResponse) => {
          if (adminResponse === "Login successfully") {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigate("/Admin");
            }, 3000);
          } else {
            loginDeliveryBoy(email, password).then((deliveryBoyResponse) => {
              if (deliveryBoyResponse === "Login successfully") {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  navigate("/DeliveryBoy");
                }, 3000);
              } else {
                alert(deliveryBoyResponse);
              }
            });
          }
        });
      }
    });
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
        {/* Navbar */}
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
        <div className="row">
          <div className="col-12 m-0 p-0 LoginPage">
            <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-xs-12">
              <form className="col-7 pl-0 pr-0" style={{ width: "90%" }}>
                <h1 className="login_heading">
                  <b>Login</b>
                </h1>
                <div
                  className="col-12"
                  style={{
                    paddingLeft: "8%",
                    paddingBottom: "10%",
                    paddingTop: "5%",
                  }}
                >
                  <input
                    className="login_input"
                    placeholder="Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  {error && email.length === 0 ? (
                    <label style={{ color: "red" }}>Email is Required!</label>
                  ) : null}
                  <input
                    className="login_input"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  {error && password.length === 0 ? (
                    <label style={{ color: "red" }}>
                      Password is Required!
                    </label>
                  ) : null}
                </div>
                <input
                  type="submit"
                  className="login_button"
                  onClick={handleSubmit}
                />
              </form>
            </div>
            <div className="col-xl-5 col-lg-4 col-md-3 col-sm-4 col-xs-1 m-0 p-0 d-none d-sm-none d-md-block"></div>
          </div>
        </div>
      </div>

      {/* Dimming background and loader */}
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

export default Login;
