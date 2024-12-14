package com.example.servicevoiture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    @Query("SELECT v FROM Voiture v WHERE v.client_id = :clientId")
    List<Voiture> findVoituresByClient_id(@Param("clientId") Long id);
}
