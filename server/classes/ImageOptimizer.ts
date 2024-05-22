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
      processedImage = await sharp(processedImage).grayscale().toBuffer();

      // Equalizzazione dell'istogramma
      processedImage = await sharp(processedImage)
        .modulate({ brightness: 1.2, saturation: 1.2 })
        .toBuffer();

      // Rimozione del rumore
      processedImage = await sharp(processedImage).median(3).toBuffer();

      // Correzione dell'illuminazione
      processedImage = await sharp(processedImage).normalize().toBuffer();
      // TODO: ottimizzare meglio immagine ?
      // // Applica un filtro di soglia per binarizzare l'immagine
      // processedImage = await sharp(processedImage).threshold(128).toBuffer();

      // // Applica trasformazioni morfologiche
      // processedImage = await sharp(processedImage).sharpen().toBuffer();

      // // Ridimensiona l'immagine a una risoluzione ottimale per l'OCR (300 DPI)
      // processedImage = await sharp(processedImage)
      //   .resize({ width: 2480, kernel: sharp.kernel.lanczos3 }) // Utilizza il kernel lanczos3 per un ridimensionamento di alta qualità
      //   .withMetadata({ density: 300 }) // Imposta la densità DPI
      //   .toBuffer();

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
