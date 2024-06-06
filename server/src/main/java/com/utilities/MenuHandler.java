package com.utilities;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MenuHandler {

    private static final Logger logger = LoggerFactory.getLogger(MenuHandler.class);

    /**
     * Metodo per elaborare il risultato dell'analisi dell'immagine.
     * @param jsonResponse La risposta JSON dall'API OCR.
     * @return Un messaggio elaborato basato sul risultato dell'analisi.
     * @throws Exception se si verifica un errore durante l'elaborazione del risultato.
     */
    public String processResult(String jsonResponse) throws Exception {
        try {
            logger.info("JSON Response: {}", jsonResponse);

            // Converti la risposta JSON in un oggetto JSONObject
            JSONObject jsonObject = new JSONObject(jsonResponse);

            // Estrai le informazioni necessarie dal JSON
            String parsedText = jsonObject.getJSONArray("ParsedResults")
                                          .getJSONObject(0)
                                          .getString("ParsedText");

            logger.info("Parsed Text: {}", parsedText);

            // Esegui ulteriori elaborazioni se necessario
            // Ad esempio, puoi analizzare il testo, cercare parole chiave, ecc.
            JSONArray menuItems = new JSONArray();
            Pattern pattern = Pattern.compile("(.*?)(\\d+[,.]\\d{2})");
            Matcher matcher = pattern.matcher(parsedText);

            int id = 0;
            while (matcher.find()) {
                String name = matcher.group(1).trim();
                String price = matcher.group(2).replace(",", ".");

                JSONObject menuItem = new JSONObject();
                menuItem.put("id", id++);
                menuItem.put("name", name);
                menuItem.put("price", price);

                menuItems.put(menuItem);
            }

            // Restituisci un messaggio elaborato
            return menuItems.toString();
        } catch (Exception e) {
            logger.error("Errore durante l'elaborazione del risultato", e);
            throw new Exception("Errore durante l'elaborazione del risultato", e);
        }
    }
}
