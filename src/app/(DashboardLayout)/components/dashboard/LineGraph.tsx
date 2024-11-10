import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import DashboardCard from '../shared/DashboardCard';
import { Box } from '@mui/material';

const uData = [5, 3, 6, 3, 8, 1, 7, 3, 6, 3, 8, 1];
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
