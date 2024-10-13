'use client'
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import ClubStats from '@/app/Admin/Dashboard/ClubStats';
import ClubCard from '@/app/Admin/Dashboard/ClubCard';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClubStats />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClubCard />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
