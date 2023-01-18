import { yupResolver } from "@hookform/resolvers/yup"
import { TextField, Box, Button, Toolbar } from "@mui/material"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router"
import * as yup from 'yup';
import Navbar from "../pages/admin-pages/admin-navbar";
import { usePostDepartmentMutation } from "../../redux/api/departmentsApi";
function CreateDepartament() {
  const [postDepartment]=usePostDepartmentMutation()
  const schema = yup.object().shape({
    department_name: yup.string().required('This is required field'),
    department_info: yup.string().required('This is a required field')
  })
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      department_name:'',
      department_info: ''
    }
  })
  const navigate = useNavigate()
  async function onSubmit(data){
    const postResponse=await postDepartment(data)
    console.log(postResponse);
    navigate(-1)
  }
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
        <TextField
          label='Department Name'
          type='text'
          margin="normal"
          sx={{ width: '20%' }}
          {...register('department_name')} />
        <TextField
        margin="normal"
        sx={{width:'20%'}}
          id="outlined-multiline-static"
          label="Department Info"
          multiline
          rows={4}
          {...register('department_info')}
        />
        <Button variant="contained" color='success' onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </Box>
    </>
  )
}

export default CreateDepartament
