package com.example.servicevoiture;


public class VoitureResponse {
    private Long id;
    private String brand;
    private String model;
    private String matricule;
    private Client client;

    // Default constructor
    public VoitureResponse() {
    }

    // All args constructor
    public VoitureResponse(Long id, String brand, String model, String matricule, Client client) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.matricule = matricule;
        this.client = client;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    // Builder class
    public static class Builder {
        private Long id;
        private String brand;
        private String model;
        private String matricule;
        private Client client;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder brand(String brand) {
            this.brand = brand;
            return this;
        }

        public Builder model(String model) {
            this.model = model;
            return this;
        }

        public Builder matricule(String matricule) {
            this.matricule = matricule;
            return this;
        }

        public Builder client(Client client) {
            this.client = client;
            return this;
        }

        public VoitureResponse build() {
            return new VoitureResponse(id, brand, model, matricule, client);
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}