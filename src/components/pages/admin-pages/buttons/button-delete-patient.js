import React from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePatientMutation } from '../../../../redux/api/usersApi';
export const ButtonDeletePatient = (props) => {
  const [deletePatient]=useDeletePatientMutation()
  async function handleClick(){
       const patientDelete=await deletePatient(props.id);
       console.log(patientDelete);
    }
  return (
    <IconButton onClick={handleClick} color='error'>
        <DeleteIcon/>
    </IconButton>
  )
}
