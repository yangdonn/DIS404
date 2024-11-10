import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

// Define the types for the Calendar component props
interface CalendarProps {
  events: { date: string; title: string }[];
  selectedDate: string | null;
}

const Calendar: React.FC<CalendarProps> = ({ events, selectedDate }) => {
  // Helper function to check if a date has an event
  const isEventDate = (date: Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return events.some((event) => event.date === formattedDate);
  };


  return (
    <DashboardCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 0,
          mb: '-47px',
          maxWidth: '100%',
          minHeight: '300px',
          overflow: 'hidden',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={() => {}}
            shouldDisableDate={(date) => isEventDate(date)}
            sx={{
              '& .MuiPickersDay-root': {
                borderRadius: '50%', // Make days circular
                '&.Mui-selected': {
                  backgroundColor: '#1976d2', // Selected day color
                  color: 'white', // Selected day text color
                },
                '&:hover': {
                  backgroundColor: '#1976d2', // Hover effect for selected days
                  color: 'white',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#e3fff0', // Disabled day background -> Event dates with lighter shades
                  color: '#00ac4f', // Disabled day text color
                  '&.Mui-selected': {
                  backgroundColor: '#00ac4f', // Selected event day with darker shade
                  color: 'white', // Disabled day text color
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </DashboardCard>
  );
};

export default Calendar;
