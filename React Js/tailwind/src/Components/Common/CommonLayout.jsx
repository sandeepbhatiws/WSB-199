import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import ContextApi from './ContextApi'

export default function CommonLayout() {
  return (
    <>
      <ContextApi>

        <Header />

        <Outlet />

        <Footer />

      </ContextApi>
    </>
  )
}
