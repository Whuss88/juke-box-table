const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.get("/", async (req,res,next) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch(e) {
    next (e)
  }
})

router.post("/", async (req, res, next) => {
  const { name, description, ownerId, trackIds } = req.body;
  try {
    const newPlaylist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId,
        tracks: { connect: trackIds.map(id => ({ id })) },
      },
    });
    res.status(201).json(newPlaylist);
  } catch(e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: parseInt(id) },
      include: { tracks: true },
    });
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send(`Playlist with id ${id} not found.`);
    }
  } catch(e){
    next(e);
  }
});
module.exports = router 