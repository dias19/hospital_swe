import React from 'react'
import { useParams} from 'react-router'
import {Link} from 'react-router-dom'
import { useGetServicesQuery } from '../../../redux/api/serviceApi'
import { Typography } from '@mui/material'
export default function ListServices() {
    const {id}=useParams()
    const {data: services=[]}=useGetServicesQuery()
    const departmentServices = services.filter(service => service.departmentId == id)
  return (<>
    <Typography fontWeight='bold'>
        Our services:
    </Typography>
    {departmentServices?.map(service => (
        <Typography key={service.id}>
            <Link to={`/service/${service.id}`}>{service.service_name}</Link>
        </Typography>
    ))}
</>)
}
