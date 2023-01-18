import React from 'react'
import PatientNavbar from './patient-navbar';
import { Toolbar, Typography, Box, Avatar, Card, CardContent, Cardmedia, Container } from '@mui/material';
import { useGetAppointmentsPatientQuery } from '../../../redux/api/appointmentApi';
import { useGetAppointmentHistoryQuery } from '../../../redux/api/appointmentApi';
export default function MyAppointments() {
  const { data: appointments = [] } = useGetAppointmentsPatientQuery()
  const {data: appointmentsHistory=[]}=useGetAppointmentHistoryQuery()
  console.log(appointmentsHistory);
  const moment = require('moment')
  return (
    <Container>
      <PatientNavbar />
      <Toolbar />
      <Typography variant='h4'sx={{color: '#1f8efa' , marginTop:'20px'}}>My appointments:</Typography>
      <Box display='flex' alignItems='center' flexDirection='column' marginTop='30px' sx={{width:'100%'}}>
      {appointments.length>0
      ?
      <>
      {appointments.map(appointment => (
        <Card  sx={{ display: 'flex', marginBottom: '20px', borderRadius: '25px', width:'100%'}}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Avatar
              alt="Doctor photo"
              src={`http://localhost:8800/${appointment.doctor.photo}`}
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box sx={{flexGrow:1,display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight='bold' sx={{ textDecoration: 'underline' }}>
                Doctor details
              </Typography>
              <Typography>
                Doctor: {appointment.doctor.name} {appointment.doctor.surname} {appointment.doctor.middle_name}
              </Typography>
              <Typography>
                Doctor Rating: {appointment.doctor.rating}
              </Typography>
              <Typography>
                Cateory: {appointment.category}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection:'column' }}>
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
          </Box>
        </Card>
      ))}
      </>
      : <Typography variant='h4' color='#1f8efa'>There is no current appointments</Typography>
    }
      </Box>
      {appointmentsHistory.length>0
    ?
    <>
     <Typography variant='h4' sx={{color: '#1f8efa' , marginTop:'20px'}}>
      History of appointments:
    </Typography>
    {appointmentsHistory.map(appointment => (
        <Card  sx={{ display: 'flex', marginBottom: '20px', borderRadius: '25px', width:'100%', opacity:'50%'}}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Avatar
              alt="Doctor photo"
              src={`http://localhost:8800/${appointment.doctor.photo}`}
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box sx={{flexGrow:1,display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight='bold' sx={{ textDecoration: 'underline' }}>
                Doctor details
              </Typography>
              <Typography>
                Doctor: {appointment.doctor.name} {appointment.doctor.surname} {appointment.doctor.middle_name}
              </Typography>
              <Typography>
                Doctor Rating: {appointment.doctor.rating}
              </Typography>
              <Typography>
                Cateory: {appointment.category}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection:'column' }}>
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
          </Box>
        </Card>
      ))}
    </>
    :
    null
    }
    </Container>
  )
}
