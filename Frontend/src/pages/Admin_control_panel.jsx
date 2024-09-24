import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaGift } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsEmojiLaughing } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import Navbar from "react-bootstrap/Navbar";
import Table_row from "../Components/Table_row";
import DeletedOrderTableRow from "../Components/DeletedOrderTableRow";
import Update_Res from "../Components/Update_Res";
import Update_Category from "../Components/Update_Category";
import Update_Food from "../Components/Update_Food";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import {
  deleteDeliveryBoy,
  fetchAllDeliveryBoy,
  fetchAllUsers,
  fetchAdmin,
  fetchCompanyDetails,
  logoutAdmin,
  addDeliveryBoy,
  updateCompanyName,
  updateCompanyEmail,
  updateCompanyPhone,
  addNewFoodItem,
  fetchAllFoods,
  addNewRestaurent,
  fetchAllRestaurent,
  addNewCategory,
  fetchAllCategory,
  getAllOrders,
} from "../utils/utils";
import TodaysOffer from "../Components/TodaysOffer";
import DeleteButton from "../Components/DeleteButton";

const Admin_control_panel = () => {
  var serial_food_item = 1,
    serial_food_category = 1,
    serial_res = 1,
    serial_user = 1,
    serial_order = 1,
    serial_delivery = 1,
    serial_todays_offer = 1;

  const navigate = useNavigate();

  const [companyName, setcompanyName] = useState();

  const [user_info, setUser_info] = useState(false);
  const UserInfo = () => {
    setUser_info(true);
    setOrder_info(false);
    setDelivery_boy_info(false);
    setUpdate(false);
    setUpdate_web_details(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
    setshowCancleOrders(false);
    setshowDeliveredOrders(false);
    setUpdate(false);

    getAllUsers();
  };

  const [order_info, setOrder_info] = useState(false);
  const OrderInfo = () => {
    setOrder_info(true);
    setshowCancleOrders(false);
    setshowDeliveredOrders(false);
    setUser_info(false);
    setDelivery_boy_info(false);
    setUpdate(false);
    setUpdate_web_details(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);

    getAdmin();

    getAllOrders().then((response) => {
      const canceledOrders = response.filter(
        (order) => order.isDeleted === true
      );
      setallCancledOrders(canceledOrders);
      const deliveredOrders = response.filter(
        (order) => order.deliverStatus === "Delivered"
      );
      setallDeliveredOrders(deliveredOrders);
    });
  };

  const [todays_info, setTodays_info] = useState(false);
  const TodaysOfferInfo = () => {
    setData(foods);
    setTodays_info(true);
    setOrder_info(false);
    setUser_info(false);
    setDelivery_boy_info(false);
    setUpdate(false);
    setUpdate_web_details(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setshowCancleOrders(false);
    setshowDeliveredOrders(false);

    fetchAllFoods().then((response) => {
      setfoods(response);
    });
  };

  const [deliver_boy_info, setDelivery_boy_info] = useState(false);
  const DeliverBoyInfo = () => {
    setOrder_info(false);
    setUser_info(false);
    setDelivery_boy_info(true);
    setUpdate(false);
    setUpdate_web_details(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
    setshowCancleOrders(false);
    setshowDeliveredOrders(false);

    getDeliveryBoy();
  };

  const [update_delivery_boy, setUpdate_delivery_boy] = useState(false);
  const UpdateDeliveryBoy = () => {
    setUpdate_delivery_boy(true);
    setUpdate_food_item(false);
    setUser_info(false);
    setOrder_info(false);
    setDelivery_boy_info(false);
    setUpdate(false);
    setUpdate_web_details(false);
    setUpdate_food_category(false);
    setAdd_res(false);
    setUpdate_web_details_name(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_phone(false);
    setTodays_info(false);
  };

  const [update, setUpdate] = useState(false);
  const UpdateInfo = () => {
    setOrder_info(false);
    setUser_info(false);
    setUpdate(true);
    setDelivery_boy_info(false);
    setUpdate_web_details(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setUpdate_delivery_boy(false);
    setTodays_info(false);

    fetchAllRestaurent().then((response) => {
      setrestaurents(response);
    });

    fetchAllCategory().then((response) => {
      setallCategory(response);
    });
  };

  const [update_web_details, setUpdate_web_details] = useState(false);
  const UpdateWebInfo = () => {
    setOrder_info(false);
    setUser_info(false);
    setUpdate(false);
    setDelivery_boy_info(false);
    setUpdate_web_details(true);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
  };

  const [update_web_details_phone, setUpdate_web_details_phone] =
    useState(false);
  const UpdateWebInfo_Phone = () => {
    setOrder_info(false);
    setUser_info(false);
    setUpdate(false);
    setDelivery_boy_info(false);
    setUpdate_web_details_phone(true);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_name(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
  };

  const [update_web_details_mail, setUpdate_web_details_mail] = useState(false);
  const UpdateWebInfo_Mail = () => {
    setOrder_info(false);
    setUser_info(false);
    setUpdate(false);
    setDelivery_boy_info(false);
    setUpdate_web_details_phone(false);
    setUpdate_web_details_mail(true);
    setUpdate_web_details_name(false);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
  };

  const [update_web_details_name, setUpdate_web_details_name] = useState(false);
  const UpdateWebInfo_Name = async () => {
    setOrder_info(false);
    setUser_info(false);
    setUpdate(false);
    setDelivery_boy_info(false);
    setUpdate_web_details_phone(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_name(true);
    setAdd_res(false);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
  };

  const [showCancleOrders, setshowCancleOrders] = useState(false);
  const [showDeliveredOrders, setshowDeliveredOrders] = useState(false);

  const handleShowCancledOrders = () => {
    setshowCancleOrders(true);
    setOrder_info(false);
  };

  const handleShowDeliveredOrders = () => {
    setshowDeliveredOrders(true);
    setOrder_info(false);
  };

  // Update company name---------------------------------------------------
  const [newcompanyName, setnewcompanyName] = useState();
  const handleSubmitName = async () => {
    setUpdate_web_details_phone(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_name(false);

    updateCompanyName(newcompanyName).then((response) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        alert(response);
        getCompanyDetails();
      }, 3000);
    });
  };

  // Update company email---------------------------------------------------
  const [newcompanyEmail, setnewcompanyEmail] = useState();
  const handleSubmitEmail = async () => {
    setUpdate_web_details_phone(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_name(false);

    updateCompanyEmail(newcompanyEmail).then((response) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        alert(response);
        getCompanyDetails();
      }, 3000);
    });
  };

  // Update company phone no---------------------------------------------------
  const [newcompanyPhone, setnewcompanyPhone] = useState();
  const handleSubmitPhone = async () => {
    setUpdate_web_details_phone(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_name(false);

    updateCompanyPhone(newcompanyPhone).then((response) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(response);
      }, 3000);
    });
  };

  const [add_res, setAdd_res] = useState(false);
  const AddRes = () => {
    setOrder_info(false);
    setUser_info(false);
    setUpdate(false);
    setDelivery_boy_info(false);
    setAdd_res(true);
    setUpdate_food_category(false);
    setUpdate_food_item(false);
    setTodays_info(false);
  };

  const [update_food_category, setUpdate_food_category] = useState(false);
  const UpdateFoodCategori = () => {
    setData(allCategory);
    setUpdate_food_category(true);
    setUpdate_web_details_name(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_phone(false);
    setUpdate_web_details(false);
    setUpdate(false);
    setUpdate_food_item(false);
    setTodays_info(false);
  };

  const [update_food_item, setUpdate_food_item] = useState(false);

  const UpdateFoodItem = () => {
    setData(foods);
    setUpdate_food_item(true);
    setUser_info(false);
    setOrder_info(false);
    setTodays_info(false);
    setDelivery_boy_info(false);
    setUpdate(false);
    setUpdate_web_details(false);
    setUpdate_food_category(false);
    setAdd_res(false);
    setUpdate_web_details_name(false);
    setUpdate_web_details_mail(false);
    setUpdate_web_details_phone(false);
    setTodays_info(false);

    fetchAllFoods().then((response) => {
      console.log(response);
      setfoods(response);
    });
  };

  // Search Event--------------------------------------------------
  const [data, setData] = useState();
  let textInput = React.createRef();
  function handleSearch() {
    var search_item = textInput.current.value;

    //For User search
    if (user_info === true) {
      serial_user = 1;
      const updateItem = users.filter((currEle) => {
        return currEle.username
          .toLowerCase()
          .includes(search_item.toLowerCase());
      });
      setusers(updateItem);
    }

    //For Order search
    if (order_info === true) {
      serial_order = 1;
      const updateItem1 = allOrders.filter((currEle) => {
        return currEle.name.toLowerCase().includes(search_item.toLowerCase());
      });
      setData(updateItem1);
    }

    //For Delivery_boy search
    if (deliver_boy_info === true) {
      serial_delivery = 1;
      const updateItem2 = deliveryBoy.filter((currEle) => {
        return (
          currEle.username.toLowerCase().includes(search_item.toLowerCase()) ||
          currEle.address.toLowerCase().includes(search_item.toLowerCase())
        );
      });
      setdeliveryBoy(updateItem2);
    }

    //For Restaurent search
    if (add_res === true) {
      serial_res = 1;
      const updateItem3 = restaurents.filter((currEle) => {
        return (
          currEle.name.toLowerCase() === search_item.toLowerCase() ||
          currEle.id === search_item ||
          currEle.address.toLowerCase() === search_item.toLowerCase()
        );
      });
      setData(updateItem3);
    }

    //For Food Item search
    if (update_food_item === true) {
      serial_food_item = 1;
      const updateItem4 = foods.filter((currEle) => {
        return (
          currEle.name.toLowerCase().includes(search_item.toLowerCase()) ||
          currEle.categori.toLowerCase().includes(search_item.toLowerCase()) ||
          currEle.res.toLowerCase().includes(search_item.toLowerCase())
        );
      });
      setData(updateItem4);
    }

    //For Food Category search
    if (update_food_category === true) {
      serial_food_category = 1;
      const updateItem5 = allCategory.filter((currEle) => {
        return currEle.name.toLowerCase() === search_item.toLowerCase();
      });
      setData(updateItem5);
    }
    //Todays Offer Search
    if (todays_info === true) {
      serial_todays_offer = 1;
      const updateItem6 = data.filter((currEle) => {
        return currEle.name.toLowerCase().includes(search_item.toLowerCase());
      });
      setData(updateItem6);
    }
  }

  const [loading, setLoading] = useState(false);

  // Fetching company details--------------------------------------------------
  const getCompanyDetails = () => {
    fetchCompanyDetails().then((response) => {
      setcompanyName(response.name.toUpperCase());
    });
  };

  // Fetching admin details--------------------------------------------------
  const [adminName, setadminName] = useState();
  const [profilePicture, SetprofilePicture] = useState(null);
  const getAdmin = () => {
    fetchAdmin().then((response) => {
      if (response) {
        setadminName(response.username);
        if (response.image) SetprofilePicture(response.image.url);
        setallOrders(response.currentOrders);
      }
    });
  };

  // Fetching Delivery boy--------------------------------------------------
  const [deliveryBoy, setdeliveryBoy] = useState([]);
  const getDeliveryBoy = () => {
    fetchAllDeliveryBoy().then((response) => {
      setdeliveryBoy(response);
    });
  };

  // Fetching All Users--------------------------------------------------
  const [users, setusers] = useState([]);
  const getAllUsers = () => {
    fetchAllUsers().then((response) => {
      setusers(response);
    });
  };

  const fileInputRef = useRef(null);
  const [image, setImage] = useState();
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
        "http://localhost:8000/admins/uploadprofilepicture",
        { image: imageData },
        {
          withCredentials: true,
        }
      );
      alert(response.data);
      getAdmin();
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

  const [newDeliveryBoyName, setnewDeliveryBoyName] = useState();
  const [newDeliveryBoyPhone, setnewDeliveryBoyPhone] = useState();
  const [newDeliveryBoyEmail, setnewDeliveryBoyEmail] = useState();
  const [newDeliveryBoyAddress, setnewDeliveryBoyAddress] = useState();
  const [newDeliveryBoyPassword, setnewDeliveryBoyPassword] = useState();
  const [newDeliveryBoyServiceAddress, setnewDeliveryBoyServiceAddress] =
    useState();
  // Add Delivery boy
  const handleSubmit_deliveryBoy = () => {
    addDeliveryBoy(
      newDeliveryBoyName,
      newDeliveryBoyPhone,
      newDeliveryBoyEmail,
      newDeliveryBoyPassword,
      newDeliveryBoyAddress,
      newDeliveryBoyServiceAddress
    ).then((response) => {
      alert(response);
      setUpdate_delivery_boy(false);
    });
  };

  const [foodname, setfoodName] = useState();
  const [foodCategory, setfoodCategory] = useState();
  const [foodPrice, setfoodPrice] = useState();
  const [foodQuantity, setfoodQuantity] = useState();
  const [restaurentName, setrestaurentName] = useState();

  // Add new food item
  const handleAddNewFoodItem = () => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", foodname);
    formData.append("price", foodPrice);
    formData.append("category", foodCategory);
    formData.append("quantity", foodQuantity);
    formData.append("restaurent", restaurentName);

    setUpdate_food_item(true);
    setTodays_info(false);

    addNewFoodItem(formData).then((response) => {
      alert(response);
      fetchAllFoods().then((response) => {
        setfoods(response);
      });
    });
  };

  const [newRestaurentName, setnewRestaurentName] = useState();
  const [newRestaurentAddress, setnewRestaurentAddress] = useState();

  // Add new restaurent
  const handleAddNewRestaurent = async () => {
    if (!image) {
      alert("Please Upload an Image");
      return;
    }
    const maxSizeInKB = 70;
    if (image.size > maxSizeInKB * 1024) {
      alert(`File size should be less than ${maxSizeInKB} KB.`);
      return;
    }

    setAdd_res(true);

    const imageData = await setFileToBase(image);

    addNewRestaurent(imageData, newRestaurentName, newRestaurentAddress).then(
      (response) => {
        alert(response);
        fetchAllRestaurent().then((response) => {
          setrestaurents(response);
        });
      }
    );
  };

  // Fetch all foods
  const [foods, setfoods] = useState([]);

  // Fetch all restaurent
  const [restaurents, setrestaurents] = useState([]);

  const [categoryName, setcategoryName] = useState();
  const [categoryImage, setcategoryImage] = useState();

  const [allOrders, setallOrders] = useState([]);
  const [allCancledOrders, setallCancledOrders] = useState([]);
  const [allDeliveredOrders, setallDeliveredOrders] = useState([]);

  const [allCategory, setallCategory] = useState([]);

  // Add new category
  const handleAddNewCategory = () => {
    const formData = new FormData();

    formData.append("image", categoryImage);
    formData.append("name", categoryName);

    addNewCategory(formData).then((response) => {
      alert(response);
      fetchAllCategory().then((response) => {
        setallCategory(response);
      });
    });
  };

  const [allLoading, setallLoading] = useState(true);

  useEffect(() => {
    getCompanyDetails();
    getAdmin();
    getDeliveryBoy();
    getAllUsers();

    fetchAllFoods().then((response) => {
      setfoods(response);
    });

    fetchAllRestaurent().then((response) => {
      setrestaurents(response);
    });

    fetchAllCategory().then((response) => {
      setallCategory(response);
    });

    getAllOrders().then((response) => {
      const canceledOrders = response.filter(
        (order) => order.isDeleted === true
      );
      setallCancledOrders(canceledOrders);
      const deliveredOrders = response.filter(
        (order) => order.deliverStatus === "Delivered"
      );
      setallDeliveredOrders(deliveredOrders);
    });
    setallLoading(false);
  }, []);

  if (allLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="Admin_control" style={{ height: "97vh" }}>
        {/* Navbar------------------------------------------------------------------------------------------- */}
        <div className="row m-0 p-0">
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
              {/* Searching---------------------------------------------------------- */}
              <div className="col-lg-7 col-md-4 d-flex">
                <div className="col-5"></div>
                <div
                  className="search-bar-container1 col-xl-5 col-lg-5 col-md-5 col-sm-7 col-7"
                  style={{ width: "40%" }}
                >
                  <div className="input-wrapper1">
                    <FaMagnifyingGlass id="search-icon" />
                    <input
                      placeholder="Search here..."
                      className="Search_input1"
                      ref={textInput}
                    />
                  </div>
                </div>
                <div className="col-2 mt-0">
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
        <div
          className="container-fluid m-0 p-0 d-flex"
          style={{ overflowX: "auto" }}
        >
          {/* Side_menu----------------------------------------------------------------------------------------------- */}
          <div className="col-2 m-0 p-0 panel">
            <div className="col-12 dashboard m-0 p-0 pt-3">
              <div className="col-6 admin_img ">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                    style={{
                      height: "100px",
                      width: "100px",
                      cursor: "pointer",
                      borderRadius: "50px",
                    }}
                  ></img>
                ) : (
                  <FaUser
                    title="Upload new Profile Image"
                    style={{ height: "40px", width: "40px", cursor: "pointer" }}
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

              <div className="admin_name p-0">{adminName}</div>
              <div className="admin_deg ">Admin</div>
            </div>
            <div>
              <div
                className="admin_menu"
                style={{
                  backgroundColor: user_info ? "#5cb85c" : "",
                  color: user_info ? "white" : "black",
                }}
              >
                <div className="col-2">
                  <FaUser className="admin_icon" />
                </div>
                <div
                  className="col-7 m-0 p-0"
                  style={{ cursor: "grab" }}
                  onClick={UserInfo}
                >
                  User Info&emsp;&emsp;&emsp;
                </div>
              </div>
              <div
                className="admin_menu"
                style={{
                  backgroundColor:
                    order_info || showCancleOrders || showDeliveredOrders
                      ? "#5cb85c"
                      : "",
                  color:
                    order_info || showCancleOrders || showDeliveredOrders
                      ? "white"
                      : "black",
                }}
              >
                <div className="col-2 pt-0">
                  <FaGift className="admin_icon" />
                </div>
                <div
                  className="col-7 m-0 p-0"
                  style={{ cursor: "grab" }}
                  onClick={OrderInfo}
                >
                  Order DB&emsp;&emsp;&emsp;
                </div>
              </div>

              {/* Todays Offer */}
              <div
                className="admin_menu"
                style={{
                  backgroundColor: todays_info ? "#5cb85c" : "",
                  color: todays_info ? "white" : "black",
                }}
              >
                <div className="col-2 pt-0 ">
                  <BiSolidOffer className="admin_icon" />
                </div>
                <div
                  className="col-8 m-0 p-0"
                  style={{ cursor: "grab" }}
                  onClick={TodaysOfferInfo}
                >
                  Today's Offers&emsp;&emsp;&emsp;
                </div>
              </div>

              <div
                className="admin_menu"
                style={{
                  backgroundColor: deliver_boy_info ? "#5cb85c" : "",
                  color: deliver_boy_info ? "white" : "black",
                }}
              >
                <div className="col-2 pt-0">
                  <MdDeliveryDining className="admin_icon" />
                </div>
                <div
                  className="col-7 m-0 p-0"
                  style={{ cursor: "grab" }}
                  onClick={DeliverBoyInfo}
                >
                  Delivery Boy Info
                </div>
              </div>
              <div
                className="admin_menu"
                style={{
                  backgroundColor:
                    update ||
                    update_web_details ||
                    update_delivery_boy ||
                    update_food_item ||
                    update_food_category ||
                    add_res
                      ? "#5cb85c"
                      : "",
                  color:
                    update ||
                    update_web_details ||
                    update_delivery_boy ||
                    update_food_item ||
                    update_food_category ||
                    add_res
                      ? "white"
                      : "black",
                }}
              >
                <div className="col-2 pt-0">
                  <GrUpdate className="admin_icon" />
                </div>
                <div
                  className="col-7 m-0 p-0"
                  style={{ cursor: "grab" }}
                  onClick={UpdateInfo}
                >
                  Update&emsp;&emsp;&emsp;&emsp;
                </div>
              </div>
              <div className="admin_menu">
                <div className="col-2 pt-0">
                  <RiLogoutCircleRLine className="admin_icon" />
                </div>
                <div
                  className="col-7 m-0 p-0"
                  style={{ cursor: "-webkit-grab", cursor: "grab" }}
                  onClick={() => {
                    logoutAdmin().then((response) => {
                      if (response === "Logout successfully") {
                        setLoading(true);

                        setTimeout(() => {
                          setLoading(false);
                          navigate("/Login");
                        }, 3000);
                      } else {
                        alert(response);
                      }
                    });
                  }}
                >
                  Log Out&ensp;&emsp;&emsp;&emsp;
                </div>
              </div>
            </div>
          </div>

          {/* Default page--------------------------------------------------------------------------------------------------------- */}
          {!user_info &&
          !order_info &&
          !todays_info &&
          !deliver_boy_info &&
          !update &&
          !update_web_details &&
          !add_res &&
          !update_food_category &&
          !update_food_item &&
          !update_delivery_boy &&
          !showCancleOrders &&
          !showDeliveredOrders ? (
            <div
              className="col-10 admin_default_page"
              style={{ height: "98vh" }}
            >
              <b>
                <h1 style={{ margin: "auto", paddingTop: "22%" }}>
                  Welcome to {companyName}!
                </h1>
              </b>
              <div className="pt-4">
                <BsEmojiLaughing style={{ height: "50px", width: "50px" }} />
              </div>
            </div>
          ) : null}

          {/* User Info----------------------------------------------------------------------------------------------------------------- */}
          {user_info ? (
            <div className="col-10 m-0 p-0">
              <div className="col-12 m-0 p-0 d-flex">
                <div
                  className="head col-1 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Serial no
                </div>
                <div
                  className="head col-2 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Username
                </div>
                <div
                  className="head col-2 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Phone no
                </div>
                <div
                  className="head col-3 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Email
                </div>
                <div
                  className="head col-4 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Address
                </div>
              </div>
              {users.map((elem) => {
                const { username, contact, email, address } = elem;
                return (
                  <>
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
                        }}
                      >
                        {serial_user++}
                      </div>
                      <div
                        className="col-2"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                          overflow: "hidden",
                        }}
                      >
                        {username}
                      </div>
                      <div
                        className="col-2"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {contact}
                      </div>
                      <div
                        className="col-3"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                          overflow: "hidden",
                        }}
                      >
                        {email}
                      </div>
                      <div
                        className="col-4"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {address}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}

          {/* Order Info------------------------------------------------------------------------------------------------------------------------ */}
          {order_info ? (
            <div
              className="col-12 m-0 p-0"
              style={{ height: "98vh", overflowY: "auto" }}
            >
              <div className="m-0 p-0 d-flex">
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Serial no
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Username
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Phone no
                </div>
                <div
                  className="head col-3 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Address
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Time
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Order Id
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Delivery Status
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Delivery Boy Name
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Delivery Boy Phone
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Payment Status
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Payment Mode
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Payment Id
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  OTP
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Order Info
                </div>
              </div>
              {allOrders.map((elem) => {
                if (elem.deliverStatus === "Pending")
                  return (
                    <Table_row
                      serial={serial_order++}
                      name={elem.userId ? elem.userId.username : ""}
                      phone={elem.userId.contact}
                      address={elem.userId.address}
                      time={elem.time}
                      id={elem._id}
                      delivery_sts={elem.deliverStatus}
                      payment_sts={elem.paymentStatus}
                      payment_mode={elem.paymentMode}
                      payment_id={"payment_id"}
                      food={elem.foodId}
                      price={elem.totalAmount}
                      otp={elem.OTP}
                      deliveryBoyName={
                        elem.deliveryBoy ? elem.deliveryBoy.username : ""
                      }
                      deliveryBoyPhone={
                        elem.deliveryBoy ? elem.deliveryBoy.contact : ""
                      }
                      isDeleted={elem.isDeleted}
                    />
                  );
              })}
              <div
                style={{
                  display: "flex",
                  marginTop: "5rem",
                  marginLeft: "2rem",
                  justifyContent: "left",
                  gap: "5rem",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={handleShowCancledOrders}
                >
                  Cancle Orders
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleShowDeliveredOrders}
                >
                  Delivered Orders
                </button>
              </div>
            </div>
          ) : null}

          {/* Show cancled orders */}
          {showCancleOrders ? (
            <div
              className="col-12 m-0 p-0"
              style={{ height: "98vh", overflowY: "auto" }}
            >
              <div className="btn btn-success mt-2">Cancled Orders</div>
              <div className="m-0 p-0 d-flex mt-3">
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Serial no
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Username
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Phone no
                </div>
                <div
                  className="head col-3 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Address
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Time
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Order Id
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Delivery Status
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Delivery Boy Name
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Delivery Boy Phone
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Payment Status
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Payment Mode
                </div>
                <div
                  className="head col-2 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Payment Id
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  OTP
                </div>
                <div
                  className="head col-1 pt-2 pb-0"
                  style={{ border: "1px solid black" }}
                >
                  Order Info
                </div>
              </div>
              {allCancledOrders.map((elem) => {
                return (
                  <DeletedOrderTableRow
                    serial={serial_order++}
                    name={elem.userId ? elem.userId.username : ""}
                    phone={elem.userId.contact}
                    address={elem.orderAddress}
                    time={elem.time}
                    id={elem._id}
                    delivery_sts={elem.deliverStatus}
                    payment_sts={elem.paymentStatus}
                    payment_mode={elem.paymentMode}
                    payment_id={"payment_id"}
                    food={elem.foodId}
                    price={elem.totalAmount}
                    otp={elem.OTP}
                    deliveryBoyName={
                      elem.deliveryBoy ? elem.deliveryBoy.username : ""
                    }
                    deliveryBoyPhone={
                      elem.deliveryBoy ? elem.deliveryBoy.contact : ""
                    }
                    isDeleted={elem.isDeleted}
                  />
                );
              })}
            </div>
          ) : null}

          {/* Show delivered orders */}
          {showDeliveredOrders ? (
            <>
              <div
                className="col-12 m-0 p-0"
                style={{ height: "98vh", overflowY: "auto" }}
              >
                <div className="btn btn-success mt-2">Delivered Orders</div>
                <div className="m-0 p-0 d-flex mt-3">
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Serial no
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Username
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Phone no
                  </div>
                  <div
                    className="head col-3 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Address
                  </div>
                  <div
                    className="head col-2 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Time
                  </div>
                  <div
                    className="head col-2 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Order Id
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Delivery Status
                  </div>
                  <div
                    className="head col-2 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Delivery Boy Name
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Delivery Boy Phone
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Payment Status
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Payment Mode
                  </div>
                  <div
                    className="head col-2 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Payment Id
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    OTP
                  </div>
                  <div
                    className="head col-1 pt-2 pb-0"
                    style={{ border: "1px solid black" }}
                  >
                    Order Info
                  </div>
                </div>
                {allDeliveredOrders.map((elem) => {
                  return (
                    <Table_row
                      serial={serial_order++}
                      name={elem.userId ? elem.userId.username : ""}
                      phone={elem.userId.contact}
                      address={elem.orderAddress}
                      time={elem.time}
                      id={elem._id}
                      delivery_sts={elem.deliverStatus}
                      payment_sts={elem.paymentStatus}
                      payment_mode={elem.paymentMode}
                      payment_id={"payment_id"}
                      food={elem.foodId}
                      price={elem.totalAmount}
                      otp={elem.OTP}
                      deliveryBoyName={
                        elem.deliveryBoy ? elem.deliveryBoy.username : ""
                      }
                      deliveryBoyPhone={
                        elem.deliveryBoy ? elem.deliveryBoy.contact : ""
                      }
                      isDeleted={elem.isDeleted}
                    />
                  );
                })}
              </div>
            </>
          ) : null}

          {/* Todays Info------------------------------------------------------------------------------------------------------------------------ */}
          {todays_info ? (
            <div className="container-fluid m-0 p-0">
              <div className="mt-4">
                <button className="btn btn-success">
                  <strong>Today's Offer</strong>
                </button>
              </div>
              <div
                className="mt-4 pl-3 pr-3"
                style={{ overflow: "auto", height: "83vh" }}
              >
                <div className="col-12 m-0 p-0 d-flex">
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Serial no
                  </div>
                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Food Name
                  </div>

                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Food Image
                  </div>

                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Category
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Price
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Quantity
                  </div>

                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Restaurent Name
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Delete
                  </div>
                </div>
                {foods.map((elem) => {
                  const {
                    _id,
                    name,
                    image,
                    restaurent,
                    category,
                    quantity,
                    price,
                    setAsTodaysOffer,
                  } = elem;
                  if (setAsTodaysOffer)
                    return (
                      <>
                        <TodaysOffer
                          id={_id}
                          serial={serial_food_item++}
                          name={name}
                          image={image}
                          category={category}
                          price={price}
                          restaurent={restaurent}
                          quantity={quantity}
                        />
                      </>
                    );
                })}
              </div>
            </div>
          ) : null}

          {/* Delivery boy info--------------------------------------------------------------------------------------------------------- */}
          {deliver_boy_info ? (
            <div className="col-11 m-0 p-0 ">
              <div className="col-12 m-0 p-0 d-flex">
                <div
                  className="head col-1 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Serial no
                </div>
                <div
                  className="head col-2 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Name
                </div>
                <div
                  className="head col-1 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Phone no
                </div>
                <div
                  className="head col-2 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Email
                </div>
                <div
                  className="head col-3 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Address
                </div>
                <div
                  className="head col-4 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Service Address
                </div>
                <div
                  className="head col-1 pt-2 pb-2"
                  style={{ border: "1px solid black" }}
                >
                  Delete
                </div>
              </div>
              {deliveryBoy.map((elem) => {
                const {
                  username,
                  contact,
                  address,
                  id = elem._id,
                  serviceAddress,
                  email,
                } = elem;
                return (
                  <>
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
                        }}
                      >
                        {serial_delivery++}
                      </div>
                      <div
                        className="col-2"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {username}
                      </div>
                      <div
                        className="col-1"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {contact}
                      </div>
                      <div
                        className="col-2"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {email}
                      </div>
                      <div
                        className="col-3"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {address}
                      </div>
                      <div
                        className="col-4"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        }}
                      >
                        {serviceAddress}
                      </div>

                      <div
                        className="col-1"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <DeleteButton
                          onClick={() => {
                            deleteDeliveryBoy(id).then((response) => {
                              alert(response);
                              getDeliveryBoy();
                            });
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}

          {/* Update--------------------------------------------------------------------------------------------------------------------- */}
          {update ? (
            <div
              className="container-fluid"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
            >
              <div className="col-12 d-flex outer_update_div">
                <div className="col-3 update_div" onClick={UpdateWebInfo}>
                  <h5>Update Website Info</h5>
                </div>
                <div className="col-3 update_div" onClick={AddRes}>
                  <h5>Add New Restaurent</h5>
                </div>
              </div>

              <div className="col-12 d-flex outer_update_div">
                <div className="col-3 update_div" onClick={UpdateFoodItem}>
                  <h5>Update Food Items</h5>
                </div>
                <div className="col-3 update_div" onClick={UpdateFoodCategori}>
                  <h5>Update Food Category</h5>
                </div>
                <div className="col-3 update_div" onClick={UpdateDeliveryBoy}>
                  <h5>Add Delivery Boy</h5>
                </div>
              </div>
            </div>
          ) : null}

          {/* Update Web Info---------------------------------------------------------------------------------------------------------------- */}
          {update_web_details ? (
            <div className="container-fluid m-0 p-0 admin_default_page">
              <div
                className="mt-5 d-flex m-0 p-0 pt-5"
                style={{ height: "30%" }}
              >
                <div className="col-1 m-0 p-0"></div>
                <div className="col-3 m-0 p-0 mt-5">
                  <button
                    className="btn-xl btn-success pt-2 pb-2"
                    style={{ borderRadius: "10px" }}
                    onClick={UpdateWebInfo_Phone}
                  >
                    Update Phone No.
                  </button>
                </div>
                <div className="col-3 m-0 p-0 mt-5">
                  <button
                    className="btn-xl btn-success pt-2 pb-2"
                    style={{ borderRadius: "10px" }}
                    onClick={UpdateWebInfo_Mail}
                  >
                    Update Email Id
                  </button>
                </div>
                <div className="col-3 m-0 p-0 mt-5">
                  <button
                    className="btn-xl btn-success pt-2 pb-2"
                    style={{ borderRadius: "10px" }}
                    onClick={UpdateWebInfo_Name}
                  >
                    Update Company Name
                  </button>
                </div>
              </div>
              {!update_web_details_phone &&
              !update_web_details_mail &&
              !update_web_details_name ? (
                <div className="mt-5">
                  <h1>Change Website Details</h1>
                </div>
              ) : null}
              {update_web_details_phone ? (
                <div
                  className="pt-5 pb-5 m-auto pl-5 pr-5"
                  style={{
                    width: "40%",
                    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                >
                  <h4 className="pb-2">Enter New Phone Number</h4>
                  <input
                    type="text"
                    placeholder="Enter Phone Number..."
                    className="mt-2 form-control"
                    onChange={(e) => {
                      setnewcompanyPhone(e.target.value);
                    }}
                  ></input>
                  <div className="mt-4 mr-0">
                    <button
                      className="btn btn-success"
                      onClick={handleSubmitPhone}
                    >
                      Sumbit
                    </button>
                  </div>
                </div>
              ) : null}
              {update_web_details_mail ? (
                <div
                  className="pt-5 pb-5 m-auto pl-5 pr-5"
                  style={{
                    width: "40%",
                    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                >
                  <h4 className="pb-2">Enter New Email Id</h4>
                  <input
                    type="email"
                    placeholder="Enter Email Id..."
                    className="mt-2 form-control"
                    onChange={(e) => {
                      setnewcompanyEmail(e.target.value);
                    }}
                  ></input>
                  <div className="mt-4 mr-0">
                    <button
                      className="btn btn-success"
                      onClick={handleSubmitEmail}
                    >
                      Sumbit
                    </button>
                  </div>
                </div>
              ) : null}
              {update_web_details_name ? (
                <div
                  className="pt-5 pb-5 m-auto pl-5 pr-5"
                  style={{
                    width: "40%",
                    boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                    border: "2px solid black",
                    borderRadius: "50px",
                  }}
                >
                  <h4 className="pb-2">Enter New Name</h4>
                  <input
                    type="text"
                    placeholder="Enter Name..."
                    className="mt-2 form-control"
                    onChange={(e) => {
                      setnewcompanyName(e.target.value);
                    }}
                  ></input>
                  <div className="mt-4 mr-0">
                    <button
                      className="btn btn-success"
                      onClick={handleSubmitName}
                    >
                      Sumbit
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Update restaurent list----------------------------------------------------------------------------------------------------- */}
          {add_res ? (
            <div
              className="container-fluid"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
            >
              <div className="mt-4">
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#add_new"
                >
                  Add New Restaurent
                </button>
              </div>
              <div
                className="mt-4 pl-3 pr-3"
                style={{ overflow: "auto", height: "83vh" }}
              >
                <div className="col-12 m-0 p-0 d-flex">
                  <div
                    className="head col-1 pt-3 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Serial no
                  </div>
                  <div
                    className="head col-3 pt-3 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Restaurent Name
                  </div>

                  <div
                    className="head col-3 pt-3 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Restaurent Image
                  </div>

                  <div
                    className="head col-3 pt-3 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Address
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Update Details
                  </div>
                  <div
                    className="head col-1 pt-3 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Delete
                  </div>
                </div>
                {restaurents.map((elem) => {
                  const { _id, name, image, address } = elem;
                  return (
                    <>
                      <Update_Res
                        serial={serial_res++}
                        name={name}
                        image={image.url}
                        address={address}
                        id={_id}
                      />
                    </>
                  );
                })}

                {/* Add New Restaurent Modal------------------------------------------------------------------------------------------------- */}
                <div
                  className="modal fade"
                  id="add_new"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add New Restaurent Details
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Enter Restaurent Name:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="text"
                              placeholder="Enter Restaurent Name..."
                              onChange={(e) => {
                                setnewRestaurentName(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Enter Restaurent Address:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="text"
                              placeholder="Enter Restaurent Address..."
                              onChange={(e) => {
                                setnewRestaurentAddress(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Upload Restaurent Image:</b>
                          </div>
                          <div className="col-7 m-0 p-0">
                            <input
                              type="file"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          data-dismiss="modal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewRestaurent();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Update food category---------------------------------------------------------------------------------------------------- */}
          {update_food_category ? (
            <div className="container-fluid m-0 p-0">
              <div className="mt-4">
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#add_new_cat"
                >
                  Add New Food Category
                </button>
              </div>
              <div
                className="mt-4 pl-3 pr-3"
                style={{ overflow: "auto", height: "83vh" }}
              >
                <div className="col-12 m-0 p-0 d-flex">
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Serial no
                  </div>
                  <div
                    className="head col-4 pt-2 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Category Name
                  </div>
                  <div
                    className="head col-4 pt-2 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Category Image
                  </div>
                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Update Details
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{ border: "1px solid black" }}
                  >
                    Delete
                  </div>
                </div>
                {allCategory.map((elem) => {
                  const { name, image, _id } = elem;
                  return (
                    <>
                      <Update_Category
                        serial={serial_food_category++}
                        name={name}
                        image={image}
                        id={_id}
                      />
                    </>
                  );
                })}

                {/* Add new category modal */}
                <div
                  className="modal fade"
                  id="add_new_cat"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add New Food Category Details
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Enter New Category Name:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="text"
                              placeholder="Enter Category Name..."
                              onChange={(e) => {
                                setcategoryName(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Upload Category Image:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="file"
                              onChange={(e) => {
                                setcategoryImage(e.target.files[0]);
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          data-dismiss="modal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewCategory();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Update food item----------------------------------------------------------------------------------------------------------- */}
          {update_food_item ? (
            <div className="container-fluid m-0 p-0">
              <div className="mt-4">
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#add_new_cat"
                >
                  Add New Food
                </button>
              </div>
              <div
                className="mt-4 pl-3 pr-3"
                style={{ overflow: "auto", height: "83vh" }}
              >
                <div className="col-12 m-0 p-0 d-flex">
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Serial no
                  </div>
                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Food Name
                  </div>

                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Food Image
                  </div>

                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Category
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Price
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Quantity
                  </div>

                  <div
                    className="head col-2 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Restaurent Name
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Update Details
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Delete
                  </div>
                  <div
                    className="head col-1 pt-2 pb-2"
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Add to Today's Offer
                  </div>
                </div>
                {foods.map((elem) => {
                  const {
                    _id,
                    name,
                    image,
                    restaurent,
                    category,
                    quantity,
                    price,
                    setAsTodaysOffer,
                  } = elem;
                  return (
                    <>
                      <Update_Food
                        id={_id}
                        serial={serial_food_item++}
                        name={name}
                        image={image}
                        category={category}
                        price={price}
                        restaurent={restaurent}
                        quantity={quantity}
                        setAsTodaysOfferStatus={setAsTodaysOffer}
                      />
                    </>
                  );
                })}
                <div
                  className="modal fade"
                  id="add_new_cat"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add New Food Item Details
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Enter Item Name:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="text"
                              placeholder="Enter Item Name..."
                              onChange={(e) => {
                                setfoodName(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Enter Item Price:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="number"
                              placeholder="Enter Item Price..."
                              onChange={(e) => {
                                setfoodPrice(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Enter Item Quantity:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="text"
                              placeholder="Enter Item Quantity/Size..."
                              onChange={(e) => {
                                setfoodQuantity(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Upload Item Image:</b>
                          </div>
                          <div className="col-6 m-0 p-0">
                            <input
                              type="file"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            ></input>
                          </div>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Select Item Category:</b>
                          </div>
                          <select
                            className="form-select ml-3"
                            onChange={(e) => {
                              setfoodCategory(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              Select Item Category...
                            </option>
                            {allCategory.map((option) => (
                              <option value={option.value}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="d-flex mt-3 p-0">
                          <div className="col-5 m-0 p-0">
                            <b>Select Restaurent Name:</b>
                          </div>
                          <select
                            className="form-select ml-3"
                            onChange={(e) => {
                              setrestaurentName(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              Select Restaurent Name...
                            </option>
                            {restaurents.map((option) => (
                              <option value={option.value}>
                                {option.name}-{option.address}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-success"
                          data-dismiss="modal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewFoodItem();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/*Add Delivery boy------------------------------------------------------------ */}
          {update_delivery_boy ? (
            <div className="container-fluid m-0 p-0 admin_default_page">
              <div
                className="col-lg-6 pt-5 pb-3 d-lg-block d-xl-block"
                style={{
                  width: "60%",
                  boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                  border: "2px solid black",
                  borderRadius: "50px",
                  marginLeft: "25%",
                  marginTop: "5%",
                  paddingBottom: "10rem",
                }}
              >
                <div className="col-12" style={{ display: "flex" }}>
                  <div className="col-4 pl-0 pt-0">
                    <h5>Enter Delivery Boy Name: </h5>
                  </div>
                  <input
                    className="col-8 pt-0"
                    placeholder="Enter New Name..."
                    style={{
                      borderStyle: "solid",
                      borderRadius: "5px",
                      height: "50px",
                    }}
                    onChange={(e) => {
                      setnewDeliveryBoyName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-12 pt-3" style={{ display: "flex" }}>
                  <div className="col-4 pl-0 pt-0">
                    <h5 style={{ marginTop: "7px" }}>Enter Phone no: </h5>
                  </div>
                  <input
                    className="col-8 pt-0"
                    placeholder="Enter New Phone no..."
                    style={{
                      borderStyle: "solid",
                      borderRadius: "5px",
                      height: "50px",
                    }}
                    onChange={(e) => {
                      setnewDeliveryBoyPhone(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-12 pt-3" style={{ display: "flex" }}>
                  <div className="col-4 pl-0 pt-0">
                    <h5 style={{ marginTop: "7px" }}>Enter Email: </h5>
                  </div>
                  <input
                    className="col-8 pt-0"
                    placeholder="Enter New Email Id..."
                    style={{
                      borderStyle: "solid",
                      borderRadius: "5px",
                      height: "50px",
                    }}
                    onChange={(e) => {
                      setnewDeliveryBoyEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-12 pt-3" style={{ display: "flex" }}>
                  <div className="col-4 pl-0 pt-0">
                    <h5 style={{ marginTop: "7px" }}>Enter Password: </h5>
                  </div>
                  <input
                    className="col-8 pt-0"
                    type="password"
                    placeholder="Enter Password..."
                    style={{
                      borderStyle: "solid",
                      borderRadius: "5px",
                      height: "50px",
                    }}
                    onChange={(e) => {
                      setnewDeliveryBoyPassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-12 pt-3" style={{ display: "flex" }}>
                  <div className="col-4 pl-0 pt-0">
                    <h5 style={{ marginTop: "7px" }}>Enter Address: </h5>
                  </div>
                  <input
                    className="col-8 pt-0"
                    placeholder="Enter New Address..."
                    style={{
                      borderStyle: "solid",
                      borderRadius: "5px",
                      height: "50px",
                    }}
                    onChange={(e) => {
                      setnewDeliveryBoyAddress(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-12 pt-3" style={{ display: "flex" }}>
                  <div className="col-4 pl-0 pt-0">
                    <h5 style={{ marginTop: "7px" }}>
                      Enter Service Address:{" "}
                    </h5>
                  </div>
                  <input
                    className="col-8 pt-0"
                    placeholder="Ex= address1, address2, ..."
                    style={{
                      borderStyle: "solid",
                      borderRadius: "5px",
                      height: "50px",
                    }}
                    onChange={(e) => {
                      setnewDeliveryBoyServiceAddress(e.target.value);
                    }}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  style={{ marginLeft: "9%", marginTop: "6%", width: "20%" }}
                  onClick={handleSubmit_deliveryBoy}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/*-------------Loader---- */}
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

export default Admin_control_panel;