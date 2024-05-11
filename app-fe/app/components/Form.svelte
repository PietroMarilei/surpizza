<script>
  import { Camera } from "@nativescript/camera";

  async function takePicture() {
    try {
      const imageAsset = await Camera.takePicture();
      // Converti l'ImageAsset in Blob o File qui se necessario
      return imageAsset;
    } catch (error) {
      console.error(error);
    }
  }

  let imageFile;

  async function handleUpload() {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("http://localhost:3000/orc", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Upload failed");
    }
  }
</script>

<form on:submit|preventDefault={handleUpload}>
  <button on:click={async () => (imageFile = await takePicture())}
    >Scatta Foto</button
  >
  <button type="submit">Invia</button>
</form>
