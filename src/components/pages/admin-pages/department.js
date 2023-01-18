import { Typography, Toolbar, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import Navbar from './admin-navbar'
import DepartmentDetails from './department-details'
import { useGetDoctorsQuery } from '../../../redux/api/usersApi'
import { useGetDepartmentsQuery } from '../../../redux/api/departmentsApi'
export default function Department() {
    const { id } = useParams()
    const {data:departments=[]}=useGetDepartmentsQuery()
    const {data:doctors=[]}=useGetDoctorsQuery()
    const departmentDoctors=doctors.filter(doctor=> doctor.departmentId==id)
    const selectedDepartment = departments.filter(department => department.id == id)
    return (
        <Container>
            <Navbar />
            <Toolbar/>
            <Typography align='center' fontWeight='bold' fontSize='2rem'>
                    {selectedDepartment[0]?.department_name}
                </Typography>
                <Typography sx={{ textDecoration: 'underline', fontWeight: 'bold', paddingBottom: 1 }}>
                    Departament ID:{selectedDepartment[0]?.id}
                </Typography>
                <Typography sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {selectedDepartment[0]?.department_info}
                </Typography>
            {departmentDoctors?.length>0 
            ?  <DepartmentDetails/> 
            :  <Typography 
            align='center' 
            fontWeight='bold'
            >No doctors are assigned to departament
            </Typography>}
        </Container>
    )
}
