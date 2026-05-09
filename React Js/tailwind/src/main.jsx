import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './assets/css/style.css'
import HomePage from "./Components/HomePage";
import CommonLayout from "./Components/Common/CommonLayout";
import ProductListing from "./Components/ProductListing";
import Cart from "./Components/Cart";
import Login from "./Components/Login";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>

      <Route element={<CommonLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-listings" element={<ProductListing />} />
        <Route path="/product-details/:id" element={<HomePage />} />
        <Route path="/view-cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/admin-panel" >
          <Route path="categories">
            <Route path="create" element={<Login />} />
            <Route path="view" element={<Login />} />
            <Route path="edit" element={<Login />} />
          </Route>


        <Route path="products/create" element={<Login />} />
        <Route path="products/view" element={<Login />} />
        <Route path="products/edit" element={<Login />} />
      </Route>





    </Routes>
  </BrowserRouter>,
);
