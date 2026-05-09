import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

var is_login = Cookies.get('is_login')

const initialState = {
  isLogin: is_login ?? 0,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = 1;
      Cookies.set('is_login' , 1)
      console.log('Login')
    },
    register: (state) => {
    },
    logout: (state) => {
      state.isLogin = 0;
      Cookies.remove('is_login')
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = loginSlice.actions

export default loginSlice.reducer