const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  // Anime id listed on myanimelist
  uid: {
    type: Number,
    required: true,
  },
  // Japanese romaji title of anime
  title: {
    type: String,
    required: true,
  },
  // Studio
  studio: {
    type: String,
    required: true,
  },
  // Synopsis
  synopsis: {
    type: String,
    required: false,
  },
  // Theme
  theme: {
    type: String,
    required: false,
  },
  // Demographic
  demographic: {
    type: String,
    required: false,
  },
  // Score
  score: {
    type: Number,
    required: true,
  },
  // MAL Link
  link: {
    type: String,
    required: true,
  },
  // Anime Logo Image Link
  img_url: {
    type: String,
    required: true,
  },
  // Genre (list)
  genre_list: [
    {
      type: String,
      required: true,
    },
  ],
  // MyAlgo recommendations (list)
  my_recommendations: [
    {
      type: String,
      required: true,
    },
  ],
  // MAL recommendations (list)
  recommendation_list: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = Anime = mongoose.model("anime", AnimeSchema);
