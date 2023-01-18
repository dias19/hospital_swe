import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Box, Button, FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router';
import { useGetDepartmentsQuery } from '../../redux/api/departmentsApi';
function FormDoctor(props) {
    const navigate = useNavigate()
    const dateToday = new Date();
    const {data:departments=[]}=useGetDepartmentsQuery()
    const schema = yup
        .object()
        .shape({
            iin: yup.number().required('This is a required field').typeError('IIN must be a number'),
            email: yup.string().email('Please enter a valid email').required('This is a required field'),
            date_of_birth: yup.date().min(new Date(1900, 0, 1), 'The date should not be earlier than 1900').max(dateToday, 'The future dates cannot be selected').required('This is a required field'),
            government_id: yup.number().required('This is a required field').typeError('ID must be a number'),
            name: yup.string().required('This is a required field'),
            surname: yup.string().required('This is a required field'),
            middle_name: yup.string().required('This is a required field'),
            contact_number: yup.number().required('This is a required field').typeError('Contact must consist of numbers'),
            experience_in_year: yup.number().required('This is a required field').typeError('Experience must consist of numbers'),
            photo: yup.mixed().required('This is a required field'),
            category: yup.string().required('This is a required field'),
            departmentId: yup.number().required('This is a required field'),
            degree: yup.string().required('This is a required field'),
            rating: yup.number().required('This is a required field'),
            address: yup.string().required('This is a required field')
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
            contact_number: props.object.contact_number,
            experience_in_year: props.object.experience_in_year,
            photo: props.object.photo,
            category: props.object.category,
            departmentId: props.object.departmentId,
            degree: props.object.degree,
            rating: props.object.rating,
            address: props.object.address
        }
    });
    const category = watch('category')
    const departmentId = watch('departmentId')
   
    async function formSubmit(data) {
        await props.onSubmit(data)
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
            InputLabelProps={{ shrink: true }}
            type="text"
            label="IIN"
            variant="outlined"
            {...register('iin')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.email?.message}
            helperText={errors.email?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Email"
            variant="outlined"
            {...register('email')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.date_of_birth?.message}
            helperText={errors.date_of_birth?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Date of Birth"
            variant="outlined"
            {...register('date_of_birth')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.government_id?.message}
            helperText={errors.government_id?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Government ID"
            variant="outlined"
            {...register('government_id')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.name?.message}
            helperText={errors.name?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Name"
            variant="outlined"
            {...register('name')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.surname?.message}
            helperText={errors.surname?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Surname"
            variant="outlined"
            {...register('surname')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.middle_name?.message}
            helperText={errors.middle_name?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Middle Name"
            variant="outlined"
            {...register('middle_name')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.contact_number?.message}
            helperText={errors.contact_number?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Contact number"
            variant="outlined"
            {...register('contact_number')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.experience_in_year?.message}
            helperText={errors.experience_in_year?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Experience in years"
            variant="outlined"
            {...register('experience_in_year')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.photo?.message}
            helperText={errors.photo?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="file"
            label="Photo"
            variant="outlined"
            {...register('photo')} />
        <FormControl sx={{ m: 1, width: '20%' }}>
            <InputLabel>Category</InputLabel>
            <Select
                value={category}
                {...register('category')}
                label="Catergory"
            >
                <MenuItem value={'higher'}>higher</MenuItem>
                <MenuItem value={'first'}>first</MenuItem>
                <MenuItem value={'second'}>second</MenuItem>
                <MenuItem value={'third'}>third</MenuItem>
                <MenuItem value={'nurse'}>nurse</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: '20%' }}>
            <InputLabel>Department</InputLabel>
            <Select
                value={departmentId}
                {...register('departmentId')}
                label="Department"
            >
                {departments.map(department=>(
                    <MenuItem value={department.id}>{department.department_name}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{errors.departmentId?.message}</FormHelperText>
        </FormControl>
        <TextField
            sx={{ width: '20%' }}
            error={errors.degree?.message}
            helperText={errors.degree?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Degree"
            variant="outlined"
            {...register('degree')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.rating?.message}
            helperText={errors.rating?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="number"
            label="Rating"
            variant="outlined"
            {...register('rating')} />
        <TextField
            sx={{ width: '20%' }}
            error={errors.address?.message}
            helperText={errors.address?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Address"
            variant="outlined"
            {...register('address')} />
        <Button color="success" margin="normal" variant="contained" size="medium" onClick={handleSubmit(formSubmit)}>Submit</Button>
    </Box>
    )
}
export default FormDoctor
