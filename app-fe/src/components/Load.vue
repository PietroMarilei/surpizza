<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Upload Your Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <!-- Input per il caricamento del file -->
            <ion-input type="file" accept="image/*" @change="handleFileChange" name="image"></ion-input>
            <!-- Bottone per scattare una foto -->
            <ion-button @click="takePhoto">Take Photo</ion-button>
            <!-- Controllo se responseJSON non è vuoto -->
            <div v-if="responseJSON.dishes && responseJSON.dishes.length > 0">
                <ul>
                    <li v-for="(item, i) in responseJSON.dishes" :key="i" @click="showModal = !showModal; console.log(responseJSON.dishes[i])">
                        <strong>ID:</strong> {{ item.id }}<br>
                        <strong>Name:</strong> {{ item.name }}<br>
                        <strong>Price:</strong> {{ item.price }} <br>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                    </li>
                    <!-- Modal per modificare i dati -->
                    <div v-if="showModal">
                        <ion-input v-model="responseJSON.dishes[i].name" placeholder="Name"></ion-input>
                        <ion-input v-model="responseJSON.dishes[i].price" placeholder="Price"></ion-input>
                    </div>
                </ul>
            </div>
            <!-- Mostra l'immagine ottimizzata -->
            <div v-if="responseJSON.optimizedImage">
                <img :src="responseJSON.optimizedImage" alt="Optimized Image" />
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

const showModal = ref(false);
const imageSrc = ref('');
const responseJSON = ref({ dishes: [], optimizedImage: '' });

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
        responseJSON.value = { dishes: [], optimizedImage: 'Errore durante l\'invio del file.' };
    }
};
</script>
