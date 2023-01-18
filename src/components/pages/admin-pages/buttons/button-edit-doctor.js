import React from 'react'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import { useGetDoctorsQuery } from '../../../../redux/api/usersApi';
export const ButtonEditDoctor = (props) => {
    const idArray = [props.id]
    const {data: doctors}=useGetDoctorsQuery()
    const editedDoctor = doctors.filter(doctor => idArray.includes(doctor.id))
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/editDoctor/${props.id}`, { state: { editedDoctor } })
    }
    return (
        <IconButton onClick={handleClick}>
            <EditIcon color="info" />
        </IconButton>
    )
}
