import { callbackMutation, fetchStateLists } from '@/api/functions/contact.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Wrapper from '@/layout/wrapper/wrapper'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormInput } from '@/typescript/interface/common.interface'

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
import { InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { ContactDataData, ContactRoot, contactState } from '@/typescript/interface/other-types'
import { toast } from 'react-toastify'
const index = () => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ContactDataData>();
  const { data: states } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const response = await fetchStateLists()
      return response
    }
  })
  console.log(states)

  const mutation = useMutation({
    mutationFn: async (data: ContactDataData) => {
        const response = await callbackMutation({data})
        return response
    },
    onSuccess: (response) => {
        console.log(response)
        response?.statusCode === 200 && toast.success(response?.data?.message)
        queryClient.invalidateQueries({ queryKey: ['contact'] })
        response?.statusCode === 200 && reset()
        
    },
    onError: (error) => {
        console.log('from register', error)


    }
})
  const onSubmit: SubmitHandler<ContactDataData> = (formdata: ContactDataData) => {
   
    console.log(formdata)
    const data:ContactDataData={
     
        firstname:formdata.firstname,
        lastname:formdata.lastname,
        phone:formdata.phone,
        state:formdata.state
      
    
    }
     mutation.mutate(data)
  };
  return (
    <>
      <Wrapper>
        <>
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
                  Callback Request
                </Typography>


                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="firstname"
                        label="Firstname"
                        {...register("firstname", { required: true })}
                        autoComplete="firstname"
                      />
                      
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        {...register("lastname", { required: true })}
                        label="Lastname"
                        id="lastname"
                      />
                      </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        {...register("phone", { required: true })}
                        label="Phone"
                        id="phone"
                      />
                       </Grid>

                    <Grid item xs={12}>
                      <InputLabel id="state">state</InputLabel>
                      <Select
                        labelId="state"
                        id="state"
                        {...register("state", { required: true })}
                        label="State"
                       fullWidth
                        
                      >
                        {states?.map((state:contactState,index:number)=>{
                          return (
                          
                            <MenuItem value={state.state_code} key={index}>{state.state_name}</MenuItem>
                          
                          )
                        })}
                        
                      </Select>
                    </Grid>
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
          </Container>
        </>
      </Wrapper>
    </>

  )
}

export default index
