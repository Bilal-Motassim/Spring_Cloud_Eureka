package com.example.servicevoiture;

import jakarta.persistence.*;

@Entity
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String matricule;
    private String model;
    private Long client_id;


    public Voiture() {
    }

    public Voiture(String marque, String matricule, String model, Long client_id) {
        this.marque = marque;
        this.matricule = matricule;
        this.model = model;
        this.client_id = client_id;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Long getClient_id() {
        return client_id;
    }

    public void setClient_id(Long client_id) {
        this.client_id = client_id;
    }
}
