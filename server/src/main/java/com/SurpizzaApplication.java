package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.controllers")
public class SurpizzaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SurpizzaApplication.class, args);
	}

}
