import { userData } from "@/typescript/types/common.type";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { userSliceData } from "@/rdux-toolkit/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { Cookie } from "next/font/google";

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginData: (state, { payload }: { payload: userData }) => {
      // state.email
      state.userData = payload;
      state.isLoggedIn = true;
    
    },
    checkLoggedInServer: (state, { payload }) => {
      state.isLoggedIn = payload?.token;
      state.userData = payload?.data?.data;
     
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
     
      destroyCookie(null, "user", { path: "/" });
      destroyCookie(null, "token", { path: "/" });

      window.location.href = "/login";
    },
    check_token:(state)=>{
      const cookies = parseCookies()
      const token=cookies.token
      if(token){
        state.isLoggedIn=true
        
      }

    }
  },
});

export const { setLoginData, checkLoggedInServer, logout,check_token } = userSlice.actions;

export default userSlice.reducer;
