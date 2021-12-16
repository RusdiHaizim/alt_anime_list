import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
const PopoverCard = ({ anime, ...rest }) => {
  return (
    <Card sx={{ px: 1 }}>
      <CardContent sx={{ maxWidth: 500 }}>
        <Typography noWrap variant="h3">
          {anime.eng_title}
        </Typography>
        <Typography sx={{ marginBottom: 2 }} noWrap variant="h4">
          <i>{anime.title}</i>
        </Typography>
        <Typography sx={{ my: 1 }} variant="body2">
          {anime.synopsis.substring(0, 400)}
        </Typography>
        <Typography
          sx={{ lineHeight: 1, fontWeight: 800 }}
          noWrap
          display="inline"
          variant="body2"
        >
          Genre:
        </Typography>
        <Typography noWrap variant="body1">
          {anime.genre_list.map((genre, index) => (
            <Typography key={genre} noWrap display="inline" variant="body2">
              {/* {genre},&nbsp; */}
              {(index ? ", " : "") + genre}
            </Typography>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PopoverCard;
