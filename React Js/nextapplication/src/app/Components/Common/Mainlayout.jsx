'use client'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import { ReduxStore } from '@/app/ReduxToolkit/ReduxStore'
import { ToastContainer } from 'react-toastify'

export default function Mainlayout({children}) {
  return (
    <>
      <Provider store={ ReduxStore }>
        <ToastContainer/>
        <Header/>

          {children}

        <Footer/>
      </Provider>
      
    </>
  )
}
