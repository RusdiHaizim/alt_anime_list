import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Modal,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { getMyAnimeReco } from "../calls/animeCalls";

const ModalAnime = (props) => {
  const [myReco, setMyReco] = useState([]);
  const [currAnime, setCurrAnime] = useState("");
  useEffect(() => {
    // async function fetchData() {
    //   const resp = await getMyAnimeReco(props.anime.title);
    //   console.log(resp.data[0]);
    //   setMyReco([...resp.data]);
    // }
    // console.log(`curr anime modal: ${props.anime.title}`);
    // setCurrAnime(props.anime.title);
    // if (currAnime !== "") {
    //   fetchData();
    // }
  }, []);

  return (
    <Dialog
      open={props.openModal}
      onClose={props.handleCloseModal}
      fullWidth={true}
      maxWidth={true}
    >
      <DialogTitle>Anime: {props.anime}</DialogTitle>
      <DialogContent>
        <DialogContentText>Recommendations:</DialogContentText>
        <DialogContentText>
          {props.myRecommendations.map((anime, index) => (
            <Typography key={anime} noWrap display="block" variant="body2">
              {/* {(index ? "\n," : "") + anime} */}
              {anime}
            </Typography>
          ))}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAnime;
