'use client';

import React, { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Snackbar, Alert, Button, TextField, IconButton, InputAdornment, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Student = {
  id: number;
  studentId: string;
  name: string;
  department: string;
  year: string;
  status: boolean;
};

interface RecordAttendanceProps {
  eventId: number;
  attendanceData: Student[];
  setAttendanceData: React.Dispatch<React.SetStateAction<Student[]>>;
}

const RecordAttendance: React.FC<RecordAttendanceProps> = ({ eventId, attendanceData, setAttendanceData }) => {
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  // Store the initial attendance data
  const [initialAttendanceData, setInitialAttendanceData] = useState<Student[]>(attendanceData);

  useEffect(() => {
    // Update initial attendance data whenever the attendanceData prop changes
    setInitialAttendanceData(attendanceData);
  }, [attendanceData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (id: number) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === id ? { ...student, status: !student.status } : student
      )
    );
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  // Filter the data based on search term
  const filteredData = attendanceData.filter((student) => {
    const isSearchMatch =
      student.studentId.toLowerCase().includes(search.toLowerCase()) ||
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.department.toLowerCase().includes(search.toLowerCase()) ||
      student.year.toLowerCase().includes(search.toLowerCase());

    const isDepartmentMatch = selectedDepartment === "All" || student.department === selectedDepartment;

    return isSearchMatch && isDepartmentMatch;
  });

  const handleSave = () => {
    setSnackbarMessage("Attendance saved successfully!");
  };

  const handleCancel = () => {
    // Reset the attendance data to its initial state
    setAttendanceData(initialAttendanceData);
    setSnackbarMessage("Changes have been discarded.");
  };

  return (
    <Box>
      {/* Search and Department Filter Controls */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mt:2}}>
        {/* Department Filter Dropdown */}
        <FormControl size="small" sx={{ mr: 2 }}>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            displayEmpty
            IconComponent={ArrowDropDownIcon}
            sx={{ width: 170 }}
          >
            <MenuItem value="All">All departments</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="ECE">ECE</MenuItem>
            <MenuItem value="EG">EG</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="ICE">ICE</MenuItem>
          </Select>
        </FormControl>

        {/* Search Field */}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><SearchIcon /></IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
      </Box>

      {/* Attendance Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Student ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Year</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={{ fontSize: "14px" }}>{student.studentId}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{student.name}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{student.department}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{student.year}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  <Checkbox
                    checked={student.status}
                    onChange={() => handleStatusChange(student.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Save and Cancel Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button 
        onClick={handleCancel}
        sx={{ mr: 2 }}
        variant="contained"
        style={{
          backgroundColor: '#d3d3d3',
          color: '#333',
          borderRadius: '5px',
          padding: '10px 20px',
          width: 80,
          textTransform: 'none',
        }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave} style={{
           backgroundColor: '#000',
           color: '#fff',
           borderRadius: '5px',
           padding: '10px 20px',
           width: 80,
           marginLeft: '10px',
           textTransform: 'none',
        }}>
          Save
        </Button>
      </Box>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarMessage(null)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecordAttendance;
