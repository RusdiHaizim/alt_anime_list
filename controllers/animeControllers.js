const Anime = require("../models/Anime");

// Get all animes (limited)
module.exports.get_animes = (req, res) => {
  const { query } = req.query;
  // console.log("getting animes", query);
  if (query !== "") {
    // {$or:[{region: "NA"},{sector:"Some Sector"}]}
    Anime.find(
      {
        $or: [
          { eng_title: { $regex: ".*" + query + ".*", $options: "i" } },
          { title: { $regex: ".*" + query + ".*", $options: "i" } },
        ],
      },
      "title eng_title score uid img_url synopsis genre_list"
    )
      .sort({ score: -1 })
      .limit(12)
      .then((animes) => {
        res.json(animes);
        // console.log(`query given: ${query}`);
      });
  } else {
    console.log(`no query in /anime`);
    Anime.find({}, "title eng_title score uid img_url synopsis genre_list")
      .sort({ score: -1 })
      .limit(12)
      .then((animes) => res.json(animes));
  }
};

// Query for 'my' anime recommendations
module.exports.get_anime_my_rec = (req, res) => {
  const { query } = req.query;
  if (Number.isNaN(Number(query))) {
    console.log(`whew: ${query}`);
    res
      .status(400)
      .json({ message: "Query is not a number! Please give anime uid" });
  } else {
    console.log(`query: ${typeof query} ${Number(query)}`);
    Anime.findOne({ uid: query }, "title eng_title my_recommendations")
      .sort({ score: -1 })
      .limit(12)
      .then((animes) => {
        // console.log(`MYLIST: ${typeof animes.my_recommendations}`);
        console.log(`giving my anime reco for: ${animes.eng_title}`);
        const my_list = animes.my_recommendations;
        Anime.find(
          { title: { $in: my_list } },
          "title eng_title img_url -_id"
        ).then((animeLinks) => {
          // console.log(`got the links: ${animeLinks}`);
          res.json(animeLinks);
        });
      });

    // Anime.findOne({ uid: query }, "title my_recommendations")
    //   .sort({ score: -1 })
    //   .limit(12)
    //   .then((animes) => {
    //     res.json(animes);
    //     console.log(`giving my anime reco for: ${animes.title}`);
    //   });
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
