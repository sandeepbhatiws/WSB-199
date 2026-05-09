import { NextResponse } from 'next/server'
import React from 'react'

export default function proxy(request) {

    var isLogin = 1;

    // if (isLogin == 1 && request.nextUrl.pathname.startsWith('/login')) {
    //     return NextResponse.rewrite(new URL('/', request.url))
    // }

    if (isLogin == 1 && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    // }

    return NextResponse.next()
}
