import sharp from "sharp";

class ImageOptimizer {
  async optimize(imageBuffer: Buffer): Promise<Buffer> {
    try {
      // Converte l'immagine in scala di grigi [1]
      const grayscaleImage = await sharp(imageBuffer).grayscale().toBuffer();

      // Applica un filtro di soglia per binarizzare l'immagine [1][2]
      const binarizedImage = await sharp(grayscaleImage)
        .threshold(128)
        .toBuffer();

      // Ridimensiona l'immagine a una risoluzione ottimale per l'OCR (300 DPI) [0]
      // Ridimensiona l'immagine a una risoluzione ottimale per l'OCR (300 DPI) [0]
      const resizedImage = await sharp(binarizedImage)
        .resize({
          density: 300,
        })
        .toBuffer();

      // Applica un filtro di nitidezza per migliorare la definizione dei caratteri [4]
      const sharpedImage = await sharp(resizedImage).sharpen().toBuffer();

      return sharpedImage;
    } catch (error) {
      console.error("Errore durante l'ottimizzazione dell'immagine:", error);
      throw error;
    }
  }
}

export default ImageOptimizer;
