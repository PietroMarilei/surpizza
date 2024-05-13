<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Upload Photo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-input type="file" accept="image/*" @change="handleFileChange" name="image"></ion-input>
      <ion-button @click="takePhoto">Take Photo</ion-button>
      <div v-if="responseJSON">{{ responseJSON }}</div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import axios from 'axios';

const imageSrc = ref('');
const responseJSON = ref('');

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });
  imageSrc.value = image.webPath;
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await axios.post('http://localhost:3000/pizza', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    responseJSON.value = JSON.stringify(response.data);
  } catch (error) {
    console.error(error);
    responseJSON.value = 'Errore durante l\'invio del file.';
  }
};
</script>
