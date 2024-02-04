const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use(express.json());

const FILE_PATH = "./data/videos.json";

const readVideos = () => {
  const videosData = fs.readFileSync(FILE_PATH);
  const parsedVideos = JSON.parse(videosData);
  return parsedVideos;
};

router.get("/", (req, res) => {
  const videos = readVideos();
  res.status(200).json(videos);
});

router.get("/:id", (req, res) => {
  const videos = readVideos();
  const videoId = req.params.id;
  const video = videos.find((video) => video.id === videoId);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  res.status(200).json(video);
});

router.post("/", (req, res) => {
  const newVideoObj = req.body;

  const newVideo = {
    id: uuidv4(),
    title: newVideoObj.title,
    channel: "Anita Yawson",
    image: "/images/upload-video-preview.jpg",
    description: newVideoObj.description,
    views: "10",
    likes: "4",
  };

  const videos = readVideos();
  videos.push(newVideo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(videos));

  res.status(201).json(newVideo);
});

module.exports = router;
