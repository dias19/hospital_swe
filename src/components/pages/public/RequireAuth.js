import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router'
export default function RequireAuth(props) {
    const {role}=useSelector(state=>state.auth)
    const location=useLocation()
  return (
    props.allowableRoles.includes(role)
    ? <Outlet/>
    : <Navigate to='/login' state={{from: location}} replace/>
  )
}
