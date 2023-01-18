import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminRoutes } from './admin-routes'
import { DoctorRoutes } from './doctor-routes'
import { PatientRoutes } from './patient-routes'
import { PublicRoutes } from './public-routes'
export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
        {PublicRoutes}
        {AdminRoutes}
        {DoctorRoutes}
        {PatientRoutes}
    </Routes>
    </BrowserRouter>
  )
}
