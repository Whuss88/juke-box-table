const express = require("express");
const prisma = require("../prisma"); 
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { playlists: true },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send(`User with id ${id} not found`);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
