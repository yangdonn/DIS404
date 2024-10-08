'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import MemberStats from '@/app/(DashboardLayout)/components/dashboard/Memberstats';
// import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
// import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
// import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import UpcomingEvents from '@/app/(DashboardLayout)/components/dashboard/UpcomingEvents';
import RecentEvents from '@/app/(DashboardLayout)/components/dashboard/RecentEvents';
import Calendar from './components/dashboard/Calendar';
import LineGraph from './components/dashboard/LineGraph';
// import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';

const Dashboard = () => 
  {
    return (
      <PageContainer title="Dashboard">
        <Box>
          {/* Add Member Stats at the top */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MemberStats /> {/* MemberStats Component */}
            </Grid>
          </Grid>

          <Grid>
            <Box>
              <Grid container spacing={2}> {/* Added spacing for better separation */}
                <Grid item xs={12} lg={4}>
                  <RecentEvents  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <UpcomingEvents/>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Calendar/>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mt: 3 }}> 
                <LineGraph />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    )
}
export default Dashboard;
