import { userData } from "@/typescript/types/common.type";
import { BaseApiResponse } from "./common.interface";

export interface IgetSignUpQuery extends BaseApiResponse{
   data: userData,
   statusCode:number
  }
  