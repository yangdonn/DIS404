"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const MemberStats = () => {   
  interface MemberCount {
    stdgender: "M" | "F" | "Total";
    count: string;
  }
  const { data: session } = useSession();
  const [counts, setCounts] = useState({
    Total: 0,
    Male: 0,
    Female: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      if (session) {
        try {
          const id = session.user.mid;
          const response = await fetch(`/api/getItems/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          const maleCount =
            data.find((item: MemberCount) => item.stdgender === "M")?.count ||
            0;
          const femaleCount =
            data.find((item: MemberCount) => item.stdgender === "F")?.count ||
            0;
          const totalCount =
            data.find((item: MemberCount) => item.stdgender === "Total")
              ?.count || 0;

          setCounts({
            Total: parseInt(totalCount),
            Male: parseInt(maleCount),
            Female: parseInt(femaleCount),
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (session) {
      fetchCounts();
    }
  }, [session]);

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" justifyContent="space-around" alignItems="stretch">
        {/* Total Members Card */}
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
              <PeopleIcon sx={{ color: "#ffffff", fontSize: 45 }} />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle1" color="GrayText">
                Total Members
              </Typography>
              <Typography variant="h5" fontWeight="bold" fontSize={30}>
                {counts.Total}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>

        {/* Male Members Card */}
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
              <ManIcon sx={{ color: "#ffffff", fontSize: 45 }} />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle1" color="GrayText">
                Male Counts
              </Typography>
              <Typography variant="h5" fontWeight="bold" fontSize={30}>
                {counts.Male}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>

        {/* Female Members Card */}
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
              <WomanIcon sx={{ color: "#ffffff", fontSize: 45 }} />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle1" color="GrayText">
                Female Counts
              </Typography>
              <Typography variant="h5" fontWeight="bold" fontSize={30}>
                {counts.Female}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default MemberStats;
