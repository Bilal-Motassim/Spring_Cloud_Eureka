package com.example.servicevoiture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VoitureController {
    @Autowired
    VoitureRepository voitureRepository;

    @GetMapping("/voituresClient/{id}")
    public ResponseEntity<List<Voiture>> getVoituresByClient(@PathVariable Long id){
        List<Voiture> voitures = voitureRepository.findVoituresByClient_id(id);
        return ResponseEntity.status(200).body(voitures);
    }
}
