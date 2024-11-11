import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, Snackbar, Alert } from '@mui/material';

interface AddClubDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newClub: {
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
    username?: string;
    password?: string;
  }) => void;
}

const AddClubDialog: React.FC<AddClubDialogProps> = ({ open, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({
    clubName: '',
    advisorName: '',
    coordinatorName: '',
    coordinatorNumber: '',
    clubDescription: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onSave(formValues);
    onClose();
    setTimeout(() => setShowSuccessMessage(true), 300); // Show success message after dialog close
  };

  const handleCloseSnackbar = () => {
    setShowSuccessMessage(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            padding: '5px',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
            Add New Club
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 2,mb: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="clubName"
              label="Club Name"
              variant="outlined"
              value={formValues.clubName}
              onChange={handleChange}
            />
            <TextField
              name="advisorName"
              label="Advisor Name"
              variant="outlined"
              value={formValues.advisorName}
              onChange={handleChange}
            />
            <TextField
              name="coordinatorName"
              label="Coordinator Name"
              variant="outlined"
              value={formValues.coordinatorName}
              onChange={handleChange}
            />
            <TextField
              name="coordinatorNumber"
              label="Coordinator Number"
              variant="outlined"
              value={formValues.coordinatorNumber}
              onChange={handleChange}
            />
            <TextField
              name="clubDescription"
              label="Club Description"
              variant="outlined"
              value={formValues.clubDescription}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              value={formValues.username}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formValues.password}
              onChange={handleChange}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={5000} // Increased duration for visibility
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Club has been successfully added!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddClubDialog;
