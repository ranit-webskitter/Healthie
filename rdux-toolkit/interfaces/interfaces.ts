import { userData } from "@/typescript/types/common.type";


export interface userSliceData {
  isLoggedIn: boolean;
  userData: userData | null;
}

export interface registrationData {}



export interface globalStateInterface {
  counter: number;
}
