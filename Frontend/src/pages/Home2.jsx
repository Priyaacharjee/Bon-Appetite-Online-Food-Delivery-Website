import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, Element } from "react-scroll";
import { MdOutlineLogout, MdAccountCircle } from "react-icons/md";
import { CgLogIn } from "react-icons/cg";
import { FaBagShopping } from "react-icons/fa6";
import { LuUtensilsCrossed } from "react-icons/lu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import {
  logout,
  findUser,
  fetchCompanyDetails,
  fetchAllFoods,
  addToCart,
} from "../utils/utils";
import Loader from "../Components/Loader";

const Home2 = () => {
  const [companyName, setcompanyName] = useState();
  const [companyEmail, setcompanyEmail] = useState();
  const [companyPhone, setcompanyPhone] = useState();
  const [companyFB, setcompanyFB] = useState();
  const [companyInsta, setcompanyInsta] = useState();
  const [loader, setLoader] = useState(false);

  const [foods, setfoods] = useState([]);

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

  // Card Slider(For xl)----------------------
  const sliderSettings_xl = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:
      Array.isArray(foods) &&
      foods.filter((card) => card.setAsTodaysOffer).length < 5
        ? foods.filter((card) => card.setAsTodaysOffer).length
        : 5,
    slidesToScroll:
      Array.isArray(foods) &&
      foods.filter((card) => card.setAsTodaysOffer).length < 5
        ? foods.filter((card) => card.setAsTodaysOffer).length
        : 5,
  };
  // Card Slider(For lg)----------------------
  const sliderSettings_lg = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  // Card Slider(For md)----------------------
  const sliderSettings_md = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  // Card Slider(For sm)----------------------
  const sliderSettings_sm = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const [account, setAccount] = useState("My Account");
  // Logout API
  const handleLogout = async () => {
    logout().then((response) => {
      if (response === "Logout successfully") {
        setTimeout(() => {
          setLoader(false);
          setAccount("My Account");
        }, 2000);
      } else {
        setLoader(false);
      }
    });
  };

  const myAccount = async () => {
    if (account !== "My Account") {
      navigate("/My_account");
    } else {
      setoops(true);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const response = await addToCart(id);
      alert(response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const [loading, setLoading] = useState(true);

  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    // Fetch company details
    fetchCompanyDetails().then((company) => {
      setcompanyName(company.name.toUpperCase());
      setcompanyEmail(company.email);
      setcompanyPhone(company.phone);
      setcompanyFB(company.fbLink);
      setcompanyInsta(company.instaLink);
    });

    // Fetch all food
    fetchAllFoods().then((response) => {
      setfoods(response);
    });
  }, [handleAddToCart]);

  useEffect(() => {
    // Find user
    findUser().then((user) => {
      if (user.username) {
        setAccount(user.username.split(" ")[0]);
        const cartIds = user.cart ? user.cart.map((item) => item._id) : [];
        setUserCart(cartIds);
      } else {
        setAccount("My Account");
      }
      setLoading(false);
    });
  }, []);

  const [oops, setoops] = useState(false);

  if (oops) {
    return (
      <>
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              paddingTop: "3rem",
              paddingRight: "5rem",
              cursor: "pointer",
              fontSize: "24px",
            }}
          >
            <LuUtensilsCrossed
              onClick={() => {
                setoops(false);
              }}
            />
          </div>
          <div style={{ paddingTop: "8rem" }}>
            <img src="/Image/oops.jpg"></img>
          </div>
          <div style={{ paddingTop: "2rem" }}>
            <h4>You Need to first Login!</h4>
          </div>
        </div>
      </>
    );
  }

  if (loading || foods.length === 0) {
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
        <div className="Home2_loader"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid m-0 p-0" style={{ width: "100%" }}>
      <div className="row">
        {/* Navbar----------------------------------------- */}
        <div className="col-12 m-0 p-0">
          <Navbar expand="lg" className="bg-body-tertiary header m-0 p-0">
            <div className="col-12 m-0 p-0" style={{ display: "flex" }}>
              {/*Logo & Name------------------ */}
              <div
                className="col-xl-3 col-lg-4 col-md-4 ml-0 col-sm-6 col-xs-11 logo m-0 p-0"
                style={{ display: "flex" }}
              >
                <div className="col-1"></div>
                <div className="col-lg-2 col-md-1 col-sm-1 col-xs-1">
                  <h4>
                    <i
                      className="fa-solid fa-burger"
                      style={{ paddingTop: "10px" }}
                    ></i>
                  </h4>
                </div>
                <div
                  className="col-xl-8 col-lg-2 col-md-11 col-sm-11 col-xs-11"
                  style={{
                    alignItems: "center",
                    paddingTop: "2%",
                    fontFamily: "brittany",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <h4>{companyName}</h4>
                </div>
                <div className="col-5"></div>
              </div>
              {/* Menu------------------------------------------------ */}
              <div
                className="col-xl-4 col-lg-6 m-0 pt-2 d-none d-xl-block"
                style={{ paddingTop: "10px" }}
              >
                <div className="col-3 header_menu" onClick={refreshMenu}>
                  Home
                </div>
                <div className="col-3 header_menu">
                  <Link to="section" spy={true} smooth={true} duration={500}>
                    About&nbsp;Us
                  </Link>
                </div>
                <div className="col-3 header_menu">
                  <Link to="section" spy={true} smooth={true} duration={500}>
                    Contact&nbsp;Us
                  </Link>
                </div>
                <div className="col-3 header_menu">
                  <Link to="section" spy={true} smooth={true} duration={500}>
                    Offers
                  </Link>
                </div>
              </div>
              <div className="col-xl-5 col-lg-7 col-md-7 col-sm-5 col-xs-4 pt-2 d-none d-sm-block">
                <div
                  className="col-lg-3 col-md-4 col-sm-6 m-0 p-0 m-0 d-none d-sm-block"
                  style={{ float: "left" }}
                >
                  <FaCartArrowDown
                    className="header_menu"
                    style={{ height: "25px", width: "25px" }}
                  />
                  <span
                    className="header_menu"
                    onClick={() => {
                      if (account !== "My Account") {
                        navigate("/My_cart");
                      } else {
                        setoops(true);
                      }
                    }}
                  >
                    &nbsp;&nbsp;My&nbsp;Cart
                  </span>
                </div>
                <div
                  className="col-lg-3 col-md-4 m-0 p-0 d-none d-sm-none d-md-block"
                  style={{ float: "left" }}
                >
                  <FaBagShopping
                    className="header_menu"
                    style={{ height: "22px", width: "22px" }}
                  />
                  <span
                    className="header_menu"
                    onClick={() => {
                      if (account !== "My Account") {
                        navigate("/My_order");
                      } else {
                        setoops(true);
                      }
                    }}
                  >
                    &nbsp;&nbsp;My&nbsp;Orders
                  </span>
                </div>
                <div
                  className="col-lg-3 col-md-3 m-0 p-0 d-sm-none  d-md-none d-none d-lg-block"
                  style={{ float: "left" }}
                >
                  <MdAccountCircle
                    className="header_menu"
                    style={{ height: "25px", width: "25px" }}
                    onClick={myAccount}
                  />
                  <span className="header_menu" onClick={myAccount}>
                    &nbsp;&nbsp;{account}
                  </span>
                </div>
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-2 m-0 p-0"
                  style={{ float: "left" }}
                >
                  {account !== "My Account" ? (
                    <>
                      <MdOutlineLogout
                        className="header_menu"
                        style={{ height: "25px", width: "25px" }}
                      />
                      <span
                        className="header_menu"
                        onClick={() => {
                          setLoader(true);
                          handleLogout();
                        }}
                      >
                        &nbsp;&nbsp;Log&nbsp;out
                      </span>
                    </>
                  ) : (
                    <>
                      <NavLink to={"/Login"}>
                        <CgLogIn
                          className="header_menu"
                          style={{ height: "25px", width: "25px" }}
                        />
                        <span className="header_menu">
                          &nbsp;&nbsp;Log&nbsp;in
                        </span>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>

              {/*Hamburger Menu--------------------------------------- */}
              <div
                className="col-lg-1 col-md-1 col-sm-1 col-xs-1 d-block d-xl-none"
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
        </div>
      </div>
      {/* Serach For------------------------------------------------------------------ */}
      <div className="row m-0 p-0 pb-4 home2_background_image">
        <div className="col-12 p-0 m-0">
          <div
            className="col-12 p-0 justify-content-center"
            style={{ marginTop: "7%", display: "flex" }}
          >
            <div className="home2_search col-lg-3 col-md-3 col-sm-4 col-xs-2 mr-5 p-0">
              <button
                className="btn btn-success home2_search_button"
                style={{}}
              >
                <NavLink className="home2_search_nav" to={"/Restaurent"}>
                  Search For Resturants
                </NavLink>
              </button>
            </div>
            <div className="home2_search col-lg-3 col-md-3 col-sm-4 col-xs-2 m-0 p-0">
              <button className="btn btn-success home2_search_button">
                <NavLink className="home2_search_nav" to={"/Menu"}>
                  Search For Food
                </NavLink>
              </button>
            </div>
          </div>

          <div className="col-12 m-0 p-0" style={{ display: "flex" }}>
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-1 "></div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-11 best">
              <h3>
                <b>Best Picks for Today</b>
              </h3>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-3 col-xs-1 "></div>
          </div>

          {/* Card Slider(For xl Screen)-------------------------------------------- */}
          <div className="col-lg-12 pt-1 pl-5 pr-5 d-none d-xl-block">
            <Slider {...sliderSettings_xl}>
              {Array.isArray(foods) &&
                foods
                  .filter((card) => card.setAsTodaysOffer)
                  .map((card) => {
                    return (
                      <div key={card._id} className="pt-0 p-3">
                        <div className="card m-2">
                          <div
                            className="m-0 p-0"
                            style={{
                              height: "280px",
                              color: "black",
                              borderRadius: "0.75rem",
                            }}
                          >
                            <div
                              className="justify-center items-center"
                              style={{
                                borderTopLeftRadius: "0.75rem",
                                borderTopRightRadius: "0.75rem",
                                backgroundColor: "indigo",
                                height: "130px",
                              }}
                            >
                              <img
                                src={`foodItemsPictures/${card.image}`}
                                style={{
                                  borderTopLeftRadius: "0.20rem",
                                  borderTopRightRadius: "0.20rem",
                                  height: "100%",
                                  width: "100%",
                                  margin: "auto",
                                }}
                              ></img>
                            </div>

                            <div
                              className="flex flex-col justify-center items-center m-0 p-0"
                              style={{ height: "30%" }}
                            >
                              <h5 className="mt-1">{card.restaurent}</h5>
                              <h6 className="mt-1">{card.name}</h6>
                              <span>Price: {card.price}/-</span>
                            </div>
                            <div className="pt-3">
                              <button
                                className="btn-xs btn-warning"
                                onClick={() => {
                                  if (userCart.includes(card._id)) {
                                    navigate("/My_cart");
                                  } else {
                                    handleAddToCart(card._id);
                                  }
                                }}
                              >
                                {userCart.includes(card._id)
                                  ? "Go to Cart"
                                  : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </Slider>
          </div>

          {/* Card Slider(For lg Screen)-------------------------------------------- */}
          <div className="col-lg-12 pt-1 pl-5 pr-5 d-none d-lg-block d-xl-none">
            <Slider {...sliderSettings_lg}>
              {Array.isArray(foods) &&
                foods.map((card) => {
                  if (card.setAsTodaysOffer)
                    return (
                      <>
                        <div key={card.id} className="pt-0 p-3">
                          <div className="card m-2">
                            <div
                              className="m-0 p-0"
                              style={{
                                height: "280px",
                                color: "black",
                                borderRadius: "0.75rem",
                              }}
                            >
                              <div
                                className="justify-center items-center"
                                style={{
                                  borderTopLeftRadius: "0.75rem",
                                  borderTopRightRadius: "0.75rem",
                                  backgroundColor: "indigo",
                                  height: "130px",
                                }}
                              >
                                <img
                                  src={`foodItemsPictures/${card.image}`}
                                  style={{
                                    borderTopLeftRadius: "0.20rem",
                                    borderTopRightRadius: "0.20rem",
                                    height: "100%",
                                    width: "100%",
                                    margin: "auto",
                                  }}
                                ></img>
                              </div>

                              <div
                                className="flex flex-col justify-center items-center m-0 p-0"
                                style={{ height: "30%" }}
                              >
                                <h5 className="mt-1">{card.restaurent}</h5>
                                <h6 className="mt-1">{card.name}</h6>
                                <span>Price: {card.price}/-</span>
                              </div>
                              <div className="pt-3">
                                <button
                                  className="btn-xs btn-warning"
                                  onClick={() => {
                                    if (userCart.includes(card._id)) {
                                      navigate("/My_cart");
                                    } else {
                                      handleAddToCart(card._id);
                                    }
                                  }}
                                >
                                  {userCart.includes(card._id)
                                    ? "Go to Cart"
                                    : "Add to Cart"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                })}
            </Slider>
          </div>

          {/* Card Slider(For md Screen)--------------------------------------------  */}
          <div className="col-lg-12 pt-1 pl-5 pr-5 d-none d-md-block d-lg-none">
            <Slider {...sliderSettings_md}>
              {Array.isArray(foods) &&
                foods.map((card) => {
                  if (card.setAsTodaysOffer)
                    return (
                      <>
                        <div key={card.id} className="pt-0 p-3">
                          <div className="card m-2">
                            <div
                              className="m-0 p-0"
                              style={{
                                height: "280px",
                                color: "black",
                                borderRadius: "0.75rem",
                              }}
                            >
                              <div
                                className="justify-center items-center"
                                style={{
                                  borderTopLeftRadius: "0.75rem",
                                  borderTopRightRadius: "0.75rem",
                                  backgroundColor: "indigo",
                                  height: "130px",
                                }}
                              >
                                <img
                                  src={card.img}
                                  alt=""
                                  style={{
                                    borderTopLeftRadius: "0.20rem",
                                    borderTopRightRadius: "0.20rem",
                                    height: "100%",
                                    width: "100%",
                                    margin: "auto",
                                  }}
                                ></img>
                              </div>

                              <div
                                className="flex flex-col justify-center items-center m-0 p-0"
                                style={{ height: "30%" }}
                              >
                                <h5 className="mt-1">{card.res}</h5>
                                <h6 className="mt-1">{card.name}</h6>
                                <span>Price: {card.price}/-</span>
                              </div>
                              <div className="pt-3">
                                <button
                                  className="btn-xs btn-warning"
                                  onClick={() => {
                                    if (userCart.includes(card._id)) {
                                      navigate("/My_cart");
                                    } else {
                                      handleAddToCart(card._id);
                                    }
                                  }}
                                >
                                  {userCart.includes(card._id)
                                    ? "Go to Cart"
                                    : "Add to Cart"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                })}
            </Slider>
          </div>

          {/* Card Slider(For sm Screen)--------------------------------------------  */}
          <div className="col-lg-12 pt-1 pl-5 pr-5  d-sm-block d-md-none">
            <Slider {...sliderSettings_sm}>
              {Array.isArray(foods) &&
                foods.map((card) => {
                  if (card.setAsTodaysOffer)
                    return (
                      <>
                        <div key={card.id} className="pt-0 p-3">
                          <div className="card m-2">
                            <div
                              className="m-0 p-0"
                              style={{
                                height: "280px",
                                color: "black",
                                borderRadius: "0.75rem",
                              }}
                            >
                              <div
                                className="justify-center items-center"
                                style={{
                                  borderTopLeftRadius: "0.75rem",
                                  borderTopRightRadius: "0.75rem",
                                  backgroundColor: "indigo",
                                  height: "130px",
                                }}
                              >
                                <img
                                  src={card.img}
                                  alt=""
                                  style={{
                                    borderTopLeftRadius: "0.20rem",
                                    borderTopRightRadius: "0.20rem",
                                    height: "100%",
                                    width: "100%",
                                    margin: "auto",
                                  }}
                                ></img>
                              </div>

                              <div
                                className="flex flex-col justify-center items-center m-0 p-0"
                                style={{ height: "30%" }}
                              >
                                <h5 className="mt-1">{card.res}</h5>
                                <h6 className="mt-1">{card.name}</h6>
                                <span>Price: {card.price}/-</span>
                              </div>
                              <div className="pt-3">
                                <button
                                  className="btn-xs btn-warning"
                                  onClick={() => {
                                    if (userCart.includes(card._id)) {
                                      navigate("/My_cart");
                                    } else {
                                      handleAddToCart(card._id);
                                    }
                                  }}
                                >
                                  {userCart.includes(card._id)
                                    ? "Go to Cart"
                                    : "Add to Cart"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                })}
            </Slider>
          </div>
        </div>
      </div>

      {/*Footer----------------------------------------------------------------------------------------------------------------------------------*/}
      <Element name="section" className="element">
        <Footer
          phone={companyPhone}
          email={companyEmail}
          fbLink={companyFB}
          instaLink={companyInsta}
        />
      </Element>

      {loader && (
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
    </div>
  );
};

export default Home2;