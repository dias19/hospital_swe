import { Toolbar, Typography, Box, Container } from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import FilteredDoctorList from './filtered-doctors-list'
import FilteredServices from './filtered-services'
import PatientNavbar from './patient-navbar'
import FilteredDepartments from './filtered-departments'
import { useGetPatientQuery } from '../../../redux/api/patientApi'
export default function SearchResult() {
    const [searchParams] = useSearchParams()
    const searched = searchParams.get('query')
    const {data:patient=[]}=useGetPatientQuery()
    return (
        <Container sx={{paddingTop:'10px'}}>
            <PatientNavbar />
            <Toolbar />
            <Typography variant='h4'>
                Results for the search of "{searched}"
            </Typography>
            <Box>
                <Typography variant='h5'fontWeight='bold' sx={{marginTop:'10px'}}>
                    Doctors:
                </Typography>
                <FilteredDoctorList searched={searched}/>
                <Typography variant='h5'fontWeight='bold'>
                    Services:
                </Typography>
                <FilteredServices searched={searched}/>
                <Typography variant='h5'fontWeight='bold' sx={{marginTop:'10px'}}>
                    Departments:
                </Typography>
                <FilteredDepartments searched={searched}/>
            </Box>

        </Container>
    )
}
