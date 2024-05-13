import express from "express";
import multer from "multer";
import { createWorker, Worker } from "tesseract.js";
import sharp from "sharp";
import ImageOptimizer from "../classes/ImageOptimizer";
import MenuExtractor from "../classes/MenuExtractor";
var cors = require("cors");

const app = express();
const upload = multer();
app.use(cors());

app.post("/pizza", upload.single("image"), async (req, res) => {
  try {
    let inputBuffer = req.file!.buffer;

    // Verifica se il file è in formato HEIC o AVIF
    if (
      req.file!.mimetype === "image/heic" ||
      req.file!.mimetype === "image/avif"
    ) {
      // Converti HEIC o AVIF in JPG utilizzando sharp
      inputBuffer = await sharp(inputBuffer).toFormat("jpeg").toBuffer();
    }

    await ImageOptimizer.optimize(inputBuffer);

    const worker: Worker = await createWorker("ita", 1, {
      logger: (m) => console.log(m),
    });

    const {
      data: { text },
    } = await worker.recognize(inputBuffer);

    await worker.terminate();

    const extractor = new MenuExtractor();
    const dishes = extractor.extractDishes(text);

    res.json(dishes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Errore durante l'elaborazione dell'immagine" });
  }
});

app.listen(3000, () => {
  console.log("SERVER READY FOR ACTION ON PORT: 3000");
});
