import React from 'react'
import FormPatient from '../../forms/form-patient'
import { useLocation } from 'react-router'
import Navbar from './admin-navbar'
import { Container, Toolbar } from '@mui/material'
import { useParams } from 'react-router'
import { usePatchPatientMutation } from '../../../redux/api/usersApi'
export const EditInfoPatient = () => {
  const { id } = useParams()
  const [patchPatient] = usePatchPatientMutation()
  const { state } = useLocation()
  const initialObject = state.editedPatient[0]
  async function handleSubmit(data){
    const patientObject={
      id:id,
      patchedPatient:data
    }
    const responsePatient=await patchPatient(patientObject)
    console.log(responsePatient);
  }
  return (
    <Container>
      <Navbar />
      <Toolbar />
      <FormPatient object={initialObject} onSubmit={handleSubmit}/>
    </Container>
  )
}
