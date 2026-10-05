package com.milkdairy.version1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableScheduling
@EnableCaching
@EnableKafka
public class Version1Application {
	//
	public static void main(String[] args) {
		
		SpringApplication.run(Version1Application.class, args);
	}

}
