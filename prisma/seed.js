const prisma = require("./index");

const seed = async () => {
  const users = [];
  const tracks = [];
  const numUsers = 5;
  const numTracks = 20;
  const numPlaylists = 10;

  for (let i = 0; i < numUsers; i++) {
    const user = await prisma.user.create({
      data:{ name: `User ${i+1}`},
    });
    users.push(user);
  }

  for (let i = 0; i < numTracks; i++) {
    const track = await prisma.track.create({
      data: {title: `Track ${i + 1}`},
    });
    tracks.push(track);
  }

  for (i = 0; i < numPlaylists; i++) {
    const playlist = await prisma.playlist.create({
      data: {
        name: `Playlist ${i + 1}`,
        description: `Description for Playlist ${i + 1}`,
        ownerId: users[Math.floor(Math.random() * users.length)].id,
        tracks: { connect: tracks.slice(0, Math.floor(Math.random() * tracks.length)).map(t=> ({ id: t.id })) },
      },
    });
  }
  console.log("database seeded successfully.")
};

seed() 
  .then(async () => {
     await prisma.$disconnect(); }) 
  .catch(async (e) => { 
    console.error(e); 
    await prisma.$disconnect(); 
    process.exit(1); 
  });