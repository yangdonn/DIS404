'use client';

import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from "@mui/material";
import EventCards from "./Components/EventCards";

const Attendance: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"record" | "view" | null>(null);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      {/* Record/View Attendance options */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card
            variant="outlined"
            onClick={() => setSelectedTab("record")}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition
              backgroundColor: selectedTab === "record" ? "#f5f5f5" : "#fff", // Soft background color for selected tab
              boxShadow: selectedTab === "record" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
              "&:hover": {
                transform: "scale(1.02)", // Slightly larger scale for hover effect
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)", // Slightly more pronounced shadow on hover
                backgroundColor: "#f4f4f4", // Slight color change on hover
              },
              borderRadius: 2,
              border: "1px solid #ddd", // Light border for all cards
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">Record Attendance</Typography>
                <Typography variant="body2" color="text.secondary">
                  Start recording attendance for your events.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="outlined"
            onClick={() => setSelectedTab("view")}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition
              backgroundColor: selectedTab === "view" ? "#f5f5f5" : "#fff", // Soft background color for selected tab
              boxShadow: selectedTab === "view" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
              "&:hover": {
                transform: "scale(1.02)", // Slightly larger scale for hover effect
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)", // Slightly more pronounced shadow on hover
                backgroundColor: "#f4f4f4", // Slight color change on hover
              },
              borderRadius: 2,
              border: "1px solid #ddd", // Light border for all cards
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">View Attendance</Typography>
                <Typography variant="body2" color="text.secondary">
                  View past attendance records.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Show EventCards component based on selected tab */}
      {selectedTab && <EventCards mode={selectedTab} />}
    </Box>
  );
};

export default Attendance;
