import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Popover,
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
    maxWidth: 240,
    maxHeight: 360,
    borderRadius: 3,
    opacity: 1,
  });

  // Hover-over-card code

  const hoverOn = () => {
    setHover({ ...hover, raised: true, shadow: 3 });
    setCardState({ ...cardState, opacity: 0.5 });
  };

  const hoverOff = () => {
    setHover({ ...hover, raised: false, shadow: 1 });
    setCardState({ ...cardState, opacity: 1 });
  };

  //   Popover code

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
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
      sx={cardState}
      onMouseOver={hoverOn}
      onMouseOut={hoverOff}
      raised={hover.raised}
    >
      <CardActionArea onClick={handleModalOpen}>
        <CardMedia
          sx={{
            height: 300,
            width: 240,
          }}
          aria-owns={openPopover ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          component="img"
          width="100%"
          image={img_url}
          alt="Anime Img"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none" }}
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
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
