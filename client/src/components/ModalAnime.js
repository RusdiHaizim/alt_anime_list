import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import SwiperCard from "./SwiperCard";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "./swiper-navigation.css";
import "./swiper-pagination.css";
import { getMyAnimeReco } from "../calls/animeCalls";

import SwiperCore, { Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ModalAnime = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [chosenAnimeMyR, setChosenAnimeMyR] = useState([]);
  // check if props.anime changes, then call the getMyAnimeReco() api
  useEffect(() => {
    async function fetchAnimeRecommendations() {
      setLoading(true);
      try {
        // await new Promise((r) => setTimeout(r, 1000));
        const resp = await getMyAnimeReco({ query: props.anime.uid });
        setChosenAnimeMyR([...resp.data]);
        setLoading(false);
      } catch (error) {
        console.log("Error in modal:", error);
        setLoading(false);
        setError("Error occured in fetching anime reco:", error);
      }
    }
    if (props.anime != null) {
      fetchAnimeRecommendations();
    }
  }, [props.anime]);

  return (
    <>
      {props.anime == null ? (
        <></>
      ) : (
        <Dialog
          open={props.openModal}
          onClose={props.handleCloseModal}
          fullWidth={true}
          maxWidth={"xl"}
          aria-labelledby="customized-dialog-title"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleCloseModal}
          >
            <b>{props.anime.eng_title}</b>
          </BootstrapDialogTitle>
          <DialogContent sx={{ paddingBottom: 8 }}>
            <Accordion sx={{ marginBottom: 0 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: 600 }} variant="body2">
                  Synopsis
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "0.9rem" }} variant="body1">
                  {props.anime.synopsis}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: 600 }} variant="body2">
                  Anime Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography noWrap variant="body1">
                  <b>Studio: </b>
                  {props.anime.studio}
                </Typography>
                <Typography noWrap display="inline" variant="body1">
                  <b>Genre:&nbsp;</b>
                </Typography>
                {props.anime.genre_list.map((genre, index) => (
                  <Typography key={genre} display="inline" variant="body1">
                    {/* {genre},&nbsp; */}
                    {(index ? ", " : "") + genre}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>

            <DialogContentText>
              <b>Recommendations:</b>
            </DialogContentText>
            <Swiper
              sx={{
                paddingBottom: 10,
              }}
              spaceBetween={50}
              slidesPerView={"auto"}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              centeredSlides={false}
              breakpoints={{
                // when window width is <= 499px
                300: {
                  slidesPerView: 1,
                  spaceBetweenSlides: 0,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetweenSlides: 10,
                },
                700: {
                  slidesPerView: 3,
                  spaceBetweenSlides: 15,
                },
                900: {
                  slidesPerView: 4,
                  spaceBetweenSlides: 40,
                },
              }}
            >
              {loading ? (
                <Typography variant="h3">Loading...</Typography>
              ) : error ? (
                <Typography variant="h3">{error}</Typography>
              ) : (
                chosenAnimeMyR.map((anime, index) => (
                  <SwiperSlide key={anime.title}>
                    <SwiperCard anime={anime} />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ModalAnime;
