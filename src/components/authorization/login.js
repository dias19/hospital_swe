import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLoginMutation } from '../../redux/api/authApi';
import { useDispatch} from 'react-redux';
import { setCredentials } from '../../redux/auth-slice';
import PublicNavbar from '../pages/public/public-navbar';
import { Toolbar } from '@mui/material';
function Login() {
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const sch = yup
        .object()
        .shape({
            email: yup.string().email('Please insert a valid email').required('This is a required field'),
            password: yup.string().required('This is a required field'),
            role: yup.string().required()
        })
    const { register, handleSubmit, formState: { errors },watch } = useForm({
        resolver: yupResolver(sch),
        defaultValues:{
            email:'',
            password:'',
            role:''
        }
    });
    const role=watch('role')
    async function onSubmit(data) {
        try{
            const user = await login(data).unwrap()
            console.log(user);
            const {role}=data
            const credentials={
                role:role,
                token: user.token
            }
            dispatch(setCredentials(credentials))
            if(role=='admin'){
                navigate('/homeAdmin')
            }
            else if (role=='doctor'){
                navigate('/homeDoctor')
            }
            else if (role=='patient'){
                navigate('/homePatient')
            }
            else{
                navigate('/unauthorized')
            }
            
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <>
        <PublicNavbar/>
        <Toolbar/>
        <Box display="flex" flexDirection="column"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <TextField 
            label="E-mail" 
            sx={{ width: '20%' }} 
            error={errors.email?.message} 
            helperText={errors.email?.message} 
            margin="normal"
             {...register('email')} />
            <TextField type="password" label="Password" sx={{ width: '20%' }} error={errors.password?.message} helperText={errors.password?.message} margin="normal" {...register('password')} />
            <FormControl sx={{width:'20%'}} margin='normal'>
                <InputLabel id="select-label">Role</InputLabel>
                <Select
                    labelId="Select Role"
                    id="select"
                    value={role}
                    label="Select Role"
                    {...register('role')} 
                >
                    <MenuItem value={'doctor'}>doctor</MenuItem>
                    <MenuItem value={'patient'}>patient</MenuItem>
                    <MenuItem value={'admin'}>admin</MenuItem>
                </Select>
            </FormControl>
            <Button sx={{ width: '20%' }} color="info" margin="normal" variant="contained" size="medium" onClick={handleSubmit(onSubmit)}>Login</Button>
        </Box>
        </>
    )
}
export default Login