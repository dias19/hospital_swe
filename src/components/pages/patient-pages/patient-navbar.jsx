import React from 'react'
import { AppBar, Toolbar, Button, IconButton, Stack, Typography} from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { logOut } from '../../../redux/auth-slice'
import { useNavigate } from 'react-router'
import {useDispatch} from 'react-redux'
import { logoutState } from '../../../redux/conversation-slice';
export default function PatientNavbar() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    function handleClick(){
        dispatch(logOut())
        dispatch(logoutState())
        navigate('/')
    }
  return (
   <AppBar>
    <Toolbar>
    <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={()=>navigate('/homePatient')}>
            <LocalHospitalIcon />
        </IconButton>
        <Typography display='flex' sx={{ flexGrow: 1 }}>
            Hospital
        </Typography>
        <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={()=> navigate('/myAppointments')}>My Appointments</Button>
            <Button color='inherit' onClick={()=>navigate('/messages')}>Message</Button>
            <Button color='inherit' onClick={handleClick}>Logout</Button>
        </Stack>
    </Toolbar>
   </AppBar>
  )
}
