import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';
import axios from 'axios';

export default function Header() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
    .then((result) => {
      setCategories(result.data)
    })
    .catch(() => {
        toast.error('Somenthing went wrong !!')
    })
  },[])

  return (
    <>
      <ToastContainer />

      <header>
        <div class="container header-container">
          <div class="flex items-center space-x-10">
            <nav class="nav-links">
              <Link to="/" class="nav-link active">Home</Link>

              {
                categories.map((v,i) => {
                  return(

                    (i < 7)
                    ?
                    <Link to={`/products/${v.slug}`} class="nav-link">{v.name}</Link>
                    :
                    ''
                    
                  )
                })
              }
              <Link to="/products" class="nav-link">All Products</Link>
            
              <Link to="/about-us" class="nav-link">About Us</Link>
              <Link to="/contact-us" class="nav-link">Contact Us</Link>
            </nav>
          </div>

          <div class="icons">
            <button class="icon-btn">
              <i class="fas fa-search"></i>
            </button>
            <button class="icon-btn">
              <i class="fas fa-bell"></i>
            </button>
            <button class="icon-btn">
              <i class="fas fa-heart"></i>
            </button>
            <button class="icon-btn" id="cart-button">
              <i class="fas fa-shopping-cart"></i>
            </button>
            <div class="user-icon">
              <i class="fas fa-user"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
