import { IFormInput } from "@/typescript/interface/common.interface";

import { IgetSignUpQuery } from "@/typescript/interface/apiresp.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { resolve } from "path";
import { AxiosError } from 'axios' 

export const signUpMutation = async (body: IFormInput) => {
  try {
    const res = await axiosInstance.post<IgetSignUpQuery>(
        endpoints.auth.register,
        body
      );
     
      return res;
  } catch (error : any) {
    if(error instanceof AxiosError){
        console.log(error)
        if(error && error.response && error.response.data){
            toast.error(error?.response?.data?.message)
        }
       
    }
    
  }
};
export const loginMutation = async (body: IFormInput) => {
  try {
    const res = await axiosInstance.post<IgetSignUpQuery>(
        endpoints.auth.login,
        body
      );
      return res;
  } catch (error : any) {
    if(error instanceof AxiosError){
        console.log(error)
        if(error && error.response && error.response.data){
            toast.error(error?.response?.data?.message)
        }
    }
    
  }
};


export const forgotPasswordMutation = async (body: IFormInput) => {
  try {
    const res = await axiosInstance.post<IgetSignUpQuery>(
        endpoints.auth.forgotPassword,
        body
      );
      return res;
  } catch (error : any) {
    if(error instanceof AxiosError){
        console.log(error)
        if(error && error.response && error.response.data){
            toast.error(error?.response?.data?.message)
        }
    }
    
  }
};


export const  resetPasswordMutation = async (body: IFormInput) => {
  try {
    const res = await axiosInstance.post<IgetSignUpQuery>(
        endpoints.auth.resetPassword,
        body
      );
      return res;
  } catch (error : any) {
    if(error instanceof AxiosError){
        console.log(error)
        if(error && error.response && error.response.data){
            toast.error(error?.response?.data?.message)
        }
    }
    
  }
};

export const  fetchDashboard = async () => {
  try {
    const res = await axiosInstance.get(
        endpoints.cms.dashboard
      );
      return res;
  } catch (error : any) {
    if(error instanceof AxiosError){
        console.log(error)
        if(error && error.response && error.response.data){
            toast.error(error?.response?.data?.message)
        }
    }
    
  }
};

