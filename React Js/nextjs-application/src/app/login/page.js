'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {

    const router = useRouter();
    var isLogin = 1;

    useEffect(() => {
        if(isLogin == 1){
            router.push('/')
        }
    }, [isLogin])


  return (
    <div className='text-center'>
      Login page
    </div>
  )
}
