package com.poo.sistematizacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.poo.sistematizacao.model.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    // Busca animais por tipo
    @Query("SELECT a FROM Animal a WHERE LOWER(TRANSLATE(a.tipo, 'áéíóúãõàèìòùäëïöü', 'aeiouaoaeiouaei')) = LOWER(TRANSLATE(:tipo, 'áéíóúãõàèìòùäëïöü', 'aeiouaoaeiouaei'))")
    List<Animal> findByTipo(@Param("tipo") String tipo);
}
