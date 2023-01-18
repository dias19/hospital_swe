import { Toolbar, Typography, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material'
import { useParams } from 'react-router'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PatientNavbar from './patient-navbar'
import { useGetServiceQuery } from '../../../redux/api/serviceApi'
import { useGetDoctorsMutation, useGetSlotsMutation, useCreateAppointmentMutation } from '../../../redux/api/appointmentApi';
import ListTimeSlots from './list-time-slots';
import ListDoctors from './list-doctors';
export default function SelectedService() {
    const { id } = useParams()
    const [open, setOpen] = useState(false)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [date, setDate] = useState('')
    const [patientName, setPatientName] = useState('')
    const [patientSurname, setPatientSurname] = useState('')

    const [getSlots, { data: timeSlots, isLoading }] = useGetSlotsMutation()
    const [getDoctors, { data: doctors }] = useGetDoctorsMutation()
    const [createAppointment] = useCreateAppointmentMutation()
    const { data: selectedService = [] } = useGetServiceQuery(id)
    function handleClose() {
        setOpen(false)
    }
    async function handleChange(newDate) {
        const object = {
            id: id,
            day: { date: newDate.$d }
        }
        const response = await getSlots(object)
        setDate(newDate)
        console.log(response);
    }
    async function handleSubmit() {
        const dataObject = {
            serviceId: id,
            body: {
                name: patientName,
                surname: patientSurname,
                startDate: selectedTimeSlot,
                doctorId: selectedDoctor
            }
        }
        console.log(dataObject);
        const response = await createAppointment(dataObject)
        setOpen(false)
        setDate('')
        setPatientName('')
        setPatientSurname('')
        setSelectedDoctor('')
        setSelectedTimeSlot('')
    }
    return (
        <>
            <PatientNavbar />
            <Toolbar />
            <Typography align='center' fontWeight='bold' fontSize='1.5rem'>
                Service: {selectedService.service_name}
            </Typography>
            <Box marginBottom='30px' padding='50px'>
                <Typography fontWeight='bold' sx={{ paddingBottom: '10px' }}>
                    Duration:{selectedService.duration} min
                </Typography>
                <Typography fontWeight='bold' sx={{ textDecoration: 'underline', paddingBottom: '10px' }}>Treating doctors:</Typography>
                {selectedService.doctors?.map(doctor => (
                    <Box width='300px' key={doctor.id} height='430px' sx={{ marginRight: '10px', border: 1, color: 'grey' }}>
                        <img
                            src={`http://localhost:8800/${doctor.photo}`}
                            alt='None'
                            loading="lazy"
                            width='300px'
                            height='300px'
                        />
                        <Typography sx={{ paddingTop: 1, color: 'black' }} align='center'>
                            {doctor.name} {doctor.middle_name} {doctor.surname}
                        </Typography>
                        <Typography align='center' color='black'>
                            Experience: {doctor.experience_in_year} year
                        </Typography>
                        <Typography align='center' color='black'>
                            Doctor's price: {doctor.doctorService.price} tg
                        </Typography>
                        <Button variant='contained' sx={{ width: 'auto', display: 'block', margin: '0 auto' }} onClick={() => setOpen(true)}>
                            Book appointment
                        </Button>
                    </Box>
                ))}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Book appointment</DialogTitle>
                    <DialogContent>
                        <Box display='flex' flexDirection='column' sx={{ marginTop: '10px' }}>
                            <TextField
                                label='Name'
                                sx={{
                                    marginBottom: '10px'
                                }}
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                            <TextField
                                label='Surname'
                                sx={{
                                    marginBottom: '10px'
                                }}
                                value={patientSurname}
                                onChange={(e) => setPatientSurname(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Select Date"
                                    inputFormat="MM/DD/YYYY"
                                    value={date}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} error={false} />}
                                />
                            </LocalizationProvider>
                            {timeSlots ? <ListTimeSlots selectedTimeSlot={selectedTimeSlot} setSelectedTimeSlot={setSelectedTimeSlot} time={timeSlots} getDoctors={getDoctors} /> : <Typography marginTop='5px'>Please select a date for the appointment</Typography>}
                            {doctors ? <ListDoctors selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} serviceDoctors={doctors} /> : null}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}
