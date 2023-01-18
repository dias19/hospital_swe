import Navbar from "./admin-navbar"
import {Container, Toolbar, Typography } from '@mui/material'
import ListDoctors from "./list-doctors"
import ListPatients from "./list-patients"
import { useGetDoctorsQuery } from "../../../redux/api/usersApi"
import { useGetPatientsQuery } from "../../../redux/api/usersApi"
function HomePageAdmin() {
    const {data:doctors=[]}=useGetDoctorsQuery()
    const {data:patients=[]}=useGetPatientsQuery();
    
    return (
        <Container>
            <Navbar />
            <Toolbar />
            {patients.length>0 ? <ListPatients/> : <Typography fontSize='1.5em' align='center'>No registered patients</Typography>}
            {doctors.length>0 ? <ListDoctors/> : <Typography fontSize='1.5em' align='center'>No registered doctors</Typography>}
        </Container>
    )
}
export default HomePageAdmin