'use client'
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import MemberStats from '@/app/(DashboardLayout)/components/dashboard/Memberstats';
import UpcomingEvents from '@/app/(DashboardLayout)/components/dashboard/UpcomingEvents';
import RecentEvents from '@/app/(DashboardLayout)/components/dashboard/RecentEvents';
import Calendar from './components/dashboard/Calendar';
import LineGraph from './components/dashboard/LineGraph';

const Dashboard = () => {
  // State to manage selected event date
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState([
    { date: '2024-07-27', title: 'Welcome session' },
    { date: '2024-08-02', title: 'First club meeting' },
    { date: '2024-09-15', title: 'Seminar on Emerging Technology' },
    { date: '2024-09-26', title: 'TechTalk' },
    { date: '2024-10-27', title: 'ICPC' },
    { date: '2024-11-02', title: 'Event 2' },
    { date: '2024-11-15', title: 'Event 3' },
    { date: '2024-11-26', title: 'Event 4' },
  ]);

  // Filter recent events (dates before today)
  const recentEvents = events.filter(event => new Date(event.date) < new Date());

  // Filter upcoming events (dates today or in the future)
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

  // Define the type of 'date' as a string
  const handleEventClick = (date: string) => {
    setSelectedDate(date);
    console.log(`Selected date: ${date}`);
  };

  return (
    <PageContainer title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MemberStats /> {/* MemberStats Component */}
          </Grid>
        </Grid>

        <Grid>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <RecentEvents events={events} onEventClick={handleEventClick} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <UpcomingEvents events={events} onEventClick={handleEventClick} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Calendar events={events} selectedDate={selectedDate} />
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
  );
};

export default Dashboard;
