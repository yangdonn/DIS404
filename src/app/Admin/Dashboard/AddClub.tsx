// AddClubDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography } from '@mui/material';

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
  const [formValues, setFormValues] = React.useState({
    clubName: '',
    advisorName: '',
    coordinatorName: '',
    clubDescription: '',
    username: '',
    password: '',
    confirmPassword: '', // Added confirmation password to state
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    // You may want to validate that password and confirmPassword match
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onSave(formValues);
    onClose();
  };

  return (
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
            '& .MuiTextField-root': { mb: 2, width: '100%' },
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
            InputProps={{
              style: { backgroundColor: '#fff', borderRadius: '5px' },
            }}
          />
          <TextField
            name="advisorName"
            label="Advisor Name"
            variant="outlined"
            value={formValues.advisorName}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: '#fff', borderRadius: '5px' },
            }}
          />
          <TextField
            name="coordinatorName"
            label="Coordinator Name"
            variant="outlined"
            value={formValues.coordinatorName}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: '#fff', borderRadius: '5px' },
            }}
          />
          <TextField
            name="clubDescription"
            label="Club Description"
            variant="outlined"
            multiline
            rows={3}
            value={formValues.clubDescription}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: '#fff', borderRadius: '5px' },
            }}
          />
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.username}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', padding: '20px' }}>
        <Button
          onClick={onClose}
          style={{
            backgroundColor: '#d3d3d3',
            color: '#333',
            borderRadius: '5px',
            padding: '10px 20px',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            padding: '10px 20px',
            marginLeft: '10px',
            textTransform: 'none',
          }}
          variant="contained"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClubDialog;
