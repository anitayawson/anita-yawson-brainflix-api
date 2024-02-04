require("dotenv").config();
const express = require("express");
const app = express();
const videosRouter = require("./routes/videos.js");
const cors = require("cors");

const PORT = process.env.PORT || 8081;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());
app.use(express.json());

app.use("/videos", videosRouter);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
