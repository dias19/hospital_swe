import { Toolbar} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import DoctorNavbar from './doctor-navbar'
import { useGetDoctorQuery } from '../../../redux/api/doctorApi'
export default function HomePageDoctor() {
  const conversation=useSelector(state=> state.conversation)
  console.log(conversation);
  const {data:doctor=[]}=useGetDoctorQuery()
  return (
    <>
    <DoctorNavbar/>
    <Toolbar/>
    <div>HomePageDoctor</div>
    </>
  )
}
