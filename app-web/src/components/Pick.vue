<script>
submitForm() {
    let formData = new FormData();
    formData.append('file', this.file);

    axios.post('YOUR_ENDPOINT_URL', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
        // Qui puoi gestire la risposta dal server, ad esempio mostrando l'immagine caricata
    }).catch(error => {
        console.error('Errore durante l\'invio:', error);
    });
}
methods: {
    handleFileUpload(e) {
        this.file = e.target.files[0];
    }
}</script>

<template>
    <div>
        <label>
            Scegli un'immagine:
            <input type="file" @change="handleFileUpload($event)" />
        </label>
        <button @click="submitForm">Invia</button>
    </div>
</template>


<style scoped>
.upload {
    color: white;
    background-color: rgb(37, 37, 37);
}
</style>
