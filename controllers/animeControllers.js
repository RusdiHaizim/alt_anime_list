const Anime = require("../models/Anime");

/**
 * Get all animes
 * query: If specified, shows the animes which contain the queried value
 * page: Default to 1, shows the animes corresponding to that page (using skip and limit)
 * limit: Default to 10, shows the number of animes per page
 * @param { query, page, limit } req
 * @param {*} res
 */
module.exports.get_animes = async (req, res) => {
  const { query } = req.query;
  // console.log("getting animes", query);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  try {
    if (query !== "") {
      // {$or:[{region: "NA"},{sector:"Some Sector"}]}

      const total = await Anime.countDocuments({
        $or: [
          { eng_title: { $regex: ".*" + query + ".*", $options: "i" } },
          { title: { $regex: ".*" + query + ".*", $options: "i" } },
        ],
      });
      const pages = Math.ceil(total / pageSize);
      console.log(`Queried results, total:${total}, pages:${pages}`);

      if (total !== 0 && page > pages) {
        // return res.status(404).json({
        //   status: "fail",
        //   message: "Page exceeds number of pages for query",
        // });
        return res.json({
          page: 0,
          pages: 0,
          data: [],
        });
      }

      const result = await Anime.find(
        {
          $or: [
            { eng_title: { $regex: ".*" + query + ".*", $options: "i" } },
            { title: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
        "title eng_title score uid img_url synopsis genre_list studio"
      )
        .sort({ score: -1 })
        .limit(pageSize)
        .skip(skip);

      res.json({
        page: page,
        pages: pages,
        data: result,
      });

      // Anime.find(
      //   {
      //     $or: [
      //       { eng_title: { $regex: ".*" + query + ".*", $options: "i" } },
      //       { title: { $regex: ".*" + query + ".*", $options: "i" } },
      //     ],
      //   },
      //   "title eng_title score uid img_url synopsis genre_list studio"
      // )
      //   .sort({ score: -1 })
      //   .limit(12)
      //   .then((animes) => {
      //     res.json(animes);
      //   });
    } else {
      const total = await Anime.countDocuments();
      const pages = Math.ceil(total / pageSize);
      console.log(
        `no query in /anime, getting all ${pages} default pages instead...`
      );

      if (page > pages) {
        return res.status(404).json({
          status: "fail",
          message: "Page exceeds number of pages for query",
        });
      }

      const result = await Anime.find(
        {},
        "title eng_title score uid img_url synopsis genre_list studio"
      )
        .sort({ score: -1 })
        .limit(pageSize)
        .skip(skip);

      res.json({
        page: page,
        pages: pages,
        data: result,
      });
    }
  } catch (error) {
    console.log("In /anime, error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

// Query for 'my' anime recommendations
module.exports.get_anime_my_rec = async (req, res) => {
  const { query } = req.query;
  if (Number.isNaN(Number(query))) {
    console.log(`whew: ${query}`);
    res
      .status(400)
      .json({ message: "Query is not a number! Please give anime uid" });
  } else {
    console.log(`query: ${typeof query} ${Number(query)}`);
    try {
      const chosenAnime = await Anime.findOne(
        { uid: query },
        "title eng_title my_recommendations"
      );
      console.log("Reco for:", chosenAnime.title);
      const result = await Anime.find(
        { title: { $in: chosenAnime.my_recommendations } },
        "title eng_title img_url -_id"
      );

      res.json(result);
    } catch (error) {
      console.log("In /anime_my_reco, error:", error);
      res.status(500).json({
        status: "error",
        message: "Server error",
      });
    }
  }
};

// Create new anime
// module.exports.post_anime = (req, res) => {
//   const newAnime = new Anime(req.body);
//   newAnime.save().then((anime) => res.json(anime));
// };

// Get animes
// module.exports.query_animes = (req, res) => {
//   const { anime } = req.params;
//   console.log("hitting query");
//   console.log(query);
//   Anime.find(
//     { title: { $regex: ".*" + query + ".*", $options: "i" } },
//     "title score link img_url synopsis genre_list"
//   )
//     .sort({ score: -1 })
//     .limit(12)
//     .then((animes) => res.json(animes));
// };
