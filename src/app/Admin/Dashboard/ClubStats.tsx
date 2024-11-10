import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const ClubStats = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <DashboardCard>
        {/* Wrap all child elements in a single Box */}
        <Box sx={{ mb: 1 }}>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Box display="flex" alignItems="center" textAlign="center">
              <Box
                sx={{
                  bgcolor: "#e3fff0", // Background color
                  borderRadius: "50%", // Circular shape
                  p: 1, // Padding for size
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PeopleIcon sx={{ color: "#00ac4f", fontSize: 27 }} />
              </Box>
              <Box ml={2}>
                <Typography variant="subtitle1" color="GrayText">
                  Total Clubs
                </Typography>{" "}
                {/* Smaller font size */}
                <Typography variant="h5" fontWeight="bold">
                  17
                </Typography>{" "}
                {/* Adjusted heading size */}
              </Box>
            </Box>
            {/* Vertical Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "50px" }}
            />{" "}
            {/* Custom height for Divider */}
            <Box display="flex" alignItems="center" textAlign="center">
              <Box
                sx={{
                  bgcolor: "#e3fff0", // Background color
                  borderRadius: "50%", // Circular shape
                  p: 1, // Padding for size
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HowToRegIcon sx={{ color: "#00ac4f", fontSize: 27 }} />{" "}
                {/* Adjust icon size */}
              </Box>
              <Box ml={2}>
                <Typography variant="subtitle1" color="GrayText">
                  Active Clubs
                </Typography>{" "}
                {/* Smaller font size */}
                <Typography variant="h5" fontWeight="bold">
                  17
                </Typography>{" "}
                {/* Adjusted heading size */}
              </Box>
            </Box>
            {/* Vertical Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "50px" }}
            />{" "}
            {/* Custom height for Divider */}
            <Box display="flex" alignItems="center" textAlign="center">
              <Box
                sx={{
                  bgcolor: "#e3fff0", // Background color
                  borderRadius: "50%", // Circular shape
                  p: 1, // Padding for size
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PersonOffIcon sx={{ color: "#00ac4f", fontSize: 27 }} />{" "}
                {/* Adjust icon size */}
              </Box>
              <Box ml={2}>
                <Typography variant="subtitle1" color="GrayText">
                  Inactive Clubs
                </Typography>{" "}
                {/* Smaller font size */}
                <Typography variant="h5" fontWeight="bold">
                  0
                </Typography>{" "}
                {/* Adjusted heading size */}
              </Box>
            </Box>
          </Box>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default ClubStats;

// //2
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Divider } from "@mui/material";
// import PeopleIcon from "@mui/icons-material/People";
// import HowToRegIcon from "@mui/icons-material/HowToReg";
// import PersonOffIcon from "@mui/icons-material/PersonOff";
// import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
// import axios from "axios"; // Import axios

// const ClubStats = () => {
//   const [totalClubs, setTotalClubs] = useState(0);
//   const [activeClubs, setActiveClubs] = useState(0);
//   const [inactiveClubs, setInactiveClubs] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchClubStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/clubs");
//         console.log("API response:", response.data);
//         const { total, active, inactiveClubs } = response.data;
//         setTotalClubs(17);
//         setActiveClubs(17);
//         setInactiveClubs(0);
//       } catch (err) {
//         console.error("Error fetching club statistics:", err);
//         // setError(" Failed to fetch club data ");
//       }
//     };

//     fetchClubStats();
//   }, []);

//   return (
//     <Box sx={{ mb: 3 }}>
//       <DashboardCard>
//         <Box sx={{ mb: 1 }}>
//           {error ? (
//             <Typography color="error" align="center">
//               {error}
//             </Typography>
//           ) : (
//             <Box
//               display="flex"
//               justifyContent="space-around"
//               alignItems="center"
//             >
//               <Box display="flex" alignItems="center" textAlign="center">
//                 <Box
//                   sx={{
//                     bgcolor: "#e3fff0",
//                     borderRadius: "50%",
//                     p: 1,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <PeopleIcon sx={{ color: "#00ac4f", fontSize: 27 }} />
//                 </Box>
//                 <Box ml={2}>
//                   <Typography variant="subtitle1" color="GrayText">
//                     Total Clubs
//                   </Typography>
//                   <Typography variant="h5" fontWeight="bold">
//                     {totalClubs}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Divider
//                 orientation="vertical"
//                 flexItem
//                 sx={{ height: "50px" }}
//               />

//               <Box display="flex" alignItems="center" textAlign="center">
//                 <Box
//                   sx={{
//                     bgcolor: "#e3fff0",
//                     borderRadius: "50%",
//                     p: 1,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <HowToRegIcon sx={{ color: "#00ac4f", fontSize: 27 }} />
//                 </Box>
//                 <Box ml={2}>
//                   <Typography variant="subtitle1" color="GrayText">
//                     Active Clubs
//                   </Typography>
//                   <Typography variant="h5" fontWeight="bold">
//                     {activeClubs}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Divider
//                 orientation="vertical"
//                 flexItem
//                 sx={{ height: "50px" }}
//               />

//               <Box display="flex" alignItems="center" textAlign="center">
//                 <Box
//                   sx={{
//                     bgcolor: "#e3fff0",
//                     borderRadius: "50%",
//                     p: 1,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <PersonOffIcon sx={{ color: "#00ac4f", fontSize: 27 }} />
//                 </Box>
//                 <Box ml={2}>
//                   <Typography variant="subtitle1" color="GrayText">
//                     Inactive Clubs
//                   </Typography>
//                   <Typography variant="h5" fontWeight="bold">
//                     {inactiveClubs}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </DashboardCard>
//     </Box>
//   );
// };

// export default ClubStats;
