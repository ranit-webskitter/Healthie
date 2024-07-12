// import React from 'react'
// import Header from '../Header/Header'
// type wrapperProps ={
//     children:React.JSX.Element 
//   }
  
// const wrapper : React.FC<wrapperProps> = (props) => {
//     const {children}=props
//   return (
//     <>
//     <Header/>
//     {children}
    
//     </>
//   )
// }

// export default wrapper

import React from 'react'
import Header from '../Header/Header'
import { JSX } from "react"
type wrapperProps ={
    children:React.JSX.Element 
  }
  
const wrapper : React.FC<wrapperProps> =(props: { children: JSX.Element })=> {
    
  return (
    <>
    <Header/>
   { props.children}
    
    </>
  )
}

export default wrapper
