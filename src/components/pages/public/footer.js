import React from 'react'
import { Paper, Container, Box, Image, Typography } from '@mui/material'
export default function Footer() {
  return (
    <Box sx={{outline:'1px solid black'}}>
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex"
        }}
      >
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="caption" color="initial">
          Copyright ©2022. Limited
        </Typography>
        <Typography variant="caption" color="initial">
          Copyright ©2022. Limited
        </Typography>
        <Typography variant="caption" color="initial">
          Copyright ©2022. Limited
        </Typography>
      </Box>
    </Box>
  )
}
