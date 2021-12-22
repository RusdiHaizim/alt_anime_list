import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Popover,
  Box,
} from "@mui/material";
import PopoverCard from "./PopoverCard";
import { getMyAnimeReco } from "../calls/animeCalls";

const AnimeCard = (props) => {
  const title = props.anime.eng_title;
  // const jap_title = props.anime.title;
  // const anime_link = props.anime.link;
  const img_url = props.anime.img_url;
  // const score = props.anime.score;
  // const synopsis = props.anime.synopsis;
  // const genres = props.anime.genre_list;

  const [hover, setHover] = useState({
    raised: false,
    shadow: 1,
  });
  const [cardState, setCardState] = useState({
    height: 300,
    width: 240,
    opacity: 1,
  });

  // Hover-over-card code

  const hoverOn = () => {
    setHover({ ...hover, raised: true, shadow: 3 });
    setCardState({ ...cardState, opacity: 0.7 });
  };

  const hoverOff = () => {
    setHover({ ...hover, raised: false, shadow: 1 });
    setCardState({ ...cardState, opacity: 1 });
  };

  //   Popover code
  const [cardOverlay, setCardOverlay] = useState({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    display: "none",
    bgcolor: "rgba(1,1,1,0.6)",
    padding: "10px",
    textAlign: "center",
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setCardOverlay({ ...cardOverlay, display: "block" });
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setCardOverlay({ ...cardOverlay, display: "none" });
    setAnchorEl(null);
  };

  //   Modal code

  const handleModalOpen = async () => {
    props.handleClickOpenModal();
    props.setChosenAnime(props.anime);
    queryAnimeMyR(props.anime.uid);
  };

  const queryAnimeMyR = async (chosenAnime) => {
    const resp = await getMyAnimeReco({ query: chosenAnime });
    // console.log("myanimeR:", resp.data.my_recommendations);
    if (resp.data) {
      props.setChosenAnimeMyR(resp.data);
    }
  };

  const openPopover = Boolean(anchorEl);
  useEffect(() => {
    if (openPopover) {
      document.body.onwheel = handlePopoverClose;
      document.body.addEventListener("touchstart", handlePopoverClose, false);
    }
    return () => {
      document.body.onwheel = undefined;
      document.body.removeEventListener(
        "touchstart",
        handlePopoverClose,
        false
      );
    };
  }, [openPopover]);

  return (
    <Card
      sx={{ maxWidth: 240, maxHeight: 360, borderRadius: 3 }}
      raised={hover.raised}
    >
      <CardActionArea onClick={handleModalOpen}>
        <CardMedia
          sx={cardState}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
          aria-owns={openPopover ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          component="img"
          width="100%"
          image={img_url}
          alt="Anime Img"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
        <Box sx={cardOverlay}>
          <Typography color="white" variant="body2">
            <b>Score:</b> {props.anime.score}
          </Typography>
        </Box>
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none" }}
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "bottom",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          disableAutoFocus={true}
          disableEnforceFocus={true}
        >
          <PopoverCard anime={props.anime} />
        </Popover>
        <CardContent>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
            noWrap
            variant="h2"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;
