import React from 'react'
import { Route } from 'react-router'
import Layout from '../components/pages/public/Layout'
import Public from '../components/pages/public/home-public'
import Login from '../components/authorization/login'
import Unauthorized from '../components/pages/public/unauthorized'
import AboutUs from '../components/pages/public/about-us'
import ContactUs from '../components/pages/public/contanct-us'
export const PublicRoutes = [
    <Route  path='/' element={<Public />} />,
    <Route  path='/login' element={<Login />} />,
    <Route  path='/unauthorized' element={<Unauthorized />} />,
    <Route path='/aboutUs' element={<AboutUs />} />,
    <Route path='/contactUs' element={<ContactUs />} />
]
