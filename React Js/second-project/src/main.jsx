import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './Homepage'
import Header from './Header'
import './assets/css/style.css'
import AboutUs from './AboutUs'
import ShowHidePassword from './ShowHidePassword'
import Contact from './Contact'

createRoot(document.getElementById('root')).render(
  <>
    {/* <AboutUs/> */}


    {/* <ShowHidePassword/> */}


    <Contact/>

  </>,
)
