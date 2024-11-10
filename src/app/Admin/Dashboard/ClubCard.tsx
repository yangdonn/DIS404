// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import AddClubDialog from "./AddClub";

// // Define the types for the OutlinedCard component props
// interface OutlinedCardProps {
//   clubName: string;
//   advisorName: string;
//   coordinatorName: string;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// // Main component for the OutlinedCard
// const OutlinedCard: React.FC<OutlinedCardProps> = ({
//   clubName,
//   advisorName,
//   coordinatorName,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <Card variant="outlined" sx={{ maxWidth: 380 }}>
//       <CardContent>
//         <Typography variant="h5" component="div" sx={{ mb: 2 }}>
//           {clubName}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ mb: 1, fontSize: "13px", color: "#8d94b3" }}
//         >
//           <strong>Advisor:</strong> {advisorName}
//         </Typography>
//         <Typography variant="body2" sx={{ fontSize: "13px", color: "#8d94b3" }}>
//           <strong>Coordinator:</strong> {coordinatorName}
//         </Typography>
//       </CardContent>
//       <Box sx={{ backgroundColor: "#f8f8f8" }}>
//         <CardActions sx={{ justifyContent: "flex-end" }}>
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: "#f4fbf7",
//               color: "#008767",
//               borderColor: "#c8f4dc",
//               borderWidth: 2,
//               "&:hover": {
//                 backgroundColor: "#c8f4dc",
//                 color: "#004d3e",
//                 borderColor: "#007f5f",
//               },
//               mr: 1,
//             }}
//             onClick={onEdit}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{
//               backgroundColor: "#f9efef",
//               color: "#e43434",
//               borderColor: "#f8dddd",
//               borderWidth: 2,
//               "&:hover": {
//                 backgroundColor: "#f28c8c",
//                 color: "white",
//                 borderColor: "#9b1b1b",
//               },
//             }}
//             onClick={onDelete}
//           >
//             Delete
//           </Button>
//         </CardActions>
//       </Box>
//     </Card>
//   );
// };

// // Dialog form for editing club details
// const EditClubDialog: React.FC<{
//   open: boolean;
//   onClose: () => void;
//   club: {
//     clubName: string;
//     advisorName: string;
//     coordinatorName: string;
//     clubDescription?: string;
//   };
//   onSave: (updatedClub: {
//     clubName: string;
//     advisorName: string;
//     coordinatorName: string;
//     clubDescription?: string;
//   }) => void;
// }> = ({ open, onClose, club, onSave }) => {
//   const [formValues, setFormValues] = React.useState(club);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSave = () => {
//     onSave(formValues);
//     onClose();
//   };

//   //Design part of Edit button
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         style: {
//           padding: "20px",
//           borderRadius: "10px",
//           backgroundColor: "#f9f9f9",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         },
//       }}
//     >
//       <DialogTitle>
//         <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
//           Edit Club Details
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <Box
//           component="form"
//           sx={{
//             "& .MuiTextField-root": { mb: 2, width: "100%" },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <Box sx={{ mt: 2, mb: -2 }}>
//             <TextField
//               name="clubName"
//               label="Club Name"
//               variant="outlined"
//               value={formValues.clubName}
//               onChange={handleChange}
//               InputProps={{
//                 style: { backgroundColor: "#fff", borderRadius: "5px" },
//               }}
//             />
//             <TextField
//               name="advisorName"
//               label="Advisor Name"
//               variant="outlined"
//               value={formValues.advisorName}
//               onChange={handleChange}
//               InputProps={{
//                 style: { backgroundColor: "#fff", borderRadius: "5px" },
//               }}
//             />
//             <TextField
//               name="coordinatorName"
//               label="Coordinator Name"
//               variant="outlined"
//               value={formValues.coordinatorName}
//               onChange={handleChange}
//               InputProps={{
//                 style: { backgroundColor: "#fff", borderRadius: "5px" },
//               }}
//             />
//             <TextField
//               name="clubDescription"
//               label="Club Description"
//               variant="outlined"
//               multiline
//               rows={4}
//               value={formValues.clubDescription || ""}
//               onChange={handleChange}
//               InputProps={{
//                 style: { backgroundColor: "#fff", borderRadius: "5px" },
//               }}
//             />
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions style={{ justifyContent: "center", padding: "20px" }}>
//         <Button
//           onClick={onClose}
//           style={{
//             backgroundColor: "#d3d3d3",
//             color: "#333",
//             borderRadius: "5px",
//             padding: "10px 20px",
//             textTransform: "none",
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSave}
//           style={{
//             backgroundColor: "#000",
//             color: "#fff",
//             borderRadius: "5px",
//             padding: "10px 20px",
//             marginLeft: "10px",
//             textTransform: "none",
//           }}
//           variant="contained"
//         >
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Main component for displaying multiple cards
// const CardGrid: React.FC = () => {
//   const [cardsData, setCardsData] = React.useState([
//     {
//       clubName: "RUB ACM Chapter",
//       advisorName: "John Doe",
//       coordinatorName: "Jane Smith",
//     },
//     {
//       clubName: "Tech Club",
//       advisorName: "Alice Johnson",
//       coordinatorName: "Bob Brown",
//     },
//     {
//       clubName: "Art Society",
//       advisorName: "Charlie Green",
//       coordinatorName: "Daisy White",
//     },
//     {
//       clubName: "Science Club",
//       advisorName: "Emily Black",
//       coordinatorName: "Frank Blue",
//     },
//     {
//       clubName: "Literature Circle",
//       advisorName: "Grace Pink",
//       coordinatorName: "Hank Gray",
//     },
//     {
//       clubName: "Music Group",
//       advisorName: "Ivy Orange",
//       coordinatorName: "Jack Yellow",
//     },
//     {
//       clubName: "RUB ACM Chapter",
//       advisorName: "John Doe",
//       coordinatorName: "Jane Smith",
//     },
//     {
//       clubName: "Tech Club",
//       advisorName: "Alice Johnson",
//       coordinatorName: "Bob Brown",
//     },
//     {
//       clubName: "Art Society",
//       advisorName: "Charlie Green",
//       coordinatorName: "Daisy White",
//     },
//     {
//       clubName: "Science Club",
//       advisorName: "Emily Black",
//       coordinatorName: "Frank Blue",
//     },
//     {
//       clubName: "Literature Circle",
//       advisorName: "Grace Pink",
//       coordinatorName: "Hank Gray",
//     },
//     {
//       clubName: "Music Group",
//       advisorName: "Ivy Orange",
//       coordinatorName: "Jack Yellow",
//     },
//   ]);

