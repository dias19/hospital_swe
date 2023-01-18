import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import FormPatient from '../forms/form-patient';
import FormDoctor from '../forms/form-doctor';
import Navbar from '../pages/admin-pages/admin-navbar';
import { usePostDoctorMutation, usePostPatientMutation } from '../../redux/api/usersApi';
function RegisterUsers() {
  const [showPatient, setShowPatient] = useState(false)
  const [showDoctor, setShowDoctor] = useState(false)
  const [postDoctor] = usePostDoctorMutation()
  const [postPatient] = usePostPatientMutation()
  function onClickPatient() {
    setShowDoctor(false)
    setShowPatient(!showPatient)
  }
  function onClickDoctor() {
    setShowPatient(false)
    setShowDoctor(!showDoctor)
  }
  const initialObjectPatient = {
    iin: '',
    email: '',
    date_of_birth: '',
    government_id: '',
    name: '',
    surname: '',
    middle_name: '',
    blood_group: '',
    emergency_contact_number: '',
    contact_number: '',
    address: '',
    marital_status: ''
  }
  const initialObjectDoctor = {
    iin: '',
    email: '',
    date_of_birth: '',
    government_id: '',
    name: '',
    surname: '',
    middle_name: '',
    contact_number: '',
    experience_in_year: '',
    photo: '',
    category: '',
    departmentId: '',
    degree: '',
    rating: '',
    address: ''
  }
  async function createDoctor(data) {
    const file = data.photo[0]
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("middle_name", data.middle_name);
    formData.append("contact_number", data.contact_number);
    formData.append("iin", data.iin);
    formData.append("government_id", data.government_id);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("degree", data.degree);
    formData.append("rating", data.rating);
    formData.append("experience_in_year", data.experience_in_year);
    formData.append("category", data.category);
    formData.append("departmentId", data.departmentId);
    await postDoctor(formData)
  }
  async function createUser(d) {
    const userResponse = await postPatient(d)
    console.log(userResponse);
  }
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>
          Select a User to create
        </Typography>
        <Stack direction='row'>
          <Button color='info' variant='contained' sx={{ m: 1 }} onClick={onClickPatient} >
            Patient
          </Button>
          <Button color='info' variant='contained' sx={{ m: 1 }} onClick={onClickDoctor}>
            Doctor
          </Button>
        </Stack>
      </Box>
      <Box>
        {showPatient ? <FormPatient object={initialObjectPatient} onSubmit={createUser} /> : null}
        {showDoctor ? <FormDoctor object={initialObjectDoctor} onSubmit={createDoctor} /> : null}
      </Box>
    </>
  )
}
export default RegisterUsers