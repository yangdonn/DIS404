'use client'
import { useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import ClubStats from '@/app/Admin/Dashboard/ClubStats';
import ClubCard from '@/app/Admin/Dashboard/ClubCard';
import AddClubDialog from './Dashboard/AddClub';

const Dashboard = () => {
  const [clubsData, setClubsData] = useState({
    total: 17,
    active: 17,
    inactive: 0,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleAddClub = (newClub) => {
    // Update the state with the new club
    setClubsData(prevState => ({
      total: prevState.total + 1,
      active: prevState.active + 1,
      inactive: prevState.inactive, // For simplicity, no inactive change
    }));
  };

  return (
    <PageContainer title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClubCard />
          </Grid>
        </Grid>

      </Box>

      {/* AddClubDialog Component */}
      <AddClubDialog open={dialogOpen} onClose={handleDialogClose} onSave={handleAddClub} />
    </PageContainer>
  );
};

export default Dashboard;
