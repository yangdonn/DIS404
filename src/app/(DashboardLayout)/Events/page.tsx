'use client'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  Eventcalendar,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscEventClickEvent,
  setOptions,
  Toast,
  Popup,
  Input,
  Button,
} from '@mobiscroll/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './App.css'; // Import the CSS file

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const App: FC = () => {
  const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);
  const [isToastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTime, setEventTime] = useState<string>('12:00'); // Default time

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const myView = useMemo<MbscEventcalendarView>(
    () => ({
      calendar: { type: 'month' },
      agenda: { type: 'month' },

    }),
    [],
  );

  const handleEventClick = useCallback((args: MbscEventClickEvent) => {
    const confirmDelete = window.confirm(`Delete event: ${args.event.title}?`);
    if (confirmDelete) {
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== args.event.id)); // Delete event
    }
  }, []);

  const handleDateClick = useCallback((event: any) => {
    setSelectedDate(event.date); // Save the selected date
    setEventTime('12:00'); // Reset the time to default
    setPopupOpen(true); // Open the popup to enter the event details
  }, []);

  const handleAddEvent = () => {
    if (newEventTitle.trim() === '' || !selectedDate) {
      return; // Add validation as needed
    }

    // Create a new event object
    const startDate = new Date(selectedDate);
    const [hours, minutes] = eventTime.split(':').map(Number);
    startDate.setHours(hours, minutes); // Set event start time

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // Set event to last 1 hour

    const newEvent = {
      id: myEvents.length + 1, // Generate a new ID
      start: startDate,
      end: endDate,
      title: newEventTitle,
    };

    // Add the new event to the existing event list
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    // Clear input and close popup
    setNewEventTitle('');
    setEventTime('12:00'); // Reset time after adding
    setPopupOpen(false);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setNewEventTitle('');
    setEventTime('12:00'); // Reset time on close
  };

  return (
    <>
      <Eventcalendar
        clickToCreate={false} // Disable automatic event creation
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={true} // Enable deletion
        data={myEvents} // Event data
        view={myView}
        onEventClick={handleEventClick} // Show toast on event click
        onCellClick={handleDateClick} // Triggered when a date cell is clicked
        
      />

      {/* Popup to create new event */}
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} display="center">
        <div style={{ padding: '20px' }}>
          <h3>Create New Event</h3>
          <div className="input-container input-title">
            <label htmlFor="event-title">Event Description</label>
            <Input
              id="event-title"
              placeholder="Enter event description"
              value={newEventTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEventTitle(e.target.value)}
              required // Make the input required
            />
          </div>
          <div className="input-container input-time">
            <label htmlFor="event-time">Event Time</label>
            <Input
              id="event-time"
              type="time"
              value={eventTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventTime(e.target.value)}
              required // Make the input required
            />
          </div>
          <Button onClick={handleAddEvent} disabled={newEventTitle.trim() === '' }>Add Event</Button>
        </div>
      </Popup>

      {/* Toast message */}
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
};

export default App;
