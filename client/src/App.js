// import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import theme from "./theme/index";
import CssBaseline from "@mui/material/CssBaseline";
import AnimeListPage from "./pages/AnimeListPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* AppBar */}
      <Header />
      {/* </Grid> */}
      {/* Anime card list */}

      <Router>
        <Switch>
          <Route exact path="/" component={AnimeListPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
