import { Toolbar, Typography, Box, Avatar} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { useParams, useLocation } from 'react-router'
import { useGetServicesQuery } from '../../../redux/api/serviceApi';
import PatientNavbar from './patient-navbar';
export default function SelectedDoctor() {
    const { state } = useLocation()
    const {data:services=[]}=useGetServicesQuery()
    const {data:service=[]}=useGetServicesQuery(state.id)
    console.log(service);
    const departmentsServices=services.filter(service=> service.departmentId==state.departmentId)
    return (
        <Container>
            <PatientNavbar />
            <Toolbar />
            <Typography variant='h5' sx={{marginTop:'20px', fontWeight:'bold'}} >
                {state.name} {state.surname} {state.middle_name}
            </Typography>
            <Box sx={{ display: 'flex', marginTop:'10px'}} >
                <Typography align='center' sx={{ backgroundColor: "#ede4fe", color: '#4c1199' }}>
                    Experience: {state.experience_in_year} years
                </Typography>
            </Box>
            <Box display='flex' flexDirection='row' sx={{borderRadius:'50px', border:1, paddingLeft:'25px', marginTop:'25px'}}>
                <Box sx={{flexGrow:1}}>
                    <Typography variant='h6' align='left'>
                        Degree: {state.degree}
                    </Typography>
                    <Typography variant='h6' align='left'>
                       Category: {state.category}
                    </Typography>
                    <Typography variant='h6' align='left'>
                       Contact: {state.contact_number}
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'> 
                    <Avatar
                        alt="Doctor photo"
                        src={`http://localhost:8800/${state.photo}`}
                        sx={{ width: 150, height: 150 }}
                    />
                    <Typography color='#1f8efa'>
                        Rating: {state.rating}
                    </Typography>
                </Box>
            </Box>
        </Container>

    )
}
