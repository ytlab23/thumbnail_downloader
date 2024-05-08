const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.get("/download-image", async (req, res) => {
  try {
    const imageUrl = req.query.imageUrl;
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Set appropriate headers for image download
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
    res.send(response.data);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).send("Error downloading image");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
