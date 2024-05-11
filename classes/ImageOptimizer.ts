import sharp from "sharp";

class ImageOptimizer {
  static async optimize(imageBuffer: Buffer): Promise<Buffer> {
    try {
      // Rimuove il canale alfa
      let processedImage = imageBuffer;
      processedImage = await sharp(processedImage)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .toBuffer();

      // Converte l'immagine in scala di grigi
      processedImage = await sharp(processedImage)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .toBuffer();

      // Applica un filtro di soglia per binarizzare l'immagine
      processedImage = await sharp(processedImage).threshold(128).toBuffer();

      // Applica trasformazioni morfologiche
      processedImage = await sharp(processedImage).sharpen().toBuffer();

      // Ridimensiona l'immagine a una risoluzione ottimale per l'OCR (300 DPI)
      processedImage = await sharp(processedImage)
        .resize({ width: 2480 }) // Assumendo che la larghezza corrisponda a una risoluzione di 300 DPI per un formato A4
        .withMetadata({ density: 300 }) // Imposta la densità DPI
        .toBuffer();

      // Applica un filtro di nitidezza per migliorare la definizione dei caratteri
      processedImage = await sharp(processedImage).sharpen().toBuffer();

      return processedImage;
    } catch (error) {
      console.error("Errore durante l'ottimizzazione dell'immagine:", error);
      throw error;
    }
  }
}

export default ImageOptimizer;
