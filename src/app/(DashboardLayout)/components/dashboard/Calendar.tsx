import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Box } from '@mui/material';

const Calendar = () => {
    return (
        <DashboardCard>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center the calendar
                    alignItems: 'center',
                    p: 0, // Set padding to 0 to match RecentEvents
                    mb: '-47px', // Adjust margin if needed
                    maxWidth: '100%', // Ensure it doesn’t exceed container width
                    minHeight: '300px', // Adjust height as needed
                    overflow: 'hidden',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </Box>
        </DashboardCard> 
    );
}

export default Calendar;
