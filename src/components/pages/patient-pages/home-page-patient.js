import { Toolbar, Typography, Box, Card, CardMedia, CardActionArea, TextField, InputAdornment, Button, Autocomplete, Container } from '@mui/material'
import React, { useState, useMemo } from 'react'
import PatientNavbar from './patient-navbar'
import { useGetDepartmentsQuery } from '../../../redux/api/departmentsApi'
import { images } from '../../../assets/images'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListDepartmentServices from './list-department-services'
import SearchIcon from '@mui/icons-material/Search';
import { useGetDoctorsQuery } from '../../../redux/api/usersApi'
import { useGetServicesQuery } from '../../../redux/api/serviceApi'
import { useGetPatientQuery } from '../../../redux/api/patientApi'
import { useNavigate } from 'react-router'
import { useGetConversationQuery } from '../../../redux/api/conversationApi'
export default function HomePagePatient() {
  const { data: departments = [] } = useGetDepartmentsQuery()
  const { data: doctors = [] } = useGetDoctorsQuery()
  const { data: services = [] } = useGetServicesQuery()
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()
  const departmentNames = departments.map(department => department.department_name)
  const serviceNames = services.map(service => service.service_name)
  const doctorsFullName = doctors.map(doctor => doctor.name + " " + doctor.surname + ' ' + doctor.middle_name)
  const searchOptions = [].concat(departmentNames, serviceNames, doctorsFullName)
  const [currentDepartment, setCurrentDepartment] = useState(null)
  function handleSubmit() {
    navigate(`/search?query=${selected}`)
  }
  const randomNumbers=useMemo(() => {
    const randomNumbers = []
    for (let i = 0; i < departments.length; i++) {
      randomNumbers.push(Math.floor(Math.random() * images.length))
    }
    return randomNumbers
  } ,[])
  return (
    <Container>
      <PatientNavbar />
      <Toolbar />
      <Box>
        <Typography sx={{ fontSize: '48px', color: '#1f8efa' , marginTop:'20px'}}>Search a needed service, doctor, and department</Typography>
        <Box display='flex' marginBottom='20px' marginTop='20px'>
          <Autocomplete
            freeSolo
            onChange={(event, value) => setSelected(value)}
            disableClearable
            sx={{width:'100%'}}
            options={searchOptions}
            renderInput={(params) => (
              <TextField
                onChange={(event, value) => setSelected(event.target.value)}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  placeholder: 'Doctors, services in our hospital',
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: { borderRadius: 25 }
                }}
              />
            )}
          />

          <Button color='info' sx={{ marginLeft: '10px', borderRadius: '100px', minWidth: '120px' }} onClick={handleSubmit} variant='contained'>
            Search
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant='h4' align='left' sx={{ color: '#1f8efa' }}>Our Services:</Typography>
        <Box style={{ maxHeight: 300, overflow: 'auto', display: 'flex', flexWrap: 'nowrap', marginTop: '20px', marginBottom: '20px' }}>
          {departments.map((department, index) => (
            <Card key={index} sx={{ flex: '0 0 auto', width: '20%', height: '300px', marginRight: '10px', background: '#E0E0E3' }} >
              <CardMedia
                component="img"
                height="250px"
                image={images[randomNumbers[index]]}
              />
              <CardActionArea onClick={() => setCurrentDepartment(department)} sx={{width:'100%'}}>
                <Typography align='center'>
                  {department.department_name}
                </Typography>
                <Typography align='center'>
                  <ExpandMoreIcon />
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        {currentDepartment ? <ListDepartmentServices department={currentDepartment} /> : null}
      </Box>
    </Container>
  )
}
