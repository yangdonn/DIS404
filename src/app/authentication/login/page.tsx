"use client"

import Link from "next/link";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";


import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  console.log('Inside login page')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    console.log('Handle Submitetd called');
    e.preventDefault();

    if (!username || !password) {
      console.error("Username and password are required.");
      alert("Please enter both username and password."); // Optional: Display an alert
      return; // Exit if fields are empty
    }
    const result = await signIn('credentials',{
      redirect: false,
      username,
      password
    });

    console.log('Login username', username)
    if(result?.error){
      console.error(result.error);
      alert("Invalid username or password."); // Optional: Display
    } else{
      console.log('login sucesfull');

      router.push('/');
    }
  }

  const imageSrc = "/images/logos/CST_logo.jpg"; 
  return (
    <PageContainer title="Login" description="this is Login page">
        
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', // Horizontally center the items
                  justifyContent: 'center', // Vertically center the items
                  height: '100%', // Ensure the container takes the full height of the parent
                }}
              >
                <img
                  src={imageSrc}
                  alt="Sidebar Logo"
                  style={{
                    width: '100px', // Adjust width as needed
                    height: '100px', // Adjust height as needed
                    borderRadius: '50%', // Optional: Make the image circular
                    justifyContent: 'center',
                  }}
                />
                {/* Text below the image */}
                <Typography variant="h6" mt={2} >
                  Club Management System
                </Typography>

              </div>
              
                      
              <form onSubmit ={handleSubmit}>
                <AuthLogin
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
            
                  subtitle={
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      mt={3}
                    >
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="500"
                      >
                        Don't have an account?
                      </Typography>
                      <Typography
                        component={Link}
                        href="/authentication/register"
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                        }}
                      >
                        Create an account
                      </Typography>
                    </Stack>
                  }
                />
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;
