import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ px: 1, flexGrow: 1 }}>
            Anime List Alter
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
