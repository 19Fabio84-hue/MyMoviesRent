import React  from 'react'
import {  Navigate ,Outlet , useLocation} from 'react-router-dom'


export default function AuthRequired(){
  const location = useLocation()
  let login = localStorage.getItem('login' , false)
    if(!login){
      return  <Navigate to='/login'  state={{message : 'You must log in first!' , to: location.pathname}} replace/>
    }
   return <Outlet />
}