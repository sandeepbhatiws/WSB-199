import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { CommonContext } from './Common/ContextApi';

export default function Login() {

    // const { isLogin } = useContext(CommonContext);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if(isLogin){
    //         navigate('/')
    //     }
    // }, [isLogin])

  return (
    <>
      <h1>Login Page</h1>
    </>
  )
}
