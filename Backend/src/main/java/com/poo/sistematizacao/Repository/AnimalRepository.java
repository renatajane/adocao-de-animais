package com.poo.sistematizacao.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poo.sistematizacao.Model.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {
    
}
