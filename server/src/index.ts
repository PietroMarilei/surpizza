import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import MenuExtractor from "../classes/MenuExtractor";

dotenv.config();

const app = express();
const upload = multer();
app.use(cors());

app.post("/pizza", upload.single("image"), async (req, res) => {
  try {
    // Assicurati che il buffer sia in formato JPEG
    const imageBuffer = req.file!.buffer;
    const imageBase64 = imageBuffer.toString("base64");
    const imageData = `data:image/jpeg;base64,${imageBase64}`;

    // Invia la richiesta all'API OCR.space
    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      null, // Non c'è bisogno di un body qui
      {
        responseType: "json", // Assicurati di impostare il responseType su json
        headers: {
          apikey: process.env.OCR_SPACE_API_KEY!,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.IsErroredOnProcessing) {
      throw new Error(response.data.ErrorMessage[0]);
    }

    const text = response.data.ParsedResults[0].ParsedText;

    const extractor = new MenuExtractor();
    const dishes = extractor.extractDishes(text);

    res.json({
      dishes,
      optimizedImage: imageData,
    });
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