//   const [selectedClub, setSelectedClub] = React.useState<{
//     clubName: string;
//     advisorName: string;
//     coordinatorName: string;
//     clubDescription?: string;
//   } | null>(null);
//   const [dialogOpen, setDialogOpen] = React.useState(false);
//   const [addDialogOpen, setAddDialogOpen] = React.useState(false);
//   const [clubToDelete, setClubToDelete] = React.useState<string | null>(null);

//   const handleAddClub = (newClub: {
//     clubName: string;
//     advisorName: string;
//     coordinatorName: string;
//   }) => {
//     setCardsData((prevData) => [...prevData, newClub]);
//     setAddDialogOpen(false);
//   };

//   const handleEdit = (club: {
//     clubName: string;
//     advisorName: string;
//     coordinatorName: string;
//     clubDescription?: string;
//   }) => {
//     setSelectedClub(club);
//     setDialogOpen(true);
//   };

//   const handleDeleteClick = (clubName: string) => {
//     setClubToDelete(clubName);
//     setDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (clubToDelete) {
//       setCardsData((prevData) =>
//         prevData.filter((card) => card.clubName !== clubToDelete)
//       );
//       setClubToDelete(null);
//       setDialogOpen(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setClubToDelete(null);
//     setDialogOpen(false);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedClub(null);
//   };

//   const handleSaveChanges = (updatedClub: {
//     clubName: string;
//     advisorName: string;
//     coordinatorName: string;
//     clubDescription?: string;
//   }) => {
//     setCardsData((prevData) =>
//       prevData.map((card) =>
//         card.clubName === selectedClub?.clubName
//           ? { ...card, ...updatedClub }
//           : card
//       )
//     );
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
//         <Button
//           variant="contained"
//           onClick={() => setAddDialogOpen(true)} // Open Add dialog
//           style={{
//             backgroundColor: "#000",
//             color: "#fff",
//             borderRadius: "5px",
//             padding: "10px 20px",
//             marginLeft: "10px",
//             textTransform: "none",
//           }}
//         >
//           Add New Club
//         </Button>
//       </Box>
//       <Grid container spacing={2}>
//         {cardsData.map((card, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <OutlinedCard
//               clubName={card.clubName}
//               advisorName={card.advisorName}
//               coordinatorName={card.coordinatorName}
//               onEdit={() => handleEdit(card)}
//               onDelete={() => handleDeleteClick(card.clubName)}
//             />
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog
//         open={dialogOpen}
//         onClose={handleCancelDelete}
//         PaperProps={{
//           style: {
//             padding: "10px",
//             borderRadius: "10px",
//             backgroundColor: "#f9f9f9",
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           },
//         }}
//       >
//         <DialogTitle>Delete Club</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this club?
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center" }}>
//           <Button
//             onClick={handleCancelDelete}
//             sx={{
//               backgroundColor: "#d9d9d9",
//               color: "#000000",
//               width: 80,
//               borderWidth: 2,
//               "&:hover": {
//                 backgroundColor: "#C8C1C1",
//                 color: "black",
//                 borderColor: "#007f5f",
//               },
//               mr: 1,
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirmDelete}
//             sx={{
//               backgroundColor: "#df0404",
//               color: "#ffffff",
//               width: 80,
//               borderColor: "#f8dddd",
//               borderWidth: 2,
//               "&:hover": {
//                 backgroundColor: "#f28c8c",
//                 color: "white",
//                 borderColor: "#9b1b1b",
//               },
//             }}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {selectedClub && (
//         <EditClubDialog
//           open={dialogOpen}
//           onClose={handleCloseDialog}
//           club={selectedClub}
//           onSave={handleSaveChanges}
//         />
//       )}
//       <AddClubDialog
//         open={addDialogOpen}
//         onClose={() => setAddDialogOpen(false)}
//         onSave={handleAddClub} // Handle saving new club
//       />
//     </>
//   );
// };

