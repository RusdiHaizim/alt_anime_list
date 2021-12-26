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
import { useHistory, useLocation } from "react-router-dom";

import queryString from "query-string";

const AnimeListPage = ({ match, ...rest }) => {
  // display initial animes (w/o search term)
  const [animes, setAnimes] = useState([]);
  // display animes after typing 'query' in search bar
  const [queryAnimes, setQueryAnimes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Page-related stuff
  let history = useHistory();
  const location = useLocation();
  const path = window.location.pathname;
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;
  const initialSearch =
    initialQueryString.search == null ? "" : String(initialQueryString.search);

  // const pageNumber = match.params.pageNumber || 1;
  const pageNumber = Number(initialPageNumber) || 1;
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [search, setSearchValue] = useState(initialSearch);
  const [dSearch, setDSearch] = useState(initialSearch);

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

  async function fetchQueryAnime() {
    setLoading(true);
    try {
      const resp = await getAnimes({ query: search, page: page });
      setPages(resp.data.pages);
      setQueryAnimes([...resp.data.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in animeList:", error);
      setLoading(false);
      setError("Error occured in fetching initial animelist:", error);
    }
  }

  useEffect(() => {
    if (page === 1) {
      // console.log("dsearch called");
      if (dSearch === "") {
        fetchDefaultAnime();
        history.push(`${path}?page=${page}`);
      } else {
        fetchQueryAnime();
        history.push(`${path}?page=${page}&search=${search}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dSearch]);

  useEffect(() => {
    // console.log("page called");
    if (dSearch === "") {
      fetchDefaultAnime();
      history.push(`${path}?page=${page}`);
    } else {
      fetchQueryAnime();
      history.push(`${path}?page=${page}&search=${search}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce((nextValue) => searchHandleApi(nextValue), 300),
    []
  );

  const searchHandleApi = async (anime_q) => {
    setDSearch(anime_q);
    if (anime_q === "") {
      setPage(1);
      setQueryAnimes([]);
    } else {
      setPage(1);
      setAnimes([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  //   Model Code
  const [chosenAnime, setChosenAnime] = useState(null);
  const [chosenAnimeMyR, setChosenAnimeMyR] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = async () => {
    setOpenModal(true);
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
