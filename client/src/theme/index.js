import { blue, grey, deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      //   dark: grey[700],
      //   default: "white",
      default: grey[900],
      paper: grey[900],
    },
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      // main: blue[900],
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
    h2: {
      fontSize: "1rem",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 800,
      color: grey[400],
      lineHeight: 2,
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
