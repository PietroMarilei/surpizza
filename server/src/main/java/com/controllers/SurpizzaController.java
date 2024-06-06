package com.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.utilities.MenuHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class SurpizzaController {

    private static final Logger logger = LoggerFactory.getLogger(SurpizzaController.class);

    @Value("${ocr.api.key}")
    private String ocrApiKey;

    @Value("${ocr.api.url}")
    private String ocrApiUrl;

    @PostMapping("/pizza")
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File non caricato");
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.set("apikey", ocrApiKey);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", file.getResource());
            body.add("language", "ita");

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(
                    ocrApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            logger.info("OCR API response: {}", response.getBody());

            MenuHandler menuHandler = new MenuHandler();
            String result = menuHandler.processResult(response.getBody());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Errore durante l'elaborazione del risultato", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore durante l'elaborazione del risultato");
        }
    }
}
