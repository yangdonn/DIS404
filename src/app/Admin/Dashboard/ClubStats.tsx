import React from 'react';
import { Box, Typography } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

interface ClubStatsProps {
  total: number;
  active: number;
  inactive: number;
}

const ClubStats: React.FC<ClubStatsProps> = ({ total, active, inactive }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" justifyContent="space-around" alignItems="stretch">
        {/* Total Club Card */}
        <DashboardCard
          sx={{
            height: "250px", // Ensure all cards have the same height
            width: "300px", // Fixed width to ensure consistency
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 2, // Padding for larger size
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              sx={{
                bgcolor: "#0f6aba", // Background color
                borderRadius: "50%", // Circular shape
                p: 2, // Larger padding
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HowToRegIcon sx={{ color: "#ffffff", fontSize: 45 }} />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle1" color="GrayText">
                Total Clubs
              </Typography>
              <Typography variant="h5" fontWeight="bold" fontSize={30}>
                {total}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>

        {/* Active Card */}
        <DashboardCard
          sx={{
            height: "250px", // Ensure all cards have the same height
            width: "300px", // Fixed width to ensure consistency
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 2, // Padding for larger size
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              sx={{
                bgcolor: "#0f6aba", // Background color
                borderRadius: "50%", // Circular shape
                p: 2, // Larger padding
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HowToRegIcon sx={{ color: "#ffffff", fontSize: 45 }} />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle1" color="GrayText">
                Active Clubs
              </Typography>
              <Typography variant="h5" fontWeight="bold" fontSize={30}>
                {active}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>

        {/* Inactive club Card */}
        <DashboardCard
          sx={{
            height: "250px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 2, // Padding for larger size
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              sx={{
                bgcolor: "#0f6aba", // Background color
                borderRadius: "50%", // Circular shape
                p: 2, // Larger padding
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PersonOffIcon sx={{ color: "#ffffff", fontSize: 45 }} />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle1" color="GrayText">
                Inactive Clubs
              </Typography>
              <Typography variant="h5" fontWeight="bold" fontSize={30}>
                {inactive}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default ClubStats;
