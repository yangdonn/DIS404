import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import DashboardCard from '../shared/DashboardCard';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

// const uData = [5, 3, 6, 3, 8, 1, 7, 3, 6, 3, 8, 1];

type EventType = {edate: string}
const xLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function SimpleLineChart() {
    const { data: session } = useSession();
    const [uData, setUData] = useState(Array(12).fill(0)); // Initialize with 12 zeroes for each month

  const fetchEvents = async (userId: string) => {
    try {
      const response = await fetch(`/api/getEvents/${userId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data : EventType[] = await response.json();

      // Count events per month
      const monthCounts = Array(12).fill(0);
      data.forEach(event => {
        const eventMonth = new Date(event.edate).getMonth(); // Get month index (0 for Jan, 11 for Dec)
        monthCounts[eventMonth]++;
      });

      setUData(monthCounts);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchEvents(session.user.mid);
    }
  }, [session]);
  return (
    <DashboardCard title='Total events in a year'>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center the calendar
                alignItems: 'center',
                pt: 0,
                mt: '0px', // Adjust margin if needed
                maxWidth: '100%', // Ensure it doesn’t exceed container width
                minHeight: '300px', // Adjust height as needed
                overflow: 'hidden',
            }}
        >
            <LineChart
                width={950}
                height={400}
                series={[
                    { data: uData },
                ]}
                // xAxis={[{ scaleType: 'point', data: xLabels, label:'Months' }]}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: xLabels, 
                    label: 'Months',
                    tickSize: 10, // Adjust tick size for more space
                }]}
                yAxis={[{ label: 'No of events' }]}
            />
        </Box>
    </DashboardCard>
    
  );
}
