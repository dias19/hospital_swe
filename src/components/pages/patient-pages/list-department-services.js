import { Box, Typography } from '@mui/material'
import React from 'react'
import useDepartmentServices from '../../../hooks/useDepartmentServices'
import { images } from '../../../assets/images'
import {Link} from 'react-router-dom'
export default function ListDepartmentServices({ department }) {
    const departmentServices = useDepartmentServices(department.id)
    console.log(departmentServices);
    return (
        <>
        {departmentServices.length>0 
        ?
        <Box sx={{backgroundColor:'#E0E0E3',margin:'auto', padding:'10px'}}>
            {departmentServices.map(service => (
                <Typography key={service.id} align='left'>
                    <Link to={`/selectedService/${service.id}`}>{service.service_name}</Link>
                </Typography>
            ))}
        </Box>
        :
        <Typography align='center'> No services found</Typography>
        }
        </>
    )
}
