package com.poo.sistematizacao.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.poo.sistematizacao.Model.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    // Busca animais por tipo
    @Query("SELECT a FROM Animal a WHERE a.tipo = tipo")
    List<Animal> findByTipo(@Param("tipo") String tipo);

}
