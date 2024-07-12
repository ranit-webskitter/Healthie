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
import { loginMutation, signUpMutation } from '@/api/functions/user.api';
import { IFormInput } from '@/typescript/interface/common.interface';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { setCookie } from 'nookies';
import dynamic from 'next/dynamic';
import { json } from 'stream/consumers';
import { useDispatch } from 'react-redux';
import { setLoginData } from '@/rdux-toolkit/slices/userSlice';

const Wrapper = dynamic(() => import("@/layout/wrapper/wrapper"));
const defaultTheme = createTheme();



export default function SignUp() {
    const queryClient = useQueryClient()
    const dispatch=useDispatch()
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();
    const mutation = useMutation({
        mutationFn: async (data: IFormInput) => {
            const response = await loginMutation(data)
            return response
        },
        onSuccess: (response) => {
            console.log(response)
            response?.data && dispatch(setLoginData(response?.data?.data))
            response?.data.statusCode === 200 && toast.success(response?.data?.message)
            queryClient.invalidateQueries({ queryKey: ['login'] })
            response?.data.statusCode === 200 && reset()
            response?.data && setCookie(null, `token`, response?.data?.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            response?.data.statusCode===200 && localStorage.setItem('token',response?.data?.token)
            // response?.data && setCookie(null,` ${process.env.NEXT_APP_PROJECT_NAME}`, response?.data?.token, {
            //     maxAge: 30 * 24 * 60 * 60,
            //     path: '/',
            // })
            // response?.data && setCookie(null, "user", JSON.stringify(response?.data?.data), {
            //     maxAge: 30 * 24 * 60 * 60,
            //     path: '/',
            // })
            
        },
        onError: (error) => {
            console.log('from register', error)


        }
    })

    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
        const uploadData: IFormInput = {
            email: data?.email,
            password: data?.password,
        }
        mutation.mutate(uploadData)
    };
    return (
        <Wrapper>
        <ThemeProvider theme={defaultTheme}>
           
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper elevation={3} style={{
                        padding: "1rem 2rem",
                        marginTop: "1rem",
                        width: "100%",
                        marginBottom: "1rem",
                    }} >
                        <Box
                            sx={{
                                //marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '3rem',

                            }}
                        >

                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5" >
                                Sign In
                            </Typography>


                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            {...register("email", { required: true, pattern: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm })}
                                            autoComplete="email"
                                        />
                                        {errors.email && errors.email.type === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
                                        {errors.email && errors.email.type === 'pattern' && <p style={{ color: 'red' }}>Enter a Valid Email</p>}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
                                            label="Password"
                                            id="password"
                                        />
                                        {errors.password && errors.password.type === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
                                        {errors.password && errors.password.type === "pattern" && <p style={{ color: 'red' }}>Minimum eight characters, at least one uppercase letter, one lowercase letter,one Special charecter and one number</p>}
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item style={{ marginBottom: '2rem' }}>
                                        <Link href="/register" >
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                    <Grid item style={{ marginBottom: '2rem' }}>
                                        <Link href="/forgot-password" >
                                            Forgot Password
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
           
        </ThemeProvider>
        </Wrapper>

    );
}

