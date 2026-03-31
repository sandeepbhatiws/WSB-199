import React, { useState } from 'react'
import Form from './Form'
import Table from './Table'
import { ToastContainer } from 'react-toastify';

export default function HomePage() {

    var userInfo = localStorage.getItem('userInfo');
    var userInfo = JSON.parse(userInfo);

    const [userData, setUserData] = useState(userInfo ?? []);

    return (
        <>
            <ToastContainer/>
            <div class="main">
                
                <Form userData={userData} setUserData={setUserData}/>

                <Table data={userData}/>
            </div>
        </>
    )
}
