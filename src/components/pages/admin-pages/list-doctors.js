import { ButtonEditDoctor } from './buttons/button-edit-doctor';
import { ButtonDeleteDoctor } from './buttons/button-delete-doctor';
import { Typography, Box, Card, CardMedia, CardHeader, CardContent, Container } from '@mui/material';
import { useGetDoctorsQuery } from '../../../redux/api/usersApi';
export default function ListDoctors() {
    const {data:doctors}=useGetDoctorsQuery()
    return (
        <>
            <Typography align='center' variant='h6'>Our doctors:</Typography>
            <Box display='flex'>
                {doctors.map((doctor) => (
                    <Box key={doctor.id} sx={{ width: '20%', alignSelf: 'stretch', marginBottom: '20px', outline: '1px solid black', marginRight:'20px' }}>
                        <Card sx={{ height: '100%' }} variant='elevation'>
                            <CardMedia
                                sx={{ height: 240 }}
                                image={`http://localhost:8800/${doctor.photo}`}
                                title="Doctor photo"
                            />
                            <CardHeader
                                title={<Typography fontWeight='bold' align='left'>
                                    {doctor.name} {doctor.middle_name} {doctor.surname}
                                </Typography>}
                                action={<>
                                    <ButtonEditDoctor id={doctor.id} />
                                    <ButtonDeleteDoctor userId={doctor.userId} />
                                </>
                                }
                            />
                            <CardContent>
                                <Box display='flex' flexDirection='column'>
                                    <Typography variant="body">
                                        IIN: {doctor.iin}
                                    </Typography>
                                    <Typography variant="body">
                                        Government ID: {doctor.government_id}
                                    </Typography>
                                    <Typography variant='body'>
                                        Email: {doctor.email}
                                    </Typography>
                                    <Typography variant='body'>
                                        Date Of Birth: {doctor.date_of_birth}
                                    </Typography>
                                    <Typography variant='body'>
                                        Contact number: {doctor.contact_number}
                                    </Typography>
                                    <Typography variant='body'>
                                        Address: {doctor.address}
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