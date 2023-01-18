import { Chip,Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { useGetServicesQuery } from '../../../redux/api/serviceApi'
export default function DoctorServices({doctorId}) {
    const {data:services=[]}=useGetServicesQuery(doctorId)
    const navigate=useNavigate()
  return (
    <>
    {services?.map(service=> (
        <Chip key={service.id} label={service.service_name} sx={{ maxWidth:'150px', marginBottom:'5px'}} onClick={()=>navigate(`/selectedService/${service.id}`)} color='success'/>
    ))}
    </>
  )
}
