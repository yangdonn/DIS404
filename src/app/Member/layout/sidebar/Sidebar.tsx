import { usePathname } from 'next/navigation';
import { useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Sidebar } from 'react-mui-sidebar';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const sidebarWidth = "270px";

  // Hide sidebar on the clubs page
  if (pathname === '/Member') return null;

  const imageSrc = "/images/logos/CST_logo.jpg";

  const renderLogo = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
      mb={2}
    >
      <img src={imageSrc} alt="Sidebar Logo" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <Typography variant="h6" mt={2}>Club Management System</Typography>
    </Box>
  );

  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer anchor="left" open={isSidebarOpen} variant="permanent" PaperProps={{ sx: { boxSizing: "border-box" } }}>
          <Box sx={{ height: "100%" }}>
            <Sidebar width={sidebarWidth} collapsewidth="80px" open={isSidebarOpen} themeColor="#5d87ff" themeSecondaryColor="#49beff" showProfile={false}>
              {renderLogo()}
              <SidebarItems />
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer anchor="left" open={isMobileSidebarOpen} onClose={onSidebarClose} variant="temporary" PaperProps={{ sx: { boxShadow: (theme) => theme.shadows[8] } }}>
      <Box px={2}>
        <Sidebar width={sidebarWidth} collapsewidth="80px" isCollapse={false} mode="light" direction="ltr" themeColor="#5d87ff" themeSecondaryColor="#49beff" showProfile={false}>
          {renderLogo()}
          <SidebarItems />
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
