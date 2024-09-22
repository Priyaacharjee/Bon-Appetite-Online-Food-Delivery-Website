// utils.js
import axios from "axios";

// USER FUNCTIONS-------------------------------------------------------------------------------
// Logout user
export const logout = async () => {
  try {
    let response = await axios.get("https://bon-appetite-online-food-delivery-website.onrender.com/users/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Find user
export const findUser = async () => {
  try {
    let response = await axios.get("https://bon-appetite-online-food-delivery-website.onrender.com/users/getuser", {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    } else {
      return "My Account";
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch company details
export const fetchCompanyDetails = async () => {
  try {
    let response = await axios.get("https://bon-appetite-online-food-delivery-website.onrender.com/companyDetails");
    return response.data[0];
  } catch (err) {
    console.log(err.message);
  }
};

// User Signup
export const signUp = async (email, password, username, contact) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/register",
      {
        email,
        password,
        username,
        contact,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
    alert("An error occured during login");
  }
};

// ADMIN FUNCTIONS-------------------------------------------------------------------------------
// Admin login
export const loginAdmin = async (email, password) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
    alert("An error occured during login");
  }
};

// Login delivery boy
export const loginDeliveryBoy = async (email, password) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/deliveryboys/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
    alert("An error occured during login");
  }
};

// Admin logout
export const logoutAdmin = async () => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Admin
export const fetchAdmin = async () => {
  try {
    let response = await axios.get("https://bon-appetite-online-food-delivery-website.onrender.com/admins/getadmin", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update company name
export const updateCompanyName = async (name) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/updatecompanyname",
      { name },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update company email
export const updateCompanyEmail = async (email) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/updatecompanyemail",
      { email },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update company phone
export const updateCompanyPhone = async (phone) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/updatecompanyphone",
      { phone },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add delivery boy
export const addDeliveryBoy = async (
  username,
  contact,
  email,
  password,
  address,
  serviceAddress
) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/createdeliveryboy",
      { username, contact, email, password, address, serviceAddress },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch all delivery boy
export const fetchAllDeliveryBoy = async () => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/getdeliveryboy",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Delete delivery boy
export const deleteDeliveryBoy = async (id) => {
  let response = await axios.delete(
    "https://bon-appetite-online-food-delivery-website.onrender.com/admins/deletedeliveryboy",
    {
      params: {
        deliveryBoyId: id,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    let response = await axios.get("https://bon-appetite-online-food-delivery-website.onrender.com/admins/getallusers", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add new food item
export const addNewFoodItem = async (formData) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/foods/createfooditem",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch all food items
export const fetchAllFoods = async () => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/foods/getallfooditems",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch single food item
export const fetchSingleFood = async (id) => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/foods/getsinglefooditem",
      {
        params: { foodId: id },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Delete food item
export const deleteFoodItem = async (id) => {
  try {
    let response = await axios.delete(
      "https://bon-appetite-online-food-delivery-website.onrender.com/foods/deletefooditem",
      {
        params: {
          id,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update food item
export const updateFoodItem = async (formData) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/foods/updatefooditem",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add new restaurent
export const addNewRestaurent = async (formData) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/addnewrestaurent",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch all restaurents
export const fetchAllRestaurent = async () => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/fetchallrestaurent",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch a particular restaurent(extra)
export const fetchSingleRestaurent = async (id) => {
  console.log(id);
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/fetchsinglerestaurent",
      { id },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Delete restaurent
export const deleteRestaurent = async (id) => {
  try {
    let response = await axios.delete(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/deleterestaurent",
      {
        params: {
          id,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Restautrent
export const updateRestaurent = async (formData) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/updaterestaurent",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add new category
export const addNewCategory = async (formData) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/addnewcategory",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch all categories
export const fetchAllCategory = async () => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/getallcategory",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    let response = await axios.delete(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/deletecategory",
      {
        params: {
          id,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Category
export const updateCategory = async (formData) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/updatecategory",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add to cart
export const addToCart = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/addtocart",
      { foodId: id },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
// Delete cart item
export const deleteCartItem = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/deleteitemfromcart",
      { foodId: id },
      { withCredentials: true }
    );
    alert(response.data);
  } catch (err) {
    console.log(err.message);
  }
};

// Add to cart increase quantity
export const addToCartIncreaseQuantity = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/addtocartincreasequantity",
      { foodId: id },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add to cart decrease quantity
export const deleteCartItemDecreaseQuantity = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/deletecartitemdecreasequantity",
      { foodId: id },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Create order
export const createOrder = async ({ userCart, totalAmount, time }) => {
  try {
    let response = await axios.post(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/createorder",
      { userCart, totalAmount, time },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Cancle order
export const cancelSingleOrder = async (id) => {
  try {
    let response = await axios.delete(
      "https://bon-appetite-online-food-delivery-website.onrender.com/users/cancleorder",
      {
        params: { id: id },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

// Fetch all orders
export const getAllOrders = async () => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/fetchallorders",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

// Confirm order delete
export const confirmOrderDelete = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/confirmdelete",
      { orderId: id },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

// Fetch delivery boy
export const fetchDeliveryBoy = async () => {
  try {
    let response = await axios.get(
      "https://bon-appetite-online-food-delivery-website.onrender.com/deliveryboys/fetchsingledeliveryboy",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

// Successfull delivery
export const deliverySuccessfull = async (otp, id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/deliveryboys/deliverysuccessfull",
      { otp, orderId: id },
      { withCredentials: true }
    );
    alert(response.data);
  } catch (err) {
    alert(err.message);
  }
};

// Set as taday's offer
export const setAsTodaysOffer = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/todaysoffer",
      { foodId: id },
      { withCredentials: true }
    );
    alert(response.data);
  } catch (err) {
    alert(err.message);
  }
};

//Remove from taday's offer
export const removeFromTodaysOffer = async (id) => {
  try {
    let response = await axios.put(
      "https://bon-appetite-online-food-delivery-website.onrender.com/admins/removetodaysoffer",
      { foodId: id },
      { withCredentials: true }
    );
    alert(response.data);
  } catch (err) {
    alert(err.message);
  }
};