import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { getMyAnimeReco } from "../calls/animeCalls";

import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

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
    <Dialog
      open={props.openModal}
      onClose={props.handleCloseModal}
      fullWidth={true}
      maxWidth={"xl"}
    >
      <DialogTitle>
        Anime:{" "}
        {props.anime == null ? (
          <Typography variant="h3">No anime selected...</Typography>
        ) : (
          <i>{props.anime.eng_title}</i>
        )}
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 8 }}>
        <DialogContentText>
          <b>Recommendations:</b>
        </DialogContentText>
        <Swiper
          sx={{
            paddingBottom: 10,
          }}
          spaceBetween={50}
          slidesPerView={5}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
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
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                  }}
                >
                  <CardMedia
                    sx={{
                      minHeight: 200,
                      height: "auto",
                      width: "100%",
                    }}
                    component="img"
                    // width="100%"
                    image={anime.img_url}
                    alt="Anime Img"
                  />
                  <CardContent sx={{ align: "center" }}>
                    <Typography
                      sx={{
                        color: "text.secondary",
                      }}
                      variant="h4"
                    >
                      {anime.eng_title}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAnime;
