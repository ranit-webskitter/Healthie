import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { toast } from "react-toastify";

export const  fetchHomePageContent = async () => {
    try {
      const res = await axiosInstance.get(
          endpoints.cms.homePageContent
        );
        return res.data.data;
    } catch (error : any) {
      if(error instanceof AxiosError){
          console.log(error)
          if(error && error.response && error.response.data){
              toast.error(error?.response?.data?.message)
          }
      }
      
    }
  };
 
  export const  fetchTestimonial = async () => {
    try {
      const res = await axiosInstance.get(
          endpoints.cms.testimonials
        );
        return res.data?.data?.testimonials;
    } catch (error : any) {
      if(error instanceof AxiosError){
          console.log(error)
          if(error && error.response && error.response.data){
              toast.error(error?.response?.data?.message)
          }
      }
      
    }
  };