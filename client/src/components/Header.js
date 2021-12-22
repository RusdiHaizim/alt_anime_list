import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "@mui/material/Link";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" underline="hover" color="text.primary" variant="h1">
            Alt Anime List
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
