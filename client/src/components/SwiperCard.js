import { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const SwiperCard = ({ anime }) => {
  const [cardMediaState, setCardMediaState] = useState({
    minHeight: 200,
    height: "auto",
    width: "100%",
    borderRadius: 1,
    opacity: 1,
  });

  const hoverOnMedia = () => {
    setCardMediaState({ ...cardMediaState, opacity: 0.5 });
  };

  const hoverOffMedia = () => {
    setCardMediaState({ ...cardMediaState, opacity: 1 });
  };

  return (
    <Card
      sx={{
        padding: 2,
        boxShadow: 0,
      }}
    >
      <CardMedia
        sx={cardMediaState}
        onMouseOver={hoverOnMedia}
        onMouseOut={hoverOffMedia}
        component="img"
        // width="100%"
        image={anime.img_url}
        alt={anime.title + " img"}
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
  );
};

export default SwiperCard;
