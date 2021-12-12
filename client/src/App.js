// import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import theme from "./theme/index";
import CssBaseline from "@mui/material/CssBaseline";
import AnimeListPage from "./pages/AnimeListPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* AppBar */}
      <Header />
      {/* </Grid> */}
      {/* Anime card list */}

      <Router>
        <Route path="/">
          <AnimeListPage />
        </Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;
