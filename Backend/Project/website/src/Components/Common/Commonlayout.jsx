'use client'
import { store } from '@/ReduxToolkit/ReduxStore'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

export default function Commonlayout({ children }) {
  return (
    <>
    <ToastContainer/>
    <Provider store={ store }>
        { children }
    </Provider>
        
    </>
  )
}
