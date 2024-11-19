const express = require("express");
const morgan = require("morgan")
const prisma = require("./prisma");
const app = express();
const PORT = 3000;

app.use(morgan("dev"));

app.use(express.json());

const userRoutes = require("./routes/users");
const playlistRoutes = require("./routes/playlists");
const trackRoutes = require("./routes/tracks");


app.use("/users", userRoutes);
app.use("/playlists", playlistRoutes);
app.use("/tracks", trackRoutes);

app.get("/", async (req,res,next) => {
  console.log("Welcome to the Jukebox API.");
});
app.use((err,req,res,next) => {
  console.error(err);
  res.status(500).send("An error occured");
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.`)
});