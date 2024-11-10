"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Box, Avatar, Paper, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useSession } from "next-auth/react";

// Define a type for the club data fields
type ClubData = {
  clubName: string;
  advisorName: string;
  coordinatorName: string;
  clubDescription?: string;
  clubImage?: string | null;
};

// Define a type for the edit mode state
type EditMode = {
  clubName: boolean;
  advisorName: boolean;
  coordinatorName: boolean;
  clubDescription: boolean;
};

const ClubDetails = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState<EditMode>({
    clubName: false,
    advisorName: false,
    coordinatorName: false,
    clubDescription: false,
  });

  const [clubData, setClubData] = useState<ClubData>({
    clubName: "",
    advisorName: "",
    coordinatorName: "",
    clubDescription: "",
    clubImage: "",
  });

  const [clubPicture, setClubPicture] = useState<string>("");

  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const fetchClubData = async () => {
    try {
      const response = await fetch(`/api/clubs/${session?.user?.cid}`);
      if (response.ok) {
        const data = await response.json();
        setClubData({
          clubName: data.clubname,
          advisorName: data.aname,
          coordinatorName: data.clubcoordinator,
          clubDescription: data.clubdescription,
          clubImage: data.clubimage || "",
        });
        setClubPicture(data.clubimage || "/images/profile/user-1.jpg");
      } else {
        setSnackbarMessage("Failed to fetch club data");
      }
    } catch (error) {
      setSnackbarMessage("Error fetching club data");
    }
  };


  // Fetch club data from the API endpoint
  useEffect(() => {
 
    fetchClubData();
  }, []);

  const handleEditToggle = (field: keyof ClubData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field: keyof ClubData, value: string) => {
    setClubData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Prepare the data to send in the PUT request
      const updatedClubData = {
        clubName: clubData.clubName,
        advisorName: clubData.advisorName,
        coordinatorName: clubData.coordinatorName,
        clubDescription: clubData.clubDescription,
      };
  
      // Send a PUT request to update the club details in the database
      const response = await fetch(`/api/clubs/${session?.user?.cid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClubData),
      });
  
      // Check if the response was successful
      if (response.ok) {
        setSnackbarMessage("Club details updated successfully");
        setIsEditing({
          clubName: false,
          advisorName: false,
          coordinatorName: false,
          clubDescription: false,
        });
        fetchClubData();
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || "Failed to update club details");
      }
    } catch (error) {
      setSnackbarMessage("Error updating club details");
    }
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
    setIsEditing({
      clubName: false,
      advisorName: false,
      coordinatorName: false,
      clubDescription: false,
    });
    setSnackbarMessage("Club details reset to initial values");
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
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === "Club details updated successfully" ? "success" : "error"} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default ClubDetails;
