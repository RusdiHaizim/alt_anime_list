const Anime = require("../models/Anime");

// Get all animes (limited)
module.exports.get_animes = (req, res) => {
  const { query } = req.query;
  // console.log("getting animes", query);
  if (query) {
    Anime.find(
      { title: { $regex: ".*" + query + ".*", $options: "i" } },
      "title score link img_url synopsis genre_list"
    )
      .sort({ score: -1 })
      .limit(12)
      .then((animes) => res.json(animes));
  } else {
    Anime.find({}, "title score link img_url synopsis genre_list")
      .sort({ score: -1 })
      .limit(12)
      .then((animes) => res.json(animes));
  }
};

// Query for 'my' anime recommendations
module.exports.get_anime_my_rec = (req, res) => {
  const { query } = req.query;
  console.log("giving my anime reco for;", query);
  if (typeof query !== "undefined") {
    Anime.findOne(
      { title: { $regex: query, $options: "i" } },
      "title my_recommendations"
    )
      .sort({ score: -1 })
      .limit(12)
      .then((animes) => res.json(animes));
  }
};

// Create new anime
// module.exports.post_anime = (req, res) => {
//   const newAnime = new Anime(req.body);
//   newAnime.save().then((anime) => res.json(anime));
// };

// Get animes
module.exports.query_animes = (req, res) => {
  const { anime } = req.params;
  console.log("hitting query");
  console.log(query);
  Anime.find(
    { title: { $regex: ".*" + query + ".*", $options: "i" } },
    "title score link img_url synopsis genre_list"
  )
    .sort({ score: -1 })
    .limit(12)
    .then((animes) => res.json(animes));
};
