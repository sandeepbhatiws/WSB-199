import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import Home from './Components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import ProductListing from './Components/ProductListing';
import Header from './Components/Common/Header';
import Commonlayout from './Components/Commonlayout';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>


        <Route element={<Commonlayout />}>
          <Route path='/' element={<Home />} />
          <Route path='about-us' element={<AboutUs />} />
        </Route>


        <Route path='contact-us' element={<ContactUs />} />

        {/* <Route path='products' element={ <ProductListing/> } /> */}
        <Route path='products/:slug?' element={<ProductListing />} />


      </Routes>
    </BrowserRouter>

  </>,
)
