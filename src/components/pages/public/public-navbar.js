import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router'
import { NAVBAR_HEIGHT } from '../../../constants/navbar';
export default function PublicNavbar() {
  const navigate=useNavigate()
  return (
    <AppBar sx={{height: NAVBAR_HEIGHT}}>
    <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={()=>navigate('/')}>
            <LocalHospitalIcon />
        </IconButton>
        <Typography display='flex' fontSize='24px' sx={{ flexGrow: 1 }}>
            Ayurma med
        </Typography>
        <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={()=> navigate('/aboutUs')}>About Us</Button>
            <Button color='inherit' onClick={()=> navigate('/contactUs')}>Contact Us</Button>
            <Button color='inherit' onClick={()=> navigate('/login')}>Login</Button>
        </Stack>
    </Toolbar>
</AppBar>
  )
}
