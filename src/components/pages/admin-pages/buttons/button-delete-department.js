import React from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteDepartmentMutation } from '../../../../redux/api/departmentsApi';
export default function DeleteDepartment({id}) {
  const [deleteDepartment]=useDeleteDepartmentMutation()
  async function handleClick(){
    const responseDelete=await deleteDepartment(id)
    console.log(responseDelete);
  }
  return (
    <IconButton onClick={handleClick} color='error'>
        <DeleteIcon/>
    </IconButton>
  )
}
