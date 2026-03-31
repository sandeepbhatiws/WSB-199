import React from 'react'
import Header from './Header'

export default function Homepage() {

    var heading = 'Welcome to WsCubeTech';
    var status = 1;


  return (
    <>
        {
            status == 1
            ?
            <Header></Header>
            :
            ''
        }

    



    <header></header>
      <div style={{ backgroundColor : 'black', color : 'white' }} >
        <h1> { heading } </h1>
      </div>
    </>
  )
}
