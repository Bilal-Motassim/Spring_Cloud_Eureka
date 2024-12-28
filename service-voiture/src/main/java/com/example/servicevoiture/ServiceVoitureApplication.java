package com.example.servicevoiture;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class ServiceVoitureApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceVoitureApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5000);
        requestFactory.setReadTimeout(5000);
        restTemplate.setRequestFactory(requestFactory);
        return restTemplate;
    }
//    @Bean
//    CommandLineRunner initialiserBaseH2(VoitureRepository voitureRepository, ClientService clientService) {
//        return args -> {
//            // Fetch clients
//            Client c1 = clientService.clientById(2L);
//            Client c2 = clientService.clientById(1L);
//
//            // Print client 2 details
//            System.out.println("**************************");
//            System.out.println("Id est :" + c2.getId());
//            System.out.println("Nom est :" + c2.getNom());
//            System.out.println("**************************");
//            System.out.println("**************************");
//
//            // Print client 1 details
//            System.out.println("Id est :" + c1.getId());
//            System.out.println("Nom est :" + c1.getNom());
//            System.out.println("Age est :" + c1.getAge());
//            System.out.println("**************************");
//
//            // Save cars
//            voitureRepository.save(new Voiture( "Toyota",
//                    "A 25 333", "Corolla" , c2.getId(), c2));
//            voitureRepository.save(new Voiture( "Renault",
//                    "B 6 3456", "Megane", c2.getId(), c2));
//            voitureRepository.save(new Voiture("Peugeot",
//                    "A 55 4444", "301", c1.getId(),  c1));
//        };
//    }
}
