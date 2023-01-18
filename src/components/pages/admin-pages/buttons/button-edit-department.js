import React from 'react'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
export default function EditDepartment(props) {
const initialDepartmentObject=props.object
const navigate=useNavigate()
const handleClick= () => {
    navigate(`/editDepartment/${props.id}`, {state:{initialDepartmentObject}})
}
    return (
        <IconButton onClick={handleClick} color='info'>
            <EditIcon/>
        </IconButton>
    )
}
