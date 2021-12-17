import { Card, CardContent, Typography } from "@mui/material";

const PopoverCard = ({ anime, ...rest }) => {
  const SYNOPSIS_LIMIT = 300;

  return (
    <Card sx={{ px: 1 }}>
      <CardContent sx={{ maxWidth: 500 }}>
        <Typography noWrap variant="h3">
          {anime.eng_title}
        </Typography>
        <Typography sx={{ marginBottom: 1 }} noWrap variant="h4">
          <i>JP Title: {anime.title}</i>
        </Typography>
        <Typography sx={{ my: 1 }} variant="body2">
          {anime.synopsis.substring(0, SYNOPSIS_LIMIT)}
          {anime.synopsis.length >= SYNOPSIS_LIMIT ? "..." : ""}
        </Typography>
        <Typography
          sx={{ fontWeight: 800 }}
          noWrap
          display="inline"
          variant="body2"
        >
          Studio:&nbsp;
        </Typography>
        <Typography noWrap display="inline" variant="body1">
          {anime.studio}
        </Typography>
        <Typography variant="body1"></Typography>
        <Typography
          sx={{ lineHeight: 1, fontWeight: 800, marginBottom: 1 }}
          noWrap
          display="inline"
          variant="body2"
        >
          Genre:&nbsp;
        </Typography>
        {anime.genre_list.map((genre, index) => (
          <Typography key={genre} display="inline" variant="body1">
            {/* {genre},&nbsp; */}
            {(index ? ", " : "") + genre}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default PopoverCard;
