import React from 'react'
import Navbar from '../pages/admin-pages/admin-navbar'
import { Toolbar, Typography, Box, TextField, Button, Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@mui/material'
import { Dialog, DialogTitle, DialogContent,  DialogActions, Card,CardContent } from '@mui/material'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { usePostServiceMutation } from '../../redux/api/serviceApi'
import { useState } from 'react';
import { useGetDoctorsQuery } from '../../redux/api/usersApi'

export default function CreateService() {
    const [postService]=usePostServiceMutation()
    const {data:doctors=[]}=useGetDoctorsQuery()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const { id } = useParams()
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [priceDoctor, setPriceDoctor] = useState('')
    const [assignedDoctors, setAssignedDoctors] = useState([])
    const departmentDoctors = doctors.filter(doctor => doctor.departmentId == id)
    const sch = yup
        .object()
        .shape({
            service_name: yup.string().required(),
            price: yup.number().required(),
            duration: yup.number().required(),
            departmentId: yup.number().required()
        })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(sch),
        defaultValues: {
            service_name: '',
            price: '',
            duration: '',
            departmentId: id,
        }
    });
    function handleSubmitDialog() {
        const doctor = { id: selectedDoctor, price: priceDoctor }
        setAssignedDoctors(assignedDoctors => [...assignedDoctors, doctor])
        setOpen(false)
    }
    async function onSubmit(data) {
        const doctors=assignedDoctors
        const submittedData = { ...data, doctors }
        console.log(submittedData);
        const response = await postService(submittedData)
        console.log(response)
        alert('Service has been successully created')
        navigate(-1)
    }
    return (
        <>
            <Navbar />
            <Toolbar />
            <Box display="flex" flexDirection="column"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <TextField
                    label="Service name"
                    sx={{ width: '20%' }}
                    error={errors.service_name?.message}
                    helperText={errors.service_name?.message}
                    margin="normal"
                    {...register('service_name')} />
                <TextField
                    label="Price"
                    sx={{ width: '20%' }}
                    error={errors.price?.message}
                    helperText={errors.price?.message}
                    margin="normal"
                    {...register('price')} />
                <TextField
                    label="Duration in minutes"
                    sx={{ width: '20%' }}
                    error={errors.duration?.message}
                    helperText={errors.duration?.message}
                    margin="normal"
                    {...register('duration')} />
                <div>
                    <Button variant="contained" onClick={handleClickOpen} sx={{ margin: 1 }}>
                        Assign doctor
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Assign Doctor</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth sx={{ marginTop: '5px' }}>
                                <InputLabel>Select Doctor</InputLabel>
                                <Select
                                    label="Select Doctor"
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                >
                                    {departmentDoctors?.map(departmentDoctor => (
                                        <MenuItem key={departmentDoctor.userId} value={departmentDoctor.id}>{departmentDoctor.name} {departmentDoctor.surname}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.departmentDoctors?.message}</FormHelperText>
                            </FormControl>
                            <TextField
                                autoFocus
                                onChange={(e) => setPriceDoctor(e.target.value)}
                                margin="dense"
                                label="Price"
                                type="string"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmitDialog}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Box sx={{width:'20%'}} display='flex'>
                {assignedDoctors?.map((doctor)=>(
                <Card key={doctor.id} sx={{ width:'auto', marginRight:'10px', backgroundColor:'#EEEEEF', marginBottom:'10px'}} >
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>    
                        </Typography>
                        <Typography align='center'>
                            Doctor ID: {doctor.id}
                        </Typography>
                        <Typography variant="body2" align='center'>
                          Price: {doctor.price}
                        </Typography>
                    </CardContent>
                </Card>
                ))}
                 </Box>
                <Button variant='contained' disabled={assignedDoctors.length==0} onClick={handleSubmit(onSubmit)}>
                    Submit
                </Button>
            </Box>
        </>
    )
}
