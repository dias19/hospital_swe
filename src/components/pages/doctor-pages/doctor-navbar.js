import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router';
import { logOut } from '../../../redux/auth-slice';
import { logoutState } from '../../../redux/conversation-slice';
import { useDispatch } from 'react-redux';
export default function DoctorNavbar() {
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
    <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={()=>navigate('/homeDoctor')}>
            <LocalHospitalIcon />
        </IconButton>
        <Typography display='flex' sx={{ flexGrow: 1 }}>
            Hospital
        </Typography>
        <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={()=> navigate('/myAppointmnetsDoctor')}>My Appointments</Button>
            <Button color='inherit' onClick={()=> navigate('/messageDoctor')}>Message</Button>
            <Button color='inherit' onClick={handleClick}>Logout</Button>
        </Stack>
    </Toolbar>
   </AppBar>
  )
}
