import { Toolbar, Typography,Box, Avatar, Card, Button} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { useGetAppointmentsDoctorQuery } from '../../../redux/api/appointmentApi'
import DoctorNavbar from './doctor-navbar';
import { usePatchAppointmentDoctorMutation } from '../../../redux/api/appointmentApi';
export default function MyAppointmentDoctor() {
    const moment=require('moment')
    const [patchAppointmentDoctor]=usePatchAppointmentDoctorMutation()
    const { data: appointments = [] } = useGetAppointmentsDoctorQuery()
    console.log(appointments);
    return (
        <Container>
            <DoctorNavbar />
            <Toolbar />
            <Typography sx={{ fontSize: '48px', color: '#1f8efa', marginTop: '20px' }}>My appointments</Typography>
            <Box display='flex' alignItems='center' flexDirection='column' marginTop='30px' sx={{ width: '100%' }}>
                {appointments.map(appointment => (
                    <Card key={appointment.id} sx={{ display: 'flex', marginBottom: '20px', borderRadius: '25px', width: '100%' }}>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Avatar
                                alt={appointment.patient.name}
                                sx={{ width: 150, height: 150 }}
                            />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography fontWeight='bold' sx={{ textDecoration: 'underline' }}>
                                    Patient
                                </Typography>
                                <Typography>
                                    Patient: {appointment.patient.name} {appointment.patient.surname} {appointment.patient.middle_name}
                                </Typography>
                                <Typography>
                                    Patient phone: {appointment.patient.contact_number}
                                </Typography>
                                <Typography>
                                    Blood Group: {appointment.patient.blood_group}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                                    Service details
                                </Typography>
                                <Typography>
                                    Service: {appointment.service.service_name}
                                </Typography>
                                <Typography>
                                    Duration: {appointment.service.duration}
                                </Typography>
                                <Typography>
                                    Price: {appointment.service.price}
                                </Typography>
                                <Typography>
                                    Time: {moment(appointment.startDate).format('lll')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }}>
                                <Button variant='contained' sx={{borderRadius:'100px'}} onClick={()=> patchAppointmentDoctor(appointment.id)}>
                                    Finish appointment
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}
