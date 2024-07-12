import { register } from "module";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;
export const baseUrlMedia = process.env.NEXT_PUBLIC_BASE_URL;


export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
}

export const endpoints = {
  auth: {
    register:'register',
    login:'login',
    forgotPassword:'forgot-password',
    resetPassword: 'create-new-password'
  },
  cms: {
    dashboard:'my-profile'
}
}

export const sucessNotificationEndPoints = [
        endpoints.auth.register,
        endpoints.auth.forgotPassword,
        endpoints.auth.resetPassword,
        endpoints.cms.dashboard
  
];
