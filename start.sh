#!/bin/bash

# Naviga nella cartella 'server' e avvia il server
echo "Avvio del server..."
cd server
npm run dev &

# Assicurati di tornare alla cartella radice
cd ..

# Naviga nella cartella 'app-fe' e avvia l'applicazione frontend
echo "Avvio dell'applicazione frontend..."
cd app-fe
ionic serve &

# Attendi che entrambi i comandi terminino
wait
echo "OGHEYLESSSGOW!"
