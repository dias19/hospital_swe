import React from 'react'
import { Typography, Box, Card, CardContent, CardHeader, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import EditDepartment from '../admin-pages/buttons/button-edit-department'
import DeleteDepartment from '../admin-pages/buttons/button-delete-department'
import { useGetDepartmentsQuery } from '../../../redux/api/departmentsApi'
export default function ListOfDepartments() {
    const {data: departments=[]}=useGetDepartmentsQuery()
    return (
        <Container>
            <Typography fontWeight='bold' marginTop='10px' align='center' fontSize='1.5em'>
                List of departments of our hospital:
            </Typography>
            <Box display='flex' flexDirection='row'  sx={{flexWrap:'wrap', alignItems:'baseline'}}>
                {departments.map(department => (
                    <Box key={department.id} sx={{width:'20%', alignSelf:'stretch', marginBottom:'20px',outline:'1px solid black'}}>
                        <Card sx={{height:'100%'}} variant='elevation'>
                            <CardHeader
                                title={<Typography variant="h5" component="div">
                                    <Link to={`/department/${department.id}`}>{department.department_name}</Link>
                                </Typography>}
                                action={<>
                                <EditDepartment object={department} id={department.id} /> 
                                <DeleteDepartment id={department.id} />
                                </>}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                   {department.department_info}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    )
}
