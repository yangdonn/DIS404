'use client'
import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Card, CardActions, CardContent, TextField, Box, Typography, Snackbar, Alert, CardActionArea, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
// Define the types for the OutlinedCard component props
interface OutlinedCardProps {
  eventID: string;
  eventName: string;
  venue: string;
  dresscode: string;
  date: Date;
  imageUrl: string; 
  onFeedback: () => void;
}

// Main component for the OutlinedCard
const OutlinedCard: React.FC<OutlinedCardProps> = ({ eventName, venue, dresscode, date, imageUrl, onFeedback }) => { // Added imageUrl to parameters
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

  return (
    <Card variant="outlined" sx={{ maxWidth: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"  
            width="100"   
            image={imageUrl} // Use imageUrl here
            alt={eventName}
            sx={{
              objectFit: 'contain', 
              margin: 'auto',       
            }}
          />  
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {eventName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: '13px', color: '#8d94b3' }}>
              <strong>Venue:</strong> {venue}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: '13px', color: '#8d94b3' }}>
              <strong>Dress code:</strong> {dresscode}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#8d94b3' }}>
              <strong>Date:</strong> {formattedDate}
            </Typography>
          </CardContent>
        </CardActionArea>
      <Box sx={{ backgroundColor: '#f8f8f8' }}>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: '#f4fbf7',
              color: '#02b2af',
              borderColor: '#84d9d8',
              borderWidth: 2,
              '&:hover': {
                backgroundColor: '#e6f8f7',
                color: '#004d3e',
                borderColor: '#007f5f',
              },
              mr: 1,
            }}
            onClick={onFeedback}
          >
            Feedback
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

// Dialog form for submitting feedback
const FeedbackDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  event: { eventName: string; venue: string; dresscode: string; date: Date };
  onSave: (feedback: { comments: string}) => void;
}> = ({ open, onClose, event, onSave }) => {
  const [comments, setComments] = React.useState('');

  const handleSave = () => {
    onSave({ comments });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
          Feedback for {event.eventName}
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
          <Box sx={{mt: 1}}>
            <TextField
              label="Comments"
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              variant="outlined"
              InputProps={{
                style: { backgroundColor: '#fff', borderRadius: '5px' },
              }}
            />
          </Box>
          
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
          Save Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main component for displaying multiple cards
const CardGrid: React.FC = () => {
  const { data: session} = useSession();
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!session) return; // Wait until session is available
      try {
        const response = await fetch(`/api/events/${session.user.cid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const eventArray = Array.isArray(data) ? data : [data];

        // Transform the data from the API to match the format expected by OutlinedCard
        const transformedEvents = eventArray.map((event) => ({
          eventID: event.eid,
          eventName: event.ename,
          venue: event.evenue,
          dresscode: event.edresscode,
          date: new Date(event.edate),
          imageUrl: event.imageurl || '/images/logos/event.jpg', // Use default image if none provided
        }));

        setCardsData(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [session]);


  const [selectedEvent, setSelectedEvent] = useState<{ eventID: string; eventName: string; venue: string; dresscode: string; date: Date } | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleFeedback = (event: { eventID: string; eventName: string; venue: string; dresscode: string; date: Date }) => {
    setSelectedEvent(event);
    setFeedbackDialogOpen(true);
  };

  const handleSaveFeedback = async (feedback: { comments: string; rating: number }) => {
    if (!selectedEvent || !session) return;
  
    try {
      // Fetch the FeedID from the server
      const feedIdResponse = await fetch(`/api/getFeedbackID/${session.user.cid}`);
      const { latestFeedId } = await feedIdResponse.json();
      const lastIdNumber = parseInt(latestFeedId.slice(1), 10);
      const newFeedId = `B${String(lastIdNumber + 1).padStart(2, '0')}`;
  
      const feedbackData = {
        feedId: newFeedId,
        mId: session.user.mid,
        feedComments: feedback.comments,
      };
      console.log(selectedEvent.eventID)
      // Send the feedback to the API endpoint, using the selected event's eventID
      const response = await fetch(`/api/feedback/${selectedEvent.eventID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });
  
      if (response.ok) {
        setSnackbarMessage('Feedback submitted successfully!');
      } else {
        setSnackbarMessage('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
      setSnackbarMessage('Error submitting feedback');
    }
  
    handleCloseDialog();
  };
  

  const handleCloseDialog = () => {
    setFeedbackDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage(null); // Clear the snackbar message
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {cardsData.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.eventID}>
          <OutlinedCard
            eventName={card.eventName}
            venue={card.venue}
            dresscode={card.dresscode}
            date={card.date}
            imageUrl={card.imageUrl} // Pass imageUrl prop here
            onFeedback={() => handleFeedback(card)} />
        </Grid>
      ))}

      {selectedEvent && (
        <FeedbackDialog
          open={feedbackDialogOpen}
          onClose={handleCloseDialog}
          event={selectedEvent}
          onSave={handleSaveFeedback}
        />
      )}

      {/* Snackbar for feedback submission confirmation */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default CardGrid;

