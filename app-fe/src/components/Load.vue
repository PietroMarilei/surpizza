<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Upload Your Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-input type="file" accept="image/*" @change="handleFileChange" name="image"></ion-input>
            <ion-button @click="takePhoto">Take Photo</ion-button>
            <div v-if="responseJSON">
                <ul>
                    <li v-for="(item, i) in responseJSON" :key="i" @click="showModal = !showModal; console.log(responseJSON[i])">
                        <strong>ID:</strong> {{ item.id }}<br>
                        <strong>Name:</strong> {{ item.name }}<br>
                        <strong>Price:</strong> {{ item.price }} <br>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                    </li>
                    <div v-if="showModal">
                        <ion-input v-model="responseJSON[i].name" placeholder="Name"></ion-input>
                        <ion-input v-model="responseJSON[i].price" placeholder="Price"></ion-input>
                    </div>
                </ul>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import axios from 'axios';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);


const showModal = ref(false)
const imageSrc = ref('');
const responseJSON = ref([]);


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
        console.log("Sending...");
        const response = await axios.post('http://localhost:3000/pizza', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        responseJSON.value = response.data; // Assicurati che la risposta sia un array
    } catch (error) {
        console.error(error);
        responseJSON.value = 'Errore durante l\'invio del file.';
    }
};
</script>