// export default CardGrid;

import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
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

  // Design part of Edit button
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
  const [selectedClub, setSelectedClub] = React.useState<{
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [clubToDelete, setClubToDelete] = React.useState<string | null>(null);

  // Fetch club data from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clubs")
      .then((response) => {
        setCardsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the club data!", error);
      });
  }, []);

  const handleAddClub = (newClub: {
    clubname: string;
    clubadvisor: string;
    clubcoordinator: string;
  }) => {
    setCardsData((prevData) => [...prevData, newClub]);
    setAddDialogOpen(false);
  };

  const handleEdit = (club: {
    clubid: string;
    clubname: string;
    clubadvisor: string;
    clubcoordinator: string;
    clubDescription?: string;
  }) => {
    setSelectedClub({
      clubid: club.club_id,
      clubName: club.club_name,
      advisorName: club.advisor_name,
      coordinatorName: club.member_name,
      clubDescription: club.club_description || "",
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (clubname: string) => {
    setClubToDelete(clubname);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clubToDelete) {
      setCardsData((prevData) =>
        prevData.filter((card) => card.clubname !== clubToDelete)
      );
      setClubToDelete(null);
      setDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setClubToDelete(null);
    setDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setDialogOpen(false);
    setSelectedClub(null);
  };

  // const handleSaveChanges = (updatedClub: {
  //   clubName: string;
  //   advisorName: string;
  //   coordinatorName: string;
  //   clubDescription?: string;
  // }) => {
  //   setCardsData((prevData) =>
  //     prevData.map((card) =>
  //       card.clubname === selectedClub?.clubName
  //         ? { ...card, ...updatedClub }
  //         : card
  //     )
  //   );
  //   handleCloseEditDialog(); // Close edit dialog after saving changes
  // };

  const handleSaveChanges = (updatedClub: {
    clubid: string;
    clubName: string;
    advisorName: string;
    coordinatorName: string;
    clubDescription?: string;
  }) => {
    if (selectedClub) {
      axios
        .put(`http://localhost:3000/api/clubs/${selectedClub.clubid}`, {
          clubName: updatedClub.clubName,
          advisorName: updatedClub.advisorName,
          coordinatorName: updatedClub.coordinatorName,
          clubDescription: updatedClub.clubDescription,
        })
        .then((response) => {
          console.log(response.data); // Success response

          // Update the local state to reflect changes
          setCardsData((prevData) =>
            prevData.map((card) =>
              card.clubid === selectedClub.clubid
                ? { ...card, ...updatedClub }
                : card
            )
          );
          handleCloseEditDialog(); // Close edit dialog after saving changes
        })
        .catch((error) => {
          console.error("Error updating club data:", error);
        });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setAddDialogOpen(true)} // Open Add dialog
          style={{
            backgroundColor: "#000",
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
              clubName={card.club_name}
              advisorName={card.advisor_name}
              coordinatorName={card.member_name}
              onEdit={() => handleEdit(card)}
              onDelete={() => handleDeleteClick(card.club_name)}
            />
          </Grid>
        ))}
      </Grid>
      {/* Delete Confirmation Dialog */}
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
      {/* Edit Club Dialog */}
      {selectedClub && (
        <EditClubDialog
          open={dialogOpen} // Use dialogOpen here
          onClose={handleCloseEditDialog}
          club={selectedClub}
          onSave={handleSaveChanges}
        />
      )}
      {/* Add Club Dialog */}
      <AddClubDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddClub} // Handle saving new club
      />
    </>
  );
};

export default CardGrid;
