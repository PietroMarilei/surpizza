import express from "express";
import multer from "multer";
import { createWorker, Worker } from "tesseract.js";
import sharp from "sharp";

const app = express();
const upload = multer();

app.post("/ocr", upload.single("image"), async (req, res) => {
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

    const worker: Worker = await createWorker("ita", 1, {
      logger: (m) => console.log(m),
    });

    // await worker.loadLanguage("ita");
    // await worker.initialize("ita");

    const {
      data: { text },
    } = await worker.recognize(inputBuffer);

    await worker.terminate();

    res.json({ text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Errore durante l'elaborazione dell'immagine" });
  }
});

app.listen(3000, () => {
  console.log("Server avviato sulla porta 3000");
});
