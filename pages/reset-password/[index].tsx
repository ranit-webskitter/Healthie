import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginMutation, resetPasswordMutation, signUpMutation } from '@/api/functions/user.api';
import { IFormInput } from '@/typescript/interface/common.interface';
import { CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { setCookie } from 'nookies';
import dynamic from 'next/dynamic';
import { json } from 'stream/consumers';
import { useDispatch } from 'react-redux';
import { setLoginData } from '@/rdux-toolkit/slices/userSlice';
import { useRouter } from 'next/router';

const Wrapper = dynamic(() => import("@/layout/wrapper/wrapper"));
const defaultTheme = createTheme();



export default function SignUp() {
    const router=useRouter()
    const params = router.query.index

    let token:string, email:string | undefined;
    if(typeof params === "string") {
        token = params.split('&')[0].split('=')[1];

        email = params.split('&')[1].split('=')[1];
    }
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();
    const mutation = useMutation({
        mutationFn: async (data: IFormInput) => {
            console.log(data)
            const response = await resetPasswordMutation(data)
            return response
        },
        onSuccess: (response) => {
            console.log(response)
            response?.data && dispatch(setLoginData(response?.data?.data))
            response?.data.statusCode === 200 && toast.success(response?.data?.message)
            queryClient.invalidateQueries({ queryKey: ['reset'] })
            response?.data.statusCode === 200 && reset()
            response?.data.statusCode === 200 && router.push('/login')

        },
        onError: (error) => {
            console.log('from register', error)


        }
    })

    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
        const uploadData: IFormInput = {
            token: token,
            email: email,
            password: data?.password,
        }
        mutation.mutate(uploadData)
    };
    return (
        <Wrapper>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: `url('')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                <TextField
                                 defaultValue={email}
                                    margin="normal"
                                    multiline
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    error={!!errors.email}
                                   
                                    disabled
                                    helperText={errors.email ? 'Email is required' : ''}
                                    // {...register("email", { required: true })}
                                    // InputProps={{
                                    //     style: {
                                    //         height: '50px',
                                    //     },
                                    // }}
                                />
                                <TextField
                                    margin="normal"
                                    multiline
                                    required
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password ? 'Password is required' : ''}
                                    {...register("password", { required: true })}
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set your desired height here
                                        },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {/* {loading ?   <CircularProgress color="inherit"  sx={{ mt: 0.2, mb: 0.2 }} /> : "Sign In"} */}
                                    Submit
                                </Button>
                               
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Wrapper>

    );
}