import React from 'react'
import { Button, Box, Toolbar} from '@mui/material'
import { useNavigate } from 'react-router' 
import Footer from './footer'
import PublicNavbar from './public-navbar'
import { Container } from '@mui/system'
import { NAVBAR_HEIGHT } from '../../../constants/navbar'
export default function Public() {
    const navigate=useNavigate()
  return (
    <>
   <PublicNavbar/>
   <Box display='flex' flexDirection='column' sx={{marginTop: `${NAVBAR_HEIGHT}px`, minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`}}>
    <Container sx={{flex:1}}>
      <h1>dlfls</h1>
    </Container>
    <Footer/>
   </Box>
  </>
  )
}
