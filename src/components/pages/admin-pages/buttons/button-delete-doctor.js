import { IconButton } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteDoctorMutation } from '../../../../redux/api/usersApi';
export const ButtonDeleteDoctor = (props) => {
    const [deleteDoctor, isLoading]=useDeleteDoctorMutation()
    async function handleClick(){
        const deletedDoctor=await deleteDoctor(props.userId).unwrap()
        console.log(deletedDoctor)
    }
    return (
        <IconButton onClick={handleClick} color='error'>
            <DeleteIcon />
        </IconButton>

    )
}
