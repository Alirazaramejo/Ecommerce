// Routers.js
import React from "react";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import CheckOut from "../Pages/CheckOut";
import Login from "../Pages/Login";
import SingUp from "../Pages/SingUp";
import ProductDetails from "../Pages/ProductDetails";
import Shop from "../Pages/Shop";
import ProtectRoute from "./ProtectRoute";
import AllProduct from "../Admin/AllProduct";
import AddProduct from "../Admin/AddProduct";
import Dashboard from "../Admin/Dashboard";
import { Route, Routes } from "react-router-dom";
import User from "../Admin/User";
import AdminProtect from "./AdminProtect";

function Routers() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="singUp" element={<SingUp />} />
      <Route path="product/:id" element={<ProductDetails />} />{" "}
      {/* Updated path */}
      <Route path="shop" element={<Shop />} />
      <Route path="checkout" element={<ProtectRoute>
        <CheckOut />
      </ProtectRoute>} />
      <Route path="/*" element={<AdminProtect />}>
        
        <Route path="dashboard/all-products" element={<AllProduct />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/users" element={<User />} />
        <Route path="dashboard/add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}

export default Routers;
