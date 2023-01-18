import * as React from 'react';
import { Box, Typography,Card,CardContent, CardHeader, Container } from '@mui/material';
import { useGetPatientsQuery } from '../../../redux/api/usersApi';
import ButtonEditPatient from './buttons/button-edit-patient'
import {ButtonDeletePatient} from './buttons/button-delete-patient'
export default function ListPatients() {
    const {data:patients}=useGetPatientsQuery()
    console.log(patients);
    return (
        <>
            <Typography margin='normal' variant='h6' align='center'>Patients:</Typography>
            <Box display='flex'> 
            {patients.map((patient) => (
                <Box key={patient.id} sx={{ width: '20%', alignSelf: 'stretch', marginBottom: '20px', marginRight:'20px', borderRadius:'50px'}}>
                    <Card sx={{ height: '100%' }} variant='elevation'>
                        <CardHeader
                            title={<Typography fontWeight='bold' align='left'>
                                {patient.name} {patient.middle_name} {patient.surname}
                            </Typography>}
                            action={<>
                                <ButtonEditPatient id={patient.id}/>
                                <ButtonDeletePatient id={patient.userId}/>
                            </>}
                        />
                        <CardContent>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant="body">
                                IIN: {patient.iin}
                            </Typography>
                            <Typography variant="body">
                                Government ID: {patient.government_id}
                            </Typography>
                            <Typography variant='body'>
                                Email: {patient.email}
                            </Typography>
                            <Typography variant='body'>
                            Date Of Birth: {patient.date_of_birth}
                            </Typography>
                            <Typography variant='body'>
                            Blood Group: {patient.blood_group}
                            </Typography>
                            <Typography variant='body'>
                            Contact number: {patient.contact_number}
                            </Typography>
                            <Typography variant='body'>
                            Emergency contact number: {patient.emergency_contact_number}
                            </Typography>
                            <Typography variant='body'>
                            Address: {patient.address}
                            </Typography>
                            <Typography variant='body'>
                            Marital status: {patient.marital_status}
                            </Typography>
                        </Box>
                        </CardContent>
                    </Card>
                </Box>
            ))}
            </Box>
        </>
    );
}