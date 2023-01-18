import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useGetDoctorsQuery } from '../../../redux/api/usersApi'
import { useGetServicesQuery } from '../../../redux/api/serviceApi'
import ListServices from './list-services'
export default function DepartmentDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: services = [] } = useGetServicesQuery()
    const departmentServices = services.filter(service => service.departmentId == id)
    const { data: doctors } = useGetDoctorsQuery()
    const departmentDoctors = doctors.filter(doctor => doctor.departmentId == id)
    return (
        <>
            <Box display='flex' flexDirection='column'>
                <Typography fontWeight='bold' sx={{ paddingTop: 1 }} >
                    Our doctors:
                </Typography>
                <Box display='flex'>
                    {departmentDoctors.map(doctor => (
                        <Box width='300px' key={doctor.id} height='auto' sx={{ marginRight: '10px', border: 1, color: 'grey' }}>
                            <img
                                src={`http://localhost:8800/${doctor.photo}`}
                                alt='None'
                                loading="lazy"
                                width='300px'
                                height='300px'
                            />
                            <Typography sx={{ paddingTop: 1, color: 'black' }} align='center'>
                                {doctor.name} {doctor.middle_name} {doctor.surname}
                            </Typography>
                            <Typography align='center' color='black'>
                                Experience: {doctor.experience_in_year} year
                            </Typography>
                            <Typography align='center' color='black'>
                                Rating: {doctor.rating} 
                            </Typography>
                            <Typography align='center' color='black'>
                                Degree: {doctor.degree} 
                            </Typography>
                            <Typography align='center' color='black'>
                                Category: {doctor.category} 
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            {departmentServices.length > 0
                ? <ListServices />
                : <Typography variant='h6' align='center' marginBottom="20px" marginTop='20px'>No services are created.Please create a service</Typography>
            }
            <Button variant='contained' sx={{ width: 'auto', display: 'block', margin: '0 auto'}} onClick={() => navigate(`/createService/${id}`)}>
                Create Service
            </Button>
        </>
    )
}
