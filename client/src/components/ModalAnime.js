import { useState, useEffect } from "react";
import {
  Card,
  Container,
  Paper,
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

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

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
      <DialogTitle>
        Anime: <i>{props.anime}</i>
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
            950: {
              slidesPerView: 4,
              spaceBetweenSlides: 40,
            },
          }}
        >
          {props.myRecommendations.map((anime, index) => (
            <SwiperSlide key={anime.title}>
              {/* <Card>
                <CardMedia
                  sx={{
                    height: "auto",
                    height: 240,
                    width: "auto",
                    width: 200,
                  }}
                  component="img"
                  // width="100%"
                  image={anime.img_url}
                  alt="Anime Img"
                />
              </Card>
              <CardContent>
                <Typography
                  sx={{
                    color: "text.secondary",
                  }}
                  noWrap
                  variant="h4"
                >
                  {anime.title}
                </Typography>
              </CardContent> */}
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
                    {anime.title}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <DialogContentText>
          {props.myRecommendations.map((anime, index) => (
            <Typography
              key={anime.title}
              noWrap
              display="block"
              variant="body2"
            >
              {anime.title}, {anime.img_url}
            </Typography>
          ))}
        </DialogContentText> */}
      </DialogContent>
    </Dialog>
  );
};

export default ModalAnime;
