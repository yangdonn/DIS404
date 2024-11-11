import * as React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  TextField,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import AddClubDialog from "./AddClub";

// Define the types for the OutlinedCard component props
interface OutlinedCardProps {
  clubName: string;
  advisorName: string;
  coordinatorName: string;
  onEdit: () => void;
  onDelete: () => void;
}

// Main component for the OutlinedCard
const OutlinedCard: React.FC<OutlinedCardProps> = ({
  clubName,
  advisorName,
  coordinatorName,
  onEdit,
  onDelete,
}) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 380 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          {clubName}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1, fontSize: "13px", color: "#8d94b3" }}
        >
          <strong>Advisor:</strong> {advisorName}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "13px", color: "#8d94b3" }}>
          <strong>Coordinator:</strong> {coordinatorName}
        </Typography>
      </CardContent>
      <Box sx={{ backgroundColor: "#f8f8f8" }}>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#f4fbf7",
              color: "#008767",
              borderColor: "#c8f4dc",
              borderWidth: 2,
              "&:hover": {
                backgroundColor: "#c8f4dc",
                color: "#004d3e",
                borderColor: "#007f5f",
              },
              mr: 1,
            }}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#f9efef",
              color: "#e43434",
              borderColor: "#f8dddd",
              borderWidth: 2,
              "&:hover": {
                backgroundColor: "#f28c8c",
                color: "white",
                borderColor: "#9b1b1b",
              },
            }}
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

// Dialog form for editing club details
const EditClubDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  club: {
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  };
  onSave: (updatedClub: {
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  }) => void;
}> = ({ open, onClose, club, onSave }) => {
  const [formValues, setFormValues] = React.useState(club);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    onSave(formValues);
    onClose();
  };

  //Design part of Edit button
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
          Edit Club Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 2, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ mt: 2, mb: -2 }}>
            <TextField
              name="clubName"
              label="Club Name"
              variant="outlined"
              value={formValues.clubName}
              onChange={handleChange}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: "5px" },
              }}
            />
            <TextField
              name="advisorName"
              label="Advisor Name"
              variant="outlined"
              value={formValues.advisorName}
              onChange={handleChange}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: "5px" },
              }}
            />
            <TextField
              name="coordinatorName"
              label="Coordinator Name"
              variant="outlined"
              value={formValues.coordinatorName}
              onChange={handleChange}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: "5px" },
              }}
            />
            <TextField
              name="clubDescription"
              label="Club Description"
              variant="outlined"
              multiline
              rows={4}
              value={formValues.clubDescription || ""}
              onChange={handleChange}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: "5px" },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", padding: "20px" }}>
        <Button
          onClick={onClose}
          style={{
            backgroundColor: "#d3d3d3",
            color: "#333",
            borderRadius: "5px",
            padding: "10px 20px",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "5px",
            padding: "10px 20px",
            marginLeft: "10px",
            textTransform: "none",
          }}
          variant="contained"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main component for displaying multiple cards
const CardGrid: React.FC = () => {


  const [cardsData, setCardsData] = React.useState([]);



  const fetchClubs = async () => {
    const response = await fetch("/api/clubs");
    const data = await response.json();
    const newData = Array.isArray(data)
      ? data.map((club) => ({
          clubName: club.club_name,
          advisorName: club.advisor_name,
          coordinatorName: club.member_name,
          clubDescription: club.club_description,
        }))
      : [
          {
            clubName: data.club_name,
            advisorName: data.advisor_name,
            coordinatorName: data.member_name,
            clubDescription: data.club_description,
          },
        ];
    setCardsData(newData);
  };
  useEffect(() => {
    // Fetch initial data
    fetchClubs();
  }, []);

  const [selectedClub, setSelectedClub] = React.useState<{
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | null>(
    null
  );
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [clubToDelete, setClubToDelete] = React.useState<string | null>(null);

  const handleAddClub = (newClub: {
    clubName: string;
    advisorName: string;
    coordinatorName: string;
  }) => {
    setCardsData((prevData) => [...prevData, newClub]);
    setAddDialogOpen(false);
  };

  const handleEdit = (club: {
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  }) => {
    setSelectedClub(club);
    setDialogOpen(true);
  };

  const handleDeleteClick = (clubName: string) => {
    setClubToDelete(clubName);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clubToDelete) {
      setCardsData((prevData) =>
        prevData.filter((card) => card.clubName !== clubToDelete)
      );
      setClubToDelete(null);
      setDialogOpen(false);
      setSnackbarMessage("Club deleted successfully");
    }
  };

  const handleCancelDelete = () => {
    setClubToDelete(null);
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedClub(null);
  };

  const handleSaveChanges = (updatedClub: {
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  }) => {
    setCardsData((prevData) =>
      prevData.map((card) =>
        card.clubName === selectedClub?.clubName
          ? { ...card, ...updatedClub }
          : card
      )
    );
    setSelectedClub(null);
    setSnackbarMessage("Club updated successfully");
    setDialogOpen(false);
  };
  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setAddDialogOpen(true)} // Open Add dialog
          style={{
            backgroundColor: "#00ac4f",
            color: "#fff",
            borderRadius: "5px",
            padding: "10px 20px",
            marginLeft: "10px",
            textTransform: "none",
          }}
        >
          Add New Club
        </Button>
      </Box>
      <Grid container spacing={2}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <OutlinedCard
              clubName={card.clubName}
              advisorName={card.advisorName}
              coordinatorName={card.coordinatorName}
              onEdit={() => handleEdit(card)}
              onDelete={() => handleDeleteClick(card.clubName)}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          style: {
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle>Delete Club</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this club?
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleCancelDelete}
            sx={{
              backgroundColor: "#d9d9d9",
              color: "#000000",
              width: 80,
              borderWidth: 2,
              "&:hover": {
                backgroundColor: "#C8C1C1",
                color: "black",
                borderColor: "#007f5f",
              },
              mr: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "#df0404",
              color: "#ffffff",
              width: 80,
              borderColor: "#f8dddd",
              borderWidth: 2,
              "&:hover": {
                backgroundColor: "#f28c8c",
                color: "white",
                borderColor: "#9b1b1b",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {selectedClub && (
        <EditClubDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          club={selectedClub}
          onSave={handleSaveChanges}
        />
      )}
      {/* Snackbar for notifications */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <AddClubDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddClub} // Handle saving new club
      />
    </>
  );
};

export default CardGrid;
