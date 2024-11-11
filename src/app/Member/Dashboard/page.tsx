

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
import LinearWithValueLabel from "../../(DashboardLayout)/loading";

interface Event {
  date: string;
  title: string;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchEvents(session.user.mid);
    }
  }, [session]);
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <LinearWithValueLabel />
      </Box>
    );
    
  }

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
