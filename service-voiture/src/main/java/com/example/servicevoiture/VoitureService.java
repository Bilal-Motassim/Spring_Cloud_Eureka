package com.example.servicevoiture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoitureService {
    @Autowired
    private VoitureRepository voitureRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<VoitureResponse> findAll() {
        List<Voiture> cars = voitureRepository.findAll();
        return cars.stream().map(this::mapToCarResponse).collect(Collectors.toList());
    }

    public VoitureResponse findById(Long id) throws Exception {
        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() -> new Exception("Invalid Car ID"));
        return mapToCarResponse(voiture);
    }

    public VoitureResponse addVoiture(Voiture voiture) throws Exception {
        try {
            restTemplate.getForObject(
                    "http://localhost:8888/SERVICE-CLIENT/clients/" + voiture.getClient_id(),
                    Client.class
            );
        } catch (Exception e) {
            throw new Exception("Invalid Client ID: " + voiture.getClient_id());
        }

        Voiture savedvoiture = voitureRepository.save(voiture);
        return mapToCarResponse(savedvoiture);
    }

    public List<VoitureResponse> getVoituresByClient(Long id){
        Client client = restTemplate.getForObject(
                "http://localhost:8888/SERVICE-CLIENT/clients/" + id,
                Client.class
        );
        if (client == null) {
            return null;
        }
        List<Voiture> voitures = voitureRepository.findVoituresByClient_id(id);

        List<VoitureResponse> voitureResponses = voitures.stream()
                .map(voiture -> VoitureResponse.builder()
                        .id(voiture.getId())
                        .brand(voiture.getMarque())
                        .model(voiture.getModel())
                        .matricule(voiture.getMatricule())
                        .client(client)
                        .build())
                .collect(Collectors.toList());
        return voitureResponses;
    }

    private VoitureResponse mapToCarResponse(Voiture voiture) {
        Client client = restTemplate.getForObject(
                "http://localhost:8888/SERVICE-CLIENT/clients/" + voiture.getClient_id(),
                Client.class
        );

        return VoitureResponse.builder()
                .id(voiture.getId())
                .brand(voiture.getMarque())
                .model(voiture.getModel())
                .matricule(voiture.getMatricule())
                .client(client)
                .build();
    }
}
