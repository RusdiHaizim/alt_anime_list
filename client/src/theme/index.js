import { grey, deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: grey[900],
      paper: grey[900],
    },
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: deepPurple[500],
    },
    text: {
      primary: grey[300],
      secondary: grey[400],
    },
  },
  typography: {
    allVariants: {
      color: grey[100],
    },
    h1: {
      fontSize: "1.5rem",
    },
    h2: {
      fontSize: "1rem",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 800,
      color: grey[400],
    },
    h4: {
      fontSize: "0.8rem",
      fontWeight: 500,
      color: grey[500],
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: grey[400],
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 500,
      color: grey[500],
    },
  },
});

export default theme;
