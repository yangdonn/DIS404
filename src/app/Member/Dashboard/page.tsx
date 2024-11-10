// // app/Member/Dashboard/page.tsx (Dashboard Page)
// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { Box, Grid, Typography } from '@mui/material';
// import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'; // Adjust path if needed
// import MemberStats from '../Clubpages/Memberstats'; // Adjust path if needed
// import UpcomingEvents from '../Clubpages/UpcomingEvents'; // Adjust path if needed
// import RecentEvents from '../Clubpages/RecentEvents'; // Adjust path if needed
// import Calendar from '../Clubpages/Calendar'; // Adjust path if needed

// const Dashboard = () => {
//   const searchParams = useSearchParams();
//   const clubId = searchParams.get('clubId'); // Extract clubId from the query parameters

//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [events, setEvents] = useState([
//     { date: '2024-07-27', title: 'Welcome session' },
//     { date: '2024-08-02', title: 'First club meeting' },
//     { date: '2024-09-15', title: 'Seminar on Emerging Technology' },
//     { date: '2024-10-27', title: 'ICPC' },
//     { date: '2024-11-22', title: 'Event 2' },
//     { date: '2024-11-25', title: 'Event 3' },
//     { date: '2024-11-26', title: 'Event 4' },
//     { date: '2024-11-28', title: 'TechTalk' },
//   ]);

//   const recentEvents = events.filter(event => new Date(event.date) < new Date());
//   const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

//   const handleEventClick = (date: string) => {
//     setSelectedDate(date);
//     console.log(`Selected date: ${date}`);
//   };

//   useEffect(() => {
//     if (clubId) {
//       console.log(`Dashboard loaded for Club ID: ${clubId}`);
//     }
//   }, [clubId]);

//   return (
//     <PageContainer title={`Dashboard for Club ${clubId}`}>
//       <Box>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <MemberStats />
//           </Grid>
//         </Grid>
//         <Grid>
//           <Box>
//             <Grid container spacing={2}>
//               <Grid item xs={12} lg={4}>
//                 <RecentEvents events={events} onEventClick={handleEventClick} />
//               </Grid>
//               <Grid item xs={12} lg={4}>
//                 <UpcomingEvents events={events} onEventClick={handleEventClick} />
//               </Grid>
//               <Grid item xs={12} lg={4}>
//                 <Calendar events={events} selectedDate={selectedDate} />
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Box>
//     </PageContainer>
//   );
// };

// export default Dashboard;

"use client";
import { useState, useEffect } from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import MemberStats from "@/app/(DashboardLayout)/components/dashboard/Memberstats";
import UpcomingEvents from "@/app/(DashboardLayout)/components/dashboard/UpcomingEvents";
import RecentEvents from "@/app/(DashboardLayout)/components/dashboard/RecentEvents";
import Calendar from "../Clubpages/Calendar";
// import LineGraph from "./components/dashboard/LineGraph";
// import PieChart from "./components/dashboard/piechart";
import { useSession } from "next-auth/react";

interface Event {
  date: string;
  title: string;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async (userId: string) => {
    try {
      const response = await fetch(`/api/getEvents/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const structuredEvents = data.map(
        (event: { edate: string; ename: string }) => ({
          date: new Date(event.edate).toISOString().split("T")[0],
          title: event.ename,
        })
      );
      setEvents(structuredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchEvents(session.user.mid);
    }
  }, [session]);

  const recentEvents = events.filter(
    (event) => new Date(event.date) < new Date()
  );
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  );

  const handleEventClick = (date: string) => {
    setSelectedDate(date);
    console.log(`Selected date: ${date}`);
  };

  return (
    <PageContainer title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MemberStats />
          </Grid>
        </Grid>

        <Grid>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <RecentEvents events={events} onEventClick={handleEventClick} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <UpcomingEvents
                  events={events}
                  onEventClick={handleEventClick}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Calendar events={events} selectedDate={selectedDate} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
