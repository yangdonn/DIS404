// import * as React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Card, CardActions, CardContent, TextField, Box, Typography, Snackbar, Alert } from '@mui/material';

// // Define the types for the OutlinedCard component props
// interface OutlinedCardProps {
//   eventName: string;
//   venue: string;
//   dresscode: string;
//   date: Date;
//   onFeedback: () => void;
// }

// // Main component for the OutlinedCard
// const OutlinedCard: React.FC<OutlinedCardProps> = ({ eventName, venue, dresscode, date, onFeedback }) => {
//   const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

//   return (
//     <Card variant="outlined" sx={{ maxWidth: 380 }}>
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ mb: 2 }}>
//           {eventName}
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 1, fontSize: '13px', color: '#8d94b3' }}>
//           <strong>Venue:</strong> {venue}
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 1, fontSize: '13px', color: '#8d94b3' }}>
//           <strong>Dress code:</strong> {dresscode}
//         </Typography>
//         <Typography variant="body2" sx={{ fontSize: '13px', color: '#8d94b3' }}>
//           <strong>Date:</strong> {formattedDate}
//         </Typography>
//       </CardContent>
//       <Box sx={{ backgroundColor: '#f8f8f8' }}>
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: '#f4fbf7',
//               color: '#02b2af',
//               borderColor: '#84d9d8',
//               borderWidth: 2,
//               '&:hover': {
//                 backgroundColor: '#e6f8f7',
//                 color: '#004d3e',
//                 borderColor: '#007f5f',
//               },
//               mr: 1,
//             }}
//             onClick={onFeedback}
//           >
//             Feedback
//           </Button>
//         </CardActions>
//       </Box>
//     </Card>
//   );
// };

// // Dialog form for submitting feedback
// const FeedbackDialog: React.FC<{
//   open: boolean;
//   onClose: () => void;
//   event: { eventName: string; venue: string; dresscode: string; date: Date };
//   onSave: (feedback: { comments: string; rating: number }) => void;
// }> = ({ open, onClose, event, onSave }) => {
//   const [comments, setComments] = React.useState('');
//   const [rating, setRating] = React.useState<number | ''>('');

//   const handleSave = () => {
//     onSave({ comments, rating: Number(rating) });
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         style: {
//           padding: '20px',
//           borderRadius: '10px',
//           backgroundColor: '#f9f9f9',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         },
//       }}
//     >
//       <DialogTitle>
//         <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
//           Feedback for {event.eventName}
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <Box
//           component="form"
//           sx={{
//             '& .MuiTextField-root': { mb: 2, width: '100%' },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <Box sx={{mt: 1}}>
//             <TextField
//               label="Comments"
//               multiline
//               rows={4}
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//               variant="outlined"
//               InputProps={{
//                 style: { backgroundColor: '#fff', borderRadius: '5px' },
//               }}
//             />
//           </Box>
          
//         </Box>
//       </DialogContent>
//       <DialogActions style={{ justifyContent: 'center', padding: '20px' }}>
//         <Button
//           onClick={onClose}
//           style={{
//             backgroundColor: '#d3d3d3',
//             color: '#333',
//             borderRadius: '5px',
//             padding: '10px 20px',
//             textTransform: 'none',
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSave}
//           style={{
//             backgroundColor: '#000',
//             color: '#fff',
//             borderRadius: '5px',
//             padding: '10px 20px',
//             marginLeft: '10px',
//             textTransform: 'none',
//           }}
//           variant="contained"
//         >
//           Save Feedback
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Main component for displaying multiple cards
// const CardGrid: React.FC = () => {
//   const [cardsData, setCardsData] = React.useState([
//     { eventName: 'Welcome Gathering', venue: 'Teamwork hall', dresscode: 'Formal', date: new Date('2024-07-27') },
//     { eventName: 'First meeting', venue: 'LH - 01', dresscode: 'Casual', date: new Date('2024-08-02') },
//     { eventName: 'Tech Talk Contest', venue: 'Convention hall', dresscode: 'Formal', date: new Date('2024-07-17') },
//     { eventName: 'Seminar 1', venue: 'Convention hall', dresscode: 'Formal', date: new Date('2024-08-10') },
//     { eventName: 'ICPC', venue: 'OOS and Software lab', dresscode: 'Formal', date: new Date('2024-11-01') },
//     { eventName: 'ITS', venue: 'Innotech hall', dresscode: 'Casual', date: new Date('2024-07-27') },
//   ]);

//   const [selectedEvent, setSelectedEvent] = React.useState<{ eventName: string; venue: string; dresscode: string; date: Date } | null>(null);
//   const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState<string | null>(null);

//   const handleFeedback = (event: { eventName: string; venue: string; dresscode: string; date: Date }) => {
//     setSelectedEvent(event);
//     setFeedbackDialogOpen(true);
//   };

//   const handleSaveFeedback = (feedback: { comments: string; rating: number }) => {
//     console.log('Feedback saved:', feedback);
//     setSnackbarMessage('Feedback submitted successfully!'); // Set success message
//     handleCloseDialog();
//     // Handle feedback saving logic here (e.g., update state or send to backend)
//   };

//   const handleCloseDialog = () => {
//     setFeedbackDialogOpen(false);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarMessage(null); // Clear the snackbar message
//   };

//   return (
//     <Grid container spacing={2} sx={{ padding: 2 }}>
//       {cardsData.map((card) => (
//         <Grid item xs={12} sm={6} md={4} key={card.eventName}>
//           <OutlinedCard
//             eventName={card.eventName}
//             venue={card.venue}
//             dresscode={card.dresscode}
//             date={card.date}
//             onFeedback={() => handleFeedback(card)}
//           />
//         </Grid>
//       ))}

//       {selectedEvent && (
//         <FeedbackDialog
//           open={feedbackDialogOpen}
//           onClose={handleCloseDialog}
//           event={selectedEvent}
//           onSave={handleSaveFeedback}
//         />
//       )}

//       {/* Snackbar for feedback submission confirmation */}
//       <Snackbar
//         open={!!snackbarMessage}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Grid>
//   );
// };

// export default CardGrid;
