import { Container, Toolbar, Typography, Box} from '@mui/material'
import React from 'react'
import { useGetConversationQuery } from '../../../redux/api/conversationApi'
import { useGetPatientQuery } from '../../../redux/api/patientApi'
import {Link} from 'react-router-dom' 
import { useGetDoctorsQuery } from '../../../redux/api/usersApi';
import PatientNavbar from './patient-navbar'
export default function ListConversationsPatient() {
    const {data:patient=[]}=useGetPatientQuery()
    const {data: doctors=[]}=useGetDoctorsQuery()
    const {data:conversations=[]}=useGetConversationQuery()
  return (
    <Container>
    <PatientNavbar/>
    <Toolbar/>
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
    <Typography align='center' variant='h5'>
      List of all my conversations:
    </Typography>
    {conversations.map(conversation=>(
      <Typography align='center' variant='h5'>
        <Link
        to={`/messages/${conversation.id}`}
        state={conversation}
        >
        {conversation.id}
        </Link>
      </Typography>
       ))}
    </Box>
    </Container>
  )
}
