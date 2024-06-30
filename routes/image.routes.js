import express from "express";
const router = express.Router();
import fileUploader from "../config/cloudinary.config.js";

router.post("/upload", fileUploader.single("imageUrl"), (req, res) => {
  try {
    if (!req.file) {
      res.status(500).json({ message: "No file Uploaded!" });
      return;
    }
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Error Uploading Image!" + error.message });
  }
});

export default router;
