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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDashboard, signUpMutation, updateProfileMutation } from '@/api/functions/user.api';
import { IFormInput } from '@/typescript/interface/common.interface';
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { check_token } from '@/rdux-toolkit/slices/userSlice';
import { useRouter } from 'next/router';

const Wrapper = dynamic(() => import("@/layout/wrapper/wrapper"));
const defaultTheme = createTheme();



export default function SignUp() {
    const queryClient = useQueryClient()
    const router=useRouter()
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [img, setimg] = React.useState<string | null>(null);
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<IFormInput>();
    const { data: userdashboard, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => {
            const response =fetchDashboard()
            return response
        
        }
    });
    // console.log(userdashboard);
    const mutation = useMutation({
        mutationFn: async(data:IFormInput)=>{
            const response= await updateProfileMutation(data)
            return response
        },
        onSuccess: (response) => {
            // console.log(response)
          response?.data.statusCode===200 && toast.success(response?.data?.message)
          queryClient.invalidateQueries({ queryKey: ['update-profile'] })
          response?.data.statusCode===200 && reset()
          response?.data.statusCode===200 && router.push('/dashboard')
        },
        onError:(error)=>{
            console.log('from register',error)
            
        
        }
      })
    
    const onSubmit: SubmitHandler<IFormInput> = (data:IFormInput) =>{
        const formdata :{
            [key: string]: any;
          } = new FormData();
        formdata.append('first_name',data.first_name!)
        formdata.append('last_name',data.last_name!)
        formdata.append('email',data.email!)
        formdata.append('phone',data.phone!)
        formdata.append('profile_photo_path',img!)
        console.log(img)
        const uploadData:IFormInput={
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            phone: data?.phone,
            
            
        }
        mutation.mutate(formdata)
    };

    const handleImageChange = (event:any) => {
        console.log('img',event,event.target.files[0])
         const file = event.target.files[0];
         setimg(file);
         if (file) {
           setSelectedImage(URL.createObjectURL(event.target.files[0]));
         }
       };

  return (
    <Wrapper>
    <ThemeProvider theme={defaultTheme}>
     { !isLoading && <Container component="main" maxWidth="xs">
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
           Update Profile
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
                  defaultValue={userdashboard?.first_name}
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
                  defaultValue={userdashboard?.last_name}
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
                  defaultValue={userdashboard?.email}
                  {...register("email", { required: true,pattern: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm })}
                  autoComplete="email"
                />
                {errors.email && errors.email.type==='required' && <p style={{color:'red'}}>This field is required</p>}
                {errors.email && errors.email.type==='pattern' && <p style={{color:'red'}}>Enter a Valid Email</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  defaultValue={userdashboard?.phone}
                  fullWidth
                  {...register("phone", { required: true })}
                  label="Phone"
                  id="phone"
                />
                {errors.phone && errors.phone.type==='required' && <p style={{color:'red'}}>This field is required</p>}
              </Grid>
             
              <Grid item xs={12}>
                    <TextField
                      fullWidth
                    //    accept="image/*"
                      type="file"
                     
                       onChange={handleImageChange}
                      id="image"
                    />
                  </Grid>
                  {selectedImage && (
                    <Grid item xs={12}>
                      {/* Display the selected image */}
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </Grid>
                )}
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Submit
            </Button>
            
          </Box>
        </Box>
        </Paper>
      </Container>}
    </ThemeProvider>
    </Wrapper>
  );
}