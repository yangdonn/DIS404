"use client";
import React, { ChangeEvent, useState } from "react";
import {Box, Avatar, Paper, Button, TextField, Typography, Snackbar, Alert} from "@mui/material";

// Define a type for the club data fields
type ClubData = {
  clubName: string;
  advisorName: string;
  coordinatorName: string;
  clubDescription?: string;
};

// Define a type for the edit mode state
type EditMode = {
  clubName: boolean;
  advisorName: boolean;
  coordinatorName: boolean;
  clubDescription: boolean;
};

const ClubDetails = () => {
  const [isEditing, setIsEditing] = useState<EditMode>({
    clubName: false,
    advisorName: false,
    coordinatorName: false,
    clubDescription: false,
  });

  const [clubData, setClubData] = useState<ClubData>({
    clubName: "Tech Club",
    advisorName: "Dr. John Doe",
    coordinatorName: "Alice Smith",
    clubDescription: "A club dedicated to technology and innovation.",
  });
  const [clubPicture, setClubPicture] = useState<string>("/images/profile/user-1.jpg");

  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleEditToggle = (field: keyof ClubData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field: keyof ClubData, value: string) => {
    setClubData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing({
      clubName: false,
      advisorName: false,
      coordinatorName: false,
      clubDescription: false,
    });
    setSnackbarMessage('Club details updated successfully');
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
  };

  const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setClubPicture(imageUrl);
    }
  };

  const handleCancel = () => {
    // Reset to initial club data
    setClubData({
      clubName: "Tech Club",
      advisorName: "Dr. John Doe",
      coordinatorName: "Alice Smith",
      clubDescription: "A club dedicated to technology and innovation.",
    });

    setIsEditing({
      clubName: false,
      advisorName: false,
      coordinatorName: false,
      clubDescription: false,
    });
    setSnackbarMessage('Club details set back to initial');
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 5, width: 700, height: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
            Edit club information
          </Typography>
          <Box sx={{ mt: 4}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <Avatar
                src={clubPicture}
                alt="Profile Picture"
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <input
                accept="image/*"
                id="club-picture-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handlePictureChange}
              />
              <label htmlFor="club-picture-upload">
                <Button variant="outlined" component="span" sx={{ mb: 3 }}>
                  Edit Picture
                </Button>
              </label>
            </Box>
            
            <TextField
              fullWidth
              value={clubData.clubName}
              onChange={(e) => handleInputChange("clubName", e.target.value)}
              onClick={() => handleEditToggle("clubName")}
              InputProps={{ readOnly: !isEditing.clubName }}
              label="Club Name"
              variant="outlined"
              sx={{
                mb: 5,
                "& .MuiInputBase-root": {
                  height: 50,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 14,
                },
                "& .MuiInputBase-input": {
                  fontSize: 14,
                },
              }}
            />

            <TextField
              fullWidth
              value={clubData.advisorName}
              onChange={(e) => handleInputChange("advisorName", e.target.value)}
              onClick={() => handleEditToggle("advisorName")}
              InputProps={{ readOnly: !isEditing.advisorName }}
              label="Advisor Name"
              variant="outlined"
              sx={{
                mb: 5,
                "& .MuiInputBase-root": {
                  height: 50,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 14,
                },
                "& .MuiInputBase-input": {
                  fontSize: 14,
                },
              }}
            />

            <TextField
              fullWidth
              value={clubData.coordinatorName}
              onChange={(e) => handleInputChange("coordinatorName", e.target.value)}
              onClick={() => handleEditToggle("coordinatorName")}
              InputProps={{ readOnly: !isEditing.coordinatorName }}
              label="Coordinator Name"
              variant="outlined"
              sx={{
                mb: 5,
                "& .MuiInputBase-root": {
                  height: 50,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 14,
                },
                "& .MuiInputBase-input": {
                  fontSize: 14,
                },
              }}
            />
            <TextField
              fullWidth
              value={clubData.clubDescription}
              onChange={(e) => handleInputChange("clubDescription", e.target.value)}
              onClick={() => handleEditToggle("clubDescription")}
              InputProps={{ readOnly: !isEditing.clubDescription }}
              label="Club Description"
              variant="outlined"
              multiline
              rows={4}
              sx={{
                mb: 1,
                "& .MuiInputBase-root": {
                  height: 120,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 14,
                },
                "& .MuiInputBase-input": {
                  fontSize: 14,
                  whiteSpace: "pre-line",
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
              <Button
                variant="contained"
                onClick={handleSave}
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "5px",
                  textTransform: "none",
                }}
                sx={{
                  mt: 1,
                  padding: "12px 24px",
                  fontSize: 14,
                  width: 100,
                  mr: 5,
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#d3d3d3",
                  color: "#333",
                  borderRadius: "5px",
                  textTransform: "none",
                }}
                onClick={handleCancel}
                sx={{
                  mt: 1,
                  padding: "12px 24px",
                  fontSize: 14,
                  width: 100,
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClubDetails;
