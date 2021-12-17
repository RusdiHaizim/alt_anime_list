import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import { getAnimes } from "../calls/animeCalls";
import SearchIcon from "@mui/icons-material/Search";
import ModalAnime from "../components/ModalAnime";
import debounce from "lodash.debounce";

const AnimeListPage = (props) => {
  // display initial animes (w/o search term)
  const [animes, setAnimes] = useState([]);
  // display animes after typing 'query' in search bar
  const [queryAnimes, setQueryAnimes] = useState([]);
  const [search, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchDefaultAnime() {
    setLoading(true);
    try {
      // await new Promise((r) => setTimeout(r, 1000));
      const resp = await getAnimes({ query: "" });
      setAnimes([...resp.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in animeList:", error);
      setLoading(false);
      setError("Error occured in fetching initial animelist:", error);
    }
  }

  useEffect(() => {
    console.log("Fetching top animes to show initially");
    fetchDefaultAnime();
  }, []);

  useEffect(() => {
    if (search === "") {
      console.log("Search empty, refetching initial list");
      setQueryAnimes([]);
      fetchDefaultAnime();
    }
  }, [search]);

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce((nextValue) => searchApi(nextValue), 300),
    []
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const searchApi = async (anime_q) => {
    setLoading(true);
    if (anime_q === "") {
      setQueryAnimes([]);
      setLoading(false);
    } else {
      // await new Promise((r) => setTimeout(r, 1000));
      const resp = await getAnimes({ query: anime_q });
      setQueryAnimes([...resp.data]);
      setAnimes([]);
      setLoading(false);
    }
  };

  //   Model Code
  const [chosenAnime, setChosenAnime] = useState(null);
  const [chosenAnimeMyR, setChosenAnimeMyR] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = async () => {
    setOpenModal(true);
    // console.log("CHOSEN ANIME:", chosenAnime);
    // console.log("CHOSEN ANIME R:", chosenAnimeMyR);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <Grid
        sx={{ px: 4 }}
        direction="row"
        justifyContent="center"
        container
        p={2}
        spacing={1}
      >
        <Grid item align="center" xs={12} p={2}>
          <TextField
            sx={{
              backgroundColor: "#333",
              borderRadius: 4,
            }}
            fullWidth
            color="secondary"
            variant="outlined"
            placeholder="Search Anime"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </Grid>
        {loading ? (
          <Typography variant="h3">Loading...</Typography>
        ) : error ? (
          <Typography variant="h3">{error}</Typography>
        ) : search === "" ? (
          animes.map((anime) => (
            <Grid item key={anime._id} p={1}>
              <AnimeCard
                anime={anime}
                handleClickOpenModal={handleClickOpenModal}
                setChosenAnime={setChosenAnime}
                setChosenAnimeMyR={setChosenAnimeMyR}
              />
            </Grid>
          ))
        ) : (
          queryAnimes.map((anime) => (
            <Grid item key={anime._id} p={1}>
              <AnimeCard
                anime={anime}
                handleClickOpenModal={handleClickOpenModal}
                setChosenAnime={setChosenAnime}
                setChosenAnimeMyR={setChosenAnimeMyR}
              />
            </Grid>
          ))
        )}
      </Grid>
      <ModalAnime
        anime={chosenAnime}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        myRecommendations={chosenAnimeMyR}
      />
    </Container>
  );
};

export default AnimeListPage;
