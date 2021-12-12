import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import { getAnimes } from "../calls/animeCalls";
import SearchIcon from "@mui/icons-material/Search";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import ModalAnime from "../components/ModalAnime";

const AnimeListPage = (props) => {
  const [animes, setAnimes] = useState([]);
  const [queryAnimes, setQueryAnimes] = useState([]);
  const [search, setSearchValue] = useState("");

  useEffect(() => {
    console.log("using effect", search);
    async function fetchData() {
      const resp = await getAnimes({ query: "" });
      //   const resp = await getAnimes({"query": query});
      console.log(resp.data[0]);
      setAnimes([...resp.data]);
      //   setDefaultAnimes([]);
    }
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
    e.preventDefault();
    console.log("search:", search);
    // AwesomeDebouncePromise(queryAnime, 500);
    // queryAnime();
    const resp = await searchAPIDebounced();
    setQueryAnimes([...resp.data]);
    console.log(queryAnimes);
  };

  const searchApi = () => {
    return getAnimes({ query: search });
  };

  const searchAPIDebounced = AwesomeDebouncePromise(searchApi, 500);

  const queryAnime = async () => {
    const resp = await getAnimes({ query: search });
    setQueryAnimes([...resp.data]);
  };

  //   Model Code
  const [openModal, setOpenModal] = useState(false);
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [chosenAnime, setChosenAnime] = useState({});

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
        {/* {[...Array(4).keys()].map((value) => (
        <Grid key={value} sx={{ px: 1 }} item p={1}>
          <AnimeCard />
        </Grid>
      ))} */}
        <Grid item align="center" xs={12} p={2}>
          {/* <form noValidate autoComplete="off" onSubmit={handleSearch}> */}
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
            // onChange={(e) => {
            //   setSearchValue(e.target.value);
            // }}
            onChange={handleSearch}
          />
          {/* <SearchIcon></SearchIcon> */}
          {/* </form> */}
        </Grid>
        {search === ""
          ? animes.map((anime) => (
              <Grid item key={anime._id} p={1}>
                <AnimeCard
                  anime={anime}
                  handleClickOpenModal={handleClickOpenModal}
                  setChosenAnime={setChosenAnime}
                />
              </Grid>
            ))
          : queryAnimes.map((anime) => (
              <Grid item key={anime._id} p={1}>
                <AnimeCard
                  anime={anime}
                  handleClickOpenModal={handleClickOpenModal}
                  setChosenAnime={setChosenAnime}
                />
              </Grid>
            ))}
        {/* {animes.map((anime) => (
          <Grid item key={anime._id} p={1}>
            <AnimeCard anime={anime} />
          </Grid>
        ))} */}
        {/* <Grid item sm={4} p={2}>
            <AnimeCard />
          </Grid> */}
      </Grid>
      <ModalAnime
        anime={chosenAnime}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
};

export default AnimeListPage;
