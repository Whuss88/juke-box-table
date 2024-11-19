const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try { 
    const tracks = await prisma.track.findMany()
    res.json(tracks);
  } catch(e) {
    next(e)
  }
});

router.get("/:id", async (req, res, next) => {
  const {id} = req.params
  try {
    const track = await prisma.track.findUnique({
      where: {id: parseInt(id)},
    });
    if (track) {
      res.json(track);
    } else {
      res.status(404).send(`Track with id ${id} not found.`);
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router
