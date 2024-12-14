package com.example.servicevoiture;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="SERVICE-CLIENT")
public interface ClientService {
    @GetMapping(path="/clients/{id}")
    Client clientById(@PathVariable Long id);
}
