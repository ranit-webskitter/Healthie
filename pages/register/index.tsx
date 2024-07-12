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
import { signUpMutation } from '@/api/functions/user.api';
import { IFormInput } from '@/typescript/interface/common.interface';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Link from 'next/link';

import dynamic from 'next/dynamic';

const Wrapper = dynamic(() => import("@/layout/wrapper/wrapper"));
const defaultTheme = createTheme();



export default function SignUp() {
    const queryClient = useQueryClient()
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<IFormInput>();
    const mutation = useMutation({
        mutationFn: async(data:IFormInput)=>{
            const response= await signUpMutation(data)
            return response
        },
        onSuccess: (response) => {
            // console.log(response)
          response?.data.statusCode===200 && toast.success(response?.data?.message)
          queryClient.invalidateQueries({ queryKey: ['register'] })
          response?.data.statusCode===200 && reset()
        },
        onError:(error)=>{
            console.log('from register',error)
            
        
        }
      })
    
    const onSubmit: SubmitHandler<IFormInput> = (data:IFormInput) =>{
        const uploadData:IFormInput={
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            username: data?.username,
            phone: data?.phone,
            password: data?.password,
            confirm_password: data?.confirm_password,
            
        }
        mutation.mutate(uploadData)
    };
  return (
    <Wrapper>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3}  style={{
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
            margin:'1rem'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="first_name"
                  {...register("first_name", { required: true })}
                  label="First Name"
                  autoFocus
                />
                {errors.first_name && errors.first_name.type==='required' && <p style={{color:'red'}}>This field is required</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  {...register("last_name", { required: true })}
                  autoComplete="family-name"
                />
                 {errors.last_name && errors.last_name.type==='required' && <p style={{color:'red'}}>This field is required</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email", { required: true,pattern: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm })}
                  autoComplete="email"
                />
                {errors.email && errors.email.type==='required' && <p style={{color:'red'}}>This field is required</p>}
                {errors.email && errors.email.type==='pattern' && <p style={{color:'red'}}>Enter a Valid Email</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("username", { required: true })}
                  label="username"
                  id="username"
                />
                {errors.username && errors.username.type==='required' && <p style={{color:'red'}}>This field is required</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("phone", { required: true })}
                  label="Phone"
                  id="phone"
                />
                {errors.phone && errors.phone.type==='required' && <p style={{color:'red'}}>This field is required</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password", { required: true,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
                  label="Password"
                  id="password"
                />
                {errors.password && errors.password.type==='required' && <p style={{color:'red'}}>This field is required</p>}
                {errors.password &&  errors.password.type === "pattern" && <p style={{color:'red'}}>Minimum eight characters, at least one uppercase letter, one lowercase letter,one Special charecter and one number</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("confirm_password", { required: true })}
                  label="Confirm Password"
                  id="confirm_password"
                />
                 {errors.confirm_password && errors.confirm_password.type==='required' && <p style={{color:'red'}}>This field is required</p>}
              </Grid>
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item style={{marginBottom:'2rem'}}>
                <Link href="/login" >
                  Already have an account? Sign in
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