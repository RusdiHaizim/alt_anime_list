const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const cors = require("cors");

// const authRoutes = require("./routes/auth");
const animeRoutes = require("./routes/anime");

const app = express();
app.use(express.json());
app.use(cors());
// app.use("/api", authRoutes);
app.use("/api", animeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const dbURI = config.get("dbURI");
const port = process.env.PORT || 4000;

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
