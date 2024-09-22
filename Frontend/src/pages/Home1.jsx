// HOME1   PAGE
import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { MdEmail } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaFacebook, FaPhoneAlt, FaInstagramSquare } from "react-icons/fa";
import { Link, Element } from "react-scroll";
import Services from "../Components/Services";
import { NavLink } from "react-router-dom";
import Footer from "../Components/Footer";
import { fetchCompanyDetails } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Home1 = () => {
  const [companyName, setcompanyName] = useState();
  const [companyEmail, setcompanyEmail] = useState();
  const [companyPhone, setcompanyPhone] = useState();
  const [companyFB, setcompanyFB] = useState();
  const [companyInsta, setcompanyInsta] = useState();

  const navigate = useNavigate();

  //Hamburger Menu-------------
  const [isHamburger_MenuOpen, setIsHamburger_MenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsHamburger_MenuOpen(!isHamburger_MenuOpen);
  };

  //Refresh Function-----------
  const refreshMenu = () => {
    window.location.reload();
  };

  //Email Link-----------
  const EmailClick = () => {
    const email = { companyEmail };
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  //Phone Link----------------
  const PhoneClick = () => {
    const phoneNumber = { companyPhone };
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink;
  };

  //Location access Block-----------
  const [isBlockClicked, setIsBlockClicked] = useState(false);
  const handleBlockClick = () => {
    setIsBlockClicked(true);
  };

  useEffect(() => {
    // Fetching company details
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
      setcompanyEmail(company.email);
      setcompanyPhone(company.phone);
      setcompanyFB(company.fbLink);
      setcompanyInsta(company.instaLink);
    });
  }, []);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <Navbar expand="lg" className="bg-body-tertiary header">
          <div className="col-12 m-0 p-0" style={{ display: "flex" }}>
            {/*Logo & Name------------------ */}
            <div
              className="col-lg-3 col-md-5 ml-0 col-sm-11 col-xs-11 logo m-0 p-0"
              style={{ display: "flex" }}
            >
              <div className="col-lg-2 col-md-1 col-sm-1 col-xs-1">
                <h4>
                  <i
                    className="fa-solid fa-burger"
                    style={{ paddingTop: "10px" }}
                  ></i>
                </h4>
              </div>
              <div
                className="col-lg-10 col-md-11 col-sm-8 col-xs-11"
                style={{
                  paddingTop: "1.8%",
                  fontFamily: "brittany",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <h4>{companyName}</h4>
              </div>
            </div>

            {/*Nav Manubar----------------*/}
            <div
              className="col-lg-6 col-md-7 d-none d-md-block m-0"
              style={{ paddingTop: "0.5%" }}
            >
              <div className="header_menu col-4" onClick={refreshMenu}>
                Home
              </div>
              <div className="header_menu col-4">
                <Link to="section" spy={true} smooth={true} duration={500}>
                  About Us
                </Link>
              </div>
              <div className="header_menu col-4">
                <Link to="section" spy={true} smooth={true} duration={500}>
                  Contact Us
                </Link>
              </div>
            </div>

            {/*Nav Contacts & Social Media------------ */}
            <div
              className="col-lg-3 d-none d-lg-block m-0"
              style={{ paddingTop: "0.5%" }}
            >
              <FaPhoneAlt className="icon" onClick={PhoneClick} />
              <MdEmail className="icon" onClick={EmailClick} />
              <a href="https://www.facebook.com/keya.tarafdar.75" target="new">
                <FaFacebook className="icon" />
              </a>
              <a
                href="https://www.instagram.com/keya.tarafdar.75/"
                target="new"
              >
                <FaInstagramSquare className="icon" />
              </a>
            </div>
            {/*Hamburger Menu--------------- */}
            <div
              className="col-sm-1 col-xs-1 d-block d-md-none"
              style={{ paddingTop: "1%" }}
              onClick={toggleMenu}
            >
              {isHamburger_MenuOpen ? (
                <RxCross2 style={{ color: "white" }} />
              ) : (
                <GiHamburgerMenu style={{ color: "white" }} />
              )}
            </div>
          </div>
        </Navbar>

        <div
          className="row"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="col-12">
            {/*Image Sliders-------------------- */}
            <div
              className="col-lg-7 col-sm-12 col-xs-12 p-0 m-0"
              slider
              style={{ float: "left" }}
            >
              <div
                id="carouselExampleSlidesOnly"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      class="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      {isHamburger_MenuOpen && (
                        <div className="drop_down .d-none .d-sm-block .d-md-none">
                          <div className="drop_down_menu" onClick={refreshMenu}>
                            Home
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              About Us
                            </Link>
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              Contact Us
                            </Link>
                          </div>
                        </div>
                      )}
                      {/*Slider-Image 1 */}
                      <img
                        src={"Image/slider4.jpg"}
                        alt="img"
                        style={{ height: "600px", width: "100%" }}
                      ></img>
                    </div>
                    <div className="carousel-item">
                      {isHamburger_MenuOpen && (
                        <div className="drop_down .d-none .d-sm-block .d-md-none">
                          <div className="drop_down_menu" onClick={refreshMenu}>
                            Home
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              About Us
                            </Link>
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              Contact Us
                            </Link>
                          </div>
                        </div>
                      )}
                      {/*Slider-Image 2 */}
                      <img
                        src={"Image/slider7.jpg"}
                        className="d-block w-100"
                        alt="img"
                        style={{ height: "600px", width: "100%" }}
                      ></img>
                    </div>
                    <div className="carousel-item">
                      {isHamburger_MenuOpen && (
                        <div className="drop_down .d-none .d-sm-block .d-md-none">
                          <div className="drop_down_menu" onClick={refreshMenu}>
                            Home
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              About Us
                            </Link>
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              Contact Us
                            </Link>
                          </div>
                        </div>
                      )}
                      {/*Slider-Image 3 */}
                      <img
                        src={"Image/slider3.jpg"}
                        className="d-block w-100"
                        alt="img"
                        style={{ height: "600px", width: "100%" }}
                      ></img>
                    </div>
                    <div className="carousel-item">
                      {isHamburger_MenuOpen && (
                        <div className="drop_down .d-none .d-sm-block .d-md-none">
                          <div className="drop_down_menu" onClick={refreshMenu}>
                            Home
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              About Us
                            </Link>
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              Contact Us
                            </Link>
                          </div>
                        </div>
                      )}
                      {/*Slider-Image 4 */}
                      <img
                        src={"Image/slider1.jpg"}
                        className="d-block w-100"
                        alt="img"
                        style={{ height: "600px", width: "100%" }}
                      ></img>
                    </div>
                    <div className="carousel-item">
                      {isHamburger_MenuOpen && (
                        <div className="drop_down .d-none .d-sm-block .d-md-none">
                          <div className="drop_down_menu" onClick={refreshMenu}>
                            Home
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              About Us
                            </Link>
                          </div>
                          <div className="drop_down_menu">
                            <Link
                              to="section"
                              spy={true}
                              smooth={true}
                              duration={500}
                            >
                              Contact Us
                            </Link>
                          </div>
                        </div>
                      )}
                      {/*Slider-Image 5 */}
                      <img
                        src={"Image/slider5.jpg"}
                        className="d-block w-100"
                        alt="img"
                        style={{ height: "600px", width: "100%" }}
                      ></img>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-target="#carouselExampleIndicators"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-target="#carouselExampleIndicators"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </button>
                </div>
              </div>
            </div>
            {/*Login Div */}
            <div
              className="col-lg-5 col-sm-12 col-xs-12"
              style={{ float: "left", height: "600px", paddingBottom: "2%" }}
            >
              <div className="login">
                <h1
                  style={{
                    fontFamily: "gabriola",
                    paddingTop: "30px",
                    position: "relative",
                    fontSize: "70px",
                  }}
                >
                  <b>
                    Let Us <br></br>Find You!
                  </b>
                </h1>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Choose Your Location...."
                    data-toggle="modal"
                    data-target="#exampleModal"
                    style={{ paddingRight: "100px", marginTop: "70px" }}
                  ></input>
                  {/*Block Error Div--------- */}
                  {isBlockClicked && (
                    <div className="error div">
                      <b>You have blocked us!</b>
                    </div>
                  )}
                </div>
                {/* Modal---------------*/}
                {!isBlockClicked && (
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-body">
                          <h5>Are you allow to access us your location?</h5>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                            onClick={handleBlockClick}
                            disabled={isBlockClicked}
                          >
                            Block
                          </button>
                          <button
                            type="button"
                            class="btn btn-success"
                            data-dismiss="modal"
                          >
                            Allow
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/*Login & Sign Up Button */}
                <div
                  className="col-12"
                  style={{
                    display: "flex",
                    paddingTop: "90px",
                    paddingBottom: "60px",
                  }}
                >
                  <div className="col-6">
                    <button className="btn btn-success">
                      <NavLink to={"/Login"} className="elog">
                        Login
                      </NavLink>
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-success">
                      <NavLink to={"/Sign_up"} className="esignup">
                        Sign Up
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pb-2">
          <h4
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
              fontFamily: "teko",
            }}
          >
            Our Services Provided
          </h4>
        </div>
        <Services />

        {/*Footer------------------------------------------------------- */}
        <Element name="section" className="element">
          <Footer
            phone={companyPhone}
            email={companyEmail}
            fbLink={companyFB}
            instaLink={companyInsta}
          />
        </Element>
      </div>
    </>
  );
};

export default Home1;
