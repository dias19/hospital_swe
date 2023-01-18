import { Container, Toolbar } from '@mui/material'
import React from 'react'
import Navbar from './admin-navbar'
import FormDoctor from '../../forms/form-doctor'
import { useLocation } from 'react-router'
import { usePatchDoctorMutation } from '../../../redux/api/usersApi'
import { useParams } from 'react-router'
export const EditInfoDoctor = () => {
  const { state } = useLocation()
  const { id } = useParams()
  const patientDetails = state.editedDoctor[0]
  const [patchDoctor] = usePatchDoctorMutation()
  async function convertData(data) {
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
    const doctorObject = {
      id: id,
      editedDoctor: formData
    }
    const updateDoctor = await patchDoctor(doctorObject).unwrap()
    console.log(updateDoctor);
  }
  return (
    <Container>
      <Navbar />
      <Toolbar />
      <FormDoctor object={patientDetails} onSubmit={convertData} />
    </Container>
  )
}
