'use client';

import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import RecordAttendance from "./RecordAttendance";
import ViewAttendance from "./ViewAttendance";

type EventCardsProps = {
  mode: "record" | "view";
};

const events = [
  { id: 1, name: "Welcome Gathering", venue: "Teamwork Hall", dresscode: "Formal", date: new Date('2024-07-27') },
  { id: 2, name: "First Meeting", venue: "LH-01", dresscode: "Casual", date: new Date('2024-08-02') },
  { id: 3, name: "Tech Talk Contest", venue: "Convention Hall", dresscode: "Formal", date: new Date('2024-07-17') },
  { id: 4, name: "Event 4", venue: "Teamwork Hall", dresscode: "Formal", date: new Date('2024-07-27') },
  { id: 5, name: "Event 5", venue: "LH-01", dresscode: "Casual", date: new Date('2024-08-02') },
  { id: 6, name: "Event 6", venue: "Convention Hall", dresscode: "Formal", date: new Date('2024-07-17') },
  { id: 7, name: "Event 7", venue: "Teamwork Hall", dresscode: "Formal", date: new Date('2024-07-27') },
  { id: 8, name: "Event 8", venue: "LH-01", dresscode: "Casual", date: new Date('2024-08-02') },
  { id: 9, name: "Event 9", venue: "Convention Hall", dresscode: "Formal", date: new Date('2024-07-17') },
];

const initialData = [
  { id: 1, studentId: "S001", name: "Alice", department: "IT", year: "2nd", status: false },
  { id: 2, studentId: "S002", name: "Bob", department: "CS", year: "3rd", status: false },
  { id: 3, studentId: "S003", name: "Charlie", department: "IT", year: "1st", status: false },
  { id: 4, studentId: "S004", name: "Roy", department: "IT", year: "2nd", status: false },
  { id: 5, studentId: "S005", name: "Alien", department: "CS", year: "3rd", status: false },
  { id: 6, studentId: "S006", name: "Exo", department: "IT", year: "1st", status: false },
];

const EventCards: React.FC<EventCardsProps> = ({ mode }) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [attendanceData, setAttendanceData] = useState(initialData);

  // Format date to DD/MM/YYYY
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select an Event
      </Typography>

      {/* Event cards with horizontal scroll */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 3 }}>
        {events.map((event) => (
          <Card
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            sx={{
              minWidth: 250,
              cursor: "pointer",
              backgroundColor: selectedEvent === event.id ? "#f5f5f5" : "#fff", // Soft background color for selected card
              boxShadow: selectedEvent === event.id ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.1)", // Slightly more prominent shadow for selected card
              transition: "transform 0.2s ease, box-shadow 0.2s ease", // Transition for both hover and selection state
              borderRadius: 2,
              border: "1px solid #ddd", // Light border for all cards
              "&:hover": {
                transform: "scale(1.02)", // Slightly smaller scale for subtle interaction
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)", // More subtle shadow on hover
              },
            }}
          >
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                {event.name}
              </Typography>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "#8d94b3" }}>
                    <strong>Venue:</strong> {event.venue}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "#8d94b3" }}>
                    <strong>Dress code:</strong> {event.dresscode}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "#8d94b3" }}>
                    <strong>Date:</strong> {formatDate(event.date)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Show RecordAttendance or ViewAttendance based on the selected event and mode */}
      {selectedEvent && (
        mode === "record" ? 
          <RecordAttendance eventId={selectedEvent} attendanceData={attendanceData} setAttendanceData={setAttendanceData} /> : 
          <ViewAttendance eventId={selectedEvent} attendanceData={attendanceData} />
      )}
    </Box>
  );
};

export default EventCards;
