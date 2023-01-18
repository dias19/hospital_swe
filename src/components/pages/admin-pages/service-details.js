import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { Box, Button, Container, Toolbar, Typography } from '@mui/material'
import Navbar from './admin-navbar'
import { useGetServiceQuery, useDeleteServiceMutation } from '../../../redux/api/serviceApi'
export default function ServiceDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const {data:selectedService=[]}=useGetServiceQuery(id)
    const [deleteService]=useDeleteServiceMutation()
    
    async function handleClick() {
        const response=await deleteService(id)
        console.log(response);
        alert('Service has been deleted successfully')
        navigate(-1)
    }
    console.log(selectedService)
    return (
        <Container>
            <Navbar />
            <Toolbar />
            <Typography align='center' fontWeight='bold' fontSize='1.5rem' sx={{ paddingBottom: '10px' }}>
                Service: {selectedService.service_name}
            </Typography>
            <Typography fontWeight='bold' sx={{ paddingBottom: '10px' }}>
                Duration:{selectedService.duration} min
            </Typography>
            <Typography fontWeight='bold' sx={{ paddingBottom: '10px' }}>
                Price: {selectedService.price} tg
            </Typography>
            <Typography fontWeight='bold' sx={{ textDecoration: 'underline', paddingBottom: '10px' }}>Treating doctors:</Typography>
            <Box display='flex' marginBottom='30px'>
                {selectedService.doctors?.map(doctor => (
                    <Box width='300px' key={doctor.id} height='380px' sx={{ marginRight: '10px', border: 1, color: 'grey' }}>
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
                            Doctor's price: {doctor.doctorService.price} tg
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Button variant='contained' sx={{ width: 'auto', display: 'block', margin: '0 auto' }} onClick={handleClick}>
                Delete Service
            </Button>
        </Container>
    )
}
