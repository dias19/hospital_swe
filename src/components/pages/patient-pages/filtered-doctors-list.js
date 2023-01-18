import { Typography, Card, Box, CardMedia, CardContent, CardHeader, Avatar, Container, Button } from '@mui/material'
import React from 'react'
import { useGetDoctorsQuery } from '../../../redux/api/usersApi'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link, useNavigate } from 'react-router-dom';
import DoctorServices from './doctor-services';
import { useGetPatientQuery } from '../../../redux/api/patientApi';
import { usePostConversationMutation } from '../../../redux/api/conversationApi';
export default function FilteredDoctorList({ searched }) {
    const [postConversation]=usePostConversationMutation()
    const {data:patient=[]}=useGetPatientQuery()
    const { data: doctors = [] } = useGetDoctorsQuery()
    const navigate=useNavigate()
    const searchedWithoutSpace = searched.replace(/\s/g, '')
    const foundDoctors = doctors.filter(doctor => {
        if (doctor.name.toLowerCase().includes(searched.toLowerCase()))
            return doctor
        else if (doctor.surname.toLowerCase().includes(searched.toLowerCase()))
            return doctor
        else if (doctor.middle_name.toLowerCase().includes(searched.toLowerCase()))
            return doctor
        else if ((doctor.name + doctor.surname + doctor.middle_name).toLowerCase().includes(searchedWithoutSpace.toLowerCase()))
            return doctor
    })
    async function createConversation(doctor){
        const usersData={
            firstId: patient[0].userId,
            secondId: doctor.userId
        }
        const response=await postConversation(usersData)
        navigate(`/messages/${response.data.id}`, {state:{usersData,doctor}})
    }
    return (
        <>
            {foundDoctors.length > 0
                ?
                <Box display='flex' flexDirection='column' sx={{ width: '100%' }}>
                    {foundDoctors.map((doctor, index) => (
                        <Box key={doctor.id} width='100%'>
                            <Card sx={{ display: 'flex', marginBottom: '10px', borderRadius: '25px', width: '100%', padding: '50px' }}>
                                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                    <Avatar
                                        alt="Doctor photo"
                                        src={`http://localhost:8800/${doctor.photo}`}
                                        sx={{ width: 150, height: 150 }}
                                    />
                                    <Typography marginTop='5px' marginBottom='5px' sx={{ color: '#1f8efa' }}>
                                        Rating: {doctor.rating}
                                    </Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1, border: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Box>
                                        <Typography fontWeight='bold' variant='h6'>
                                            {doctor.name} {doctor.surname} {doctor.middle_name}
                                        </Typography>
                                        <Typography align='center' sx={{ backgroundColor: "#ede4fe", color: '#4c1199' }}>
                                            Experience: {doctor.experience_in_year} years
                                        </Typography>
                                        <Box style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            marginTop: '10px'
                                        }}>
                                            <LocalPhoneIcon color='info' />
                                            <Typography marginLeft='5px'>
                                                Phone Number: {doctor.contact_number}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ marginTop: '5px', marginBottom: '5px' }}>
                                            Degree: {doctor.degree}
                                        </Typography>
                                        <Typography>
                                            Category: {doctor.category}
                                        </Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                        <Typography fontWeight='bold' variant='h6'>Services provided by doctor:</Typography>
                                        <DoctorServices doctorId={doctor.id} />
                                        <Button variant='contained' color='success' onClick={()=>createConversation(doctor)}>
                                            Chat with a doctor
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Box>
                : <Typography sx={{ marginTop: '10px', marginBottom: '10px' }} fontSize='16px'>Not Found</Typography>
            }
        </>
    )
}
