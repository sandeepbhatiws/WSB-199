import React, { useState } from 'react'
import List from './List';

export default function Contact() {

    const [list, SetList] = useState(['WsCubetech', 'info@gmail.com', 1234567890]);

  return (
    <>

        {/* <List heading="This is heading" description='This is description'/> */}

        {/* <List heading="This is heading" description='This is description'>
            This is children
        </List> */}
      
      {
        list.map((value) => {
            return(
                <List title={ value }/>
            )
        })
      }


    </>
  )
}
