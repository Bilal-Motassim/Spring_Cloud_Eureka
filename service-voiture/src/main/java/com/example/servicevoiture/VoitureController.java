package com.example.servicevoiture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/voiture")
public class VoitureController {

    @Autowired
    public VoitureService voitureService;


    @GetMapping("/voituresClient/{id}")
    public ResponseEntity<List<VoitureResponse>> getVoituresByClient(@PathVariable Long id) {
        List<VoitureResponse> voitureResponses = voitureService.getVoituresByClient(id);
        if(voitureResponses==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(voitureResponses);
    }

    @PostMapping
    public VoitureResponse addVoiture(@RequestBody Voiture voiture) throws Exception {
        return voitureService.addVoiture(voiture);
    }

    @GetMapping
    public List<VoitureResponse> findAll() {
        return voitureService.findAll();
    }

    @GetMapping("/{id}")
    public VoitureResponse findById(@PathVariable Long id) throws Exception {
        return voitureService.findById(id);
    }
}
