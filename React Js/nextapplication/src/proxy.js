import { NextResponse } from 'next/server'
import React from 'react'

export default function proxy(request) {

  const isLogin = request.cookies.get('is_login')?.value ?? 0;

  if (isLogin == 1 && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/my-profile', request.url))
  }

  if (isLogin == 0 && request.nextUrl.pathname.startsWith('/my-profile')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}
