import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const MemberStats = () => {
  return (
    <Box sx={{ mb: 3 }}>
        <DashboardCard>
            {/* Wrap all child elements in a single Box */}
            <Box sx={{mb:1}}>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                    <Box display="flex" alignItems="center" textAlign="center">
                        <Box
                            sx={{
                            bgcolor: '#e3fff0', // Background color
                            borderRadius: '50%', // Circular shape
                            p: 1, // Padding for size
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}
                        >
                            <PeopleIcon sx={{ color: '#00ac4f', fontSize: 27 }} />
                        </Box>
                        <Box ml={2}>
                            <Typography variant="subtitle1" color="GrayText">Total Members</Typography> {/* Smaller font size */}
                            <Typography variant="h5" fontWeight="bold">100</Typography> {/* Adjusted heading size */}
                        </Box>
                    </Box>

                    {/* Vertical Divider */}
                    <Divider orientation="vertical" flexItem sx={{ height: '50px' }} /> {/* Custom height for Divider */}

                    <Box display="flex" alignItems="center" textAlign="center">
                        <Box
                                sx={{
                                bgcolor: '#e3fff0', // Background color
                                borderRadius: '50%', // Circular shape
                                p: 1, // Padding for size
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}
                            >
                            <ManIcon sx={{ color: '#00ac4f', fontSize: 27 }} /> {/* Adjust icon size */}
                        </Box>
                        <Box ml={2}>
                            <Typography variant="subtitle1" color="GrayText">Male</Typography> {/* Smaller font size */}
                            <Typography variant="h5" fontWeight="bold">59</Typography> {/* Adjusted heading size */}
                        </Box>
                    </Box>

                    {/* Vertical Divider */}
                    <Divider orientation="vertical" flexItem sx={{ height: '50px' }} /> {/* Custom height for Divider */}

                    <Box display="flex" alignItems="center" textAlign="center">
                    <Box
                                sx={{
                                bgcolor: '#e3fff0', // Background color
                                borderRadius: '50%', // Circular shape
                                p: 1, // Padding for size
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}
                            >
                            <WomanIcon sx={{ color: '#00ac4f', fontSize: 27 }} /> {/* Adjust icon size */}
                        </Box>
                        <Box ml={2}>
                            <Typography variant="subtitle1" color="GrayText">Female</Typography> {/* Smaller font size */}
                            <Typography variant="h5" fontWeight="bold">41</Typography> {/* Adjusted heading size */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </DashboardCard>
    </Box>
  );
};

export default MemberStats;
