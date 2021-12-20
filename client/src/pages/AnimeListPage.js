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
import Pagination from "../components/Pagination";

const AnimeListPage = ({ match, ...rest }) => {
  // display initial animes (w/o search term)
  const [animes, setAnimes] = useState([]);
  // display animes after typing 'query' in search bar
  const [queryAnimes, setQueryAnimes] = useState([]);
  const [search, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Page-related stuff
  const pageNumber = match.params.pageNumber || 1;
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  async function fetchDefaultAnime() {
    setLoading(true);
    try {
      // await new Promise((r) => setTimeout(r, 1000));
      const resp = await getAnimes({ query: "", page: page });
      // console.log("resp.data", resp.data);
      setPages(resp.data.pages);
      setAnimes([...resp.data.data]);
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
    } else {
      searchApi(search);
    }
  }, [search, page]);

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
    setPage(page);
    if (anime_q === "") {
      setQueryAnimes([]);
      setPage(1);
      setLoading(false);
    } else {
      // await new Promise((r) => setTimeout(r, 1000));
      const resp = await getAnimes({ query: anime_q, page: page });
      setPages(resp.data.pages);
      setQueryAnimes([...resp.data.data]);
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
      <Pagination page={page} pages={pages} changePage={setPage} />
      <Grid
        sx={{ px: 4 }}
        direction="row"
        justifyContent="center"
        container
        p={2}
        spacing={1}
      >
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
