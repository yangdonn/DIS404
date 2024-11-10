

import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box, Select, MenuItem, Typography } from "@mui/material";

// Example data (replace this with your actual dataset)
export const values = [
  { value: 50, label: "Total Events", date: "2024-11-05" },
  { value: 30, label: "Event Conducted", date: "2024-10-15" },
  { value: 20, label: "Upcoming Events", date: "2024-11-20" },
];

// Function to filter data by month or week
const filterData = (data, filterType) => {
  const now = new Date();
  if (filterType === "month") {
    return data.filter((item) => {
      const eventDate = new Date(item.date);
      return (
        eventDate.getFullYear() === now.getFullYear() &&
        eventDate.getMonth() === now.getMonth()
      );
    });
  } else if (filterType === "week") {
    const startOfWeek = new Date(now);
    const endOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return data.filter((item) => {
      const eventDate = new Date(item.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  }
  return data; // Return unfiltered data if filterType is default (empty)
};

export default function PieArcLabel() {
  // State for selected filter (default to "")
  const [filterType, setFilterType] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(values);

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter);
    setFilteredData(filterData(values, selectedFilter)); // Update filtered data based on selected filter
  };

  // Determine if filtered data is empty
  const isDataEmpty =
    filteredData.length === 0 ||
    filteredData.reduce((sum, item) => sum + item.value, 0) === 0;

  return (
    <Box>
      {/* Filter options */}
      <Select value={filterType} onChange={handleFilterChange}>
        <MenuItem value="Overall">Filter</MenuItem>
        <MenuItem value="month">This Month</MenuItem>
        <MenuItem value="week">This Week</MenuItem>
      </Select>

      {/* Pie Chart or Message */}
      {isDataEmpty ? (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ marginTop: 2 }}
        >
          No events available for the selected period
        </Typography>
      ) : (
        <PieChart
          series={[
            {
              data: filteredData,
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "50%",
              color: (item) =>
                item.label === "Event Conducted" ? "blue" : "gray",
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
            },
          }}
          {...size}
        />
      )}
    </Box>
  );
}

// Size of the chart
const size = {
  width: 400,
  height: 200,
};
