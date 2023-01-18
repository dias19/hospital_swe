import { useNavigate } from 'react-router'
import Navbar from './admin-navbar'
import { Box, Button, Typography, Toolbar, Container } from '@mui/material'
import ListOfDepartments from './list-departments'
import { useGetDepartmentsQuery } from '../../../redux/api/departmentsApi'
export const DepartamentPage = () => {
    const {data:departments=[]}=useGetDepartmentsQuery()
    const navigate = useNavigate()
    return (
        <Container>
            <Navbar />
            <Toolbar />
            {departments.length>0 ? <ListOfDepartments/> : <Typography align='center'>Please Create a department</Typography>}
            <Box display='flex' justifyContent='center'>
                <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => navigate('/createDepartment')}>
                    Create Departament
                </Button>
            </Box>
        </Container>
    )
}
