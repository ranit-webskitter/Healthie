import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {

    Avatar,
    Typography,
    Container,
    Grid,
    CardContent,
    Divider,
    Card,
    Box,
    Button,
} from "@mui/material";
import Wrapper from '@/layout/wrapper/wrapper'
import { fetchDashboard } from "@/api/functions/user.api";
import Link from "next/link";

const Dashboard = () => {
    const dispatch = useDispatch<any>();
   
    const { data: userdashboard, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => {
            const response =fetchDashboard()
            return response
        
        }
    });
    console.log(userdashboard);
    return (
        <>
            <Wrapper>
                <>
                    <Container maxWidth="xl" style={{ paddingTop: 40, paddingBottom: 40 }}>
                        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                            <Grid item lg={6} md={8} sm={10} xs={12}>
                                <Card style={{ borderRadius: '1rem', display: 'flex' }}>
                                    <Grid container>
                                        <Grid item md={5} xs={12} style={{ backgroundColor: 'rgb(34, 58, 102)', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', textAlign: 'center', color: 'white' }}>
                                            <Box py={4}>
                                                <Avatar
                                                    alt="R"
                                                    src={userdashboard?.profile_photo}
                                                    style={{ width: 120, height: 120, margin: '0 auto', borderRadius: '50%' }}
                                                />
                                                <Button component={Link} href='/update-profile'  variant="contained" sx={{marginTop:'1rem'}}>Update Profile</Button>
                                                <Typography variant="h4" component="div" className="text-white" style={{ marginTop: 16 }}>{userdashboard?.first_name} {userdashboard?.last_name}</Typography>
                                                <Typography className="text-white">Email - {userdashboard?.email}</Typography>
                                                <Typography className="text-white">Contact No - {userdashboard?.phone}</Typography>

                                            </Box>
                                        </Grid>
                                        <Grid item md={7} xs={12} style={{ backgroundColor: 'white' }}>
                                            <CardContent>
                                                <Typography variant="h6" className="text-black" >Information</Typography>
                                                <Divider style={{ margin: '16px 0' }} />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <Typography variant="h6" className="text-black">Email</Typography>
                                                        <Typography>{userdashboard?.email}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Typography variant="h6" className="text-black">Phone</Typography>
                                                        <Typography className="text-black">{userdashboard?.phone}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>

                </>
            </Wrapper>

        </>
    );
};

export default Dashboard;