import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import DashboardCard from "../shared/DashboardCard";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

// Label array for the x-axis
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type EventType = { edate: string };

export default function SimpleLineChart() {
  const { data: session } = useSession();
  const [uData, setUData] = useState(Array(12).fill(0)); // Initialize with 12 zeroes for each month
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 950, height: 400 });

  // Function to fetch events based on user ID
  const fetchEvents = async (userId: string) => {
    try {
      const response = await fetch(`/api/getEvents/${userId}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data: EventType[] = await response.json();

      // Count events per month
      const monthCounts = Array(12).fill(0);
      data.forEach((event) => {
        const eventMonth = new Date(event.edate).getMonth(); // Get month index (0 for Jan, 11 for Dec)
        monthCounts[eventMonth]++;
      });

      setUData(monthCounts);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Use effect to fetch events once session is available
  useEffect(() => {
    if (session) {
      fetchEvents(session.user.mid);
    }
  }, [session]);

  // Resize observer to update dimensions on container resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = width * 0.5; // Set height as a percentage of width (e.g., 40%)
        setDimensions({ width, height });
      }
    };

    handleResize(); // Initial resize call

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect(); // Clean up observer
  }, []);

  return (
    <DashboardCard title="Total events in a year">
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0,
          mt: "0px",
          maxWidth: "100%",
          minHeight: "300px",
          overflow: "hidden",
        }}
      >
        <LineChart
          width={dimensions.width} // Dynamic width
          height={dimensions.height} // Dynamic height
          series={[{ data: uData }]}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
              label: "Months",
              tickSize: 10,
            },
          ]}
          yAxis={[{ label: "No of events" }]}
        />
      </Box>
    </DashboardCard>
  );
}
