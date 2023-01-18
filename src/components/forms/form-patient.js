import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Box, Button, Select, MenuItem, FormHelperText, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router';

function FormPatient(props) {
  const navigate = useNavigate()
  const dateToday = new Date();
  const schema = yup
    .object()
    .shape({
      iin: yup.number().required('This is a required field').typeError('IIN must be a number'),
      email: yup.string().email('Please enter a valid email'),
      date_of_birth: yup.date().min(new Date(1900, 0, 1), 'The date should not be earlier than 1900').max(dateToday, 'The future dates cannot be selected').required('This is a required field'),
      government_id: yup.number().required('This is a required field').typeError('ID must be a number'),
      name: yup.string().required('This is a required field'),
      surname: yup.string().required('This is a required field'),
      middle_name: yup.string().required('This is a required field'),
      blood_group: yup.string().required('This is a required field'),
      emergency_contact_number: yup.string().required('This is a required field'),
      contact_number: yup.string().required('This is a required field'),
      address: yup.string().required('This is a required field'),
      marital_status: yup.string().required('This is a required field')
    })
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      iin: props.object.iin,
      email: props.object.email,
      date_of_birth: props.object.date_of_birth,
      government_id: props.object.government_id,
      name: props.object.name,
      surname: props.object.surname,
      middle_name: props.object.middle_name,
      blood_group: props.object.blood_group,
      emergency_contact_number: props.object.emergency_contact_number,
      contact_number: props.object.contact_number,
      address: props.object.address,
      marital_status: props.object.marital_status
    }
  });
  const blood_group = watch('blood_group')
  const marital_status = watch('marital_status')
  async function submitForm(d) {
    await props.onSubmit(d)
    navigate('/homeAdmin')
  }
  return (<Box display="flex" flexDirection="column" sx={{
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <TextField
      sx={{ width: '20%' }}
      error={errors.iin?.message}
      helperText={errors.iin?.message}
      margin="normal"
      type="number"
      label="IIN"
      variant="outlined"
      {...register('iin')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.email?.message}
      helperText={errors.email?.message}
      margin="normal" type="text"
      label="Email"
      variant="outlined"
      {...register('email')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.date_of_birth?.message}
      helperText={errors.date_of_birth?.message}
      margin="normal"
      InputLabelProps={{ shrink: true }}
      id="outlined-error-helper-text"
      type="date"
      label="Birth Date"
      variant="outlined"
      {...register('date_of_birth')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.government_id?.message}
      helperText={errors.government_id?.message}
      margin="normal"
      type="number"
      label="Government ID"
      variant="outlined"
      {...register('government_id')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.name?.message}
      helperText={errors.name?.message}
      margin="normal"
      type="text"
      label="First Name"
      variant="outlined"
      {...register('name')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.surname?.message}
      helperText={errors.surname?.message}
      margin="normal"
      type="text"
      label="Surname"
      variant="outlined"
      {...register('surname')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.middle_name?.message}
      helperText={errors.middle_name?.message}
      margin="normal"
      type="text"
      label="Middle Name"
      variant="outlined"
      {...register('middle_name')} />
    <FormControl sx={{ m: 1, width: '20%' }}>
      <InputLabel>Blood Group</InputLabel>
      <Select
        value={blood_group}
        {...register('blood_group')}
        label="Blood Group"
      >
        <MenuItem value={'first'}>first</MenuItem>
        <MenuItem value={'second'}>second</MenuItem>
        <MenuItem value={'third'}>third</MenuItem>
        <MenuItem value={'fourth'}>fourth</MenuItem>
      </Select>
      <FormHelperText>{errors.blood_group?.message}</FormHelperText>
    </FormControl>
    <TextField
      sx={{ width: '20%' }}
      error={errors.emergency_contact_number?.message}
      helperText={errors.emergency_contact_number?.message}
      margin="normal"
      type="text"
      label="Emergency Contact Number"
      variant="outlined"
      {...register('emergency_contact_number')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.contact_number?.message}
      helperText={errors.contact_number?.message}
      margin="normal"
      type="text"
      label="Contact Number"
      variant="outlined"
      {...register('contact_number')} />
    <TextField
      sx={{ width: '20%' }}
      error={errors.address?.message}
      helperText={errors.address?.message}
      margin="normal"
      type="text"
      label="Address"
      variant="outlined"
      {...register('address')} />
    <FormControl sx={{ m: 1, width: '20%' }}>
      <InputLabel>Marital Status</InputLabel>
      <Select
        value={marital_status}
        label="Marital Status"
        {...register('marital_status')}
      >
        <MenuItem value={'married'}>married</MenuItem>
        <MenuItem value={'widowed'}>widowed</MenuItem>
        <MenuItem value={'separated'}>separated</MenuItem>
        <MenuItem value={'divorced'}>divorced</MenuItem>
        <MenuItem value={'single'}>single</MenuItem>
      </Select>
      <FormHelperText>{errors.marital_status?.message}</FormHelperText>
    </FormControl>
    <Button
      color="success"
      margin="normal"
      variant="contained"
      size="medium"
      onClick={handleSubmit(submitForm)}
    >
      Submit
    </Button>
  </Box>
  )
}
export default FormPatient