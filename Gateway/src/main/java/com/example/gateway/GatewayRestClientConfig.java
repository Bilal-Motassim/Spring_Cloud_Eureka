package com.example.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.boot.web.client.RestClientCustomizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class GatewayRestClientConfig {

    @Bean
    public RestClient.Builder gatewayRestClientBuilder(
            RestClientCustomizer... restClientCustomizers) {
        RestClient.Builder builder = RestClient.builder();

        // Apply any customizers that are available in the context
        for (RestClientCustomizer customizer : restClientCustomizers) {
            customizer.customize(builder);
        }

        // Add default configuration suitable for gateway proxying
        builder.defaultHeaders(headers -> {
            headers.add("Accept", "*/*");
            headers.add("Forward-For", "spring-cloud-gateway");
        });

        return builder;
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:3001/"); // Allow all origins (change '*' to specific domains for security)
        corsConfiguration.addAllowedMethod("*"); // Allow all HTTP methods
        corsConfiguration.addAllowedHeader("*"); // Allow all headers
        corsConfiguration.setAllowCredentials(true); // Allow credentials like cookies and Authorization headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // Apply to all paths

        return new CorsWebFilter(source);
    }
}
