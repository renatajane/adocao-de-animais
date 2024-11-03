package com.poo.sistematizacao.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poo.sistematizacao.Dto.AnimalDto;
import com.poo.sistematizacao.Model.Animal;
import com.poo.sistematizacao.Repository.AnimalRepository;

@Service
public class AnimalService {

    @Autowired
    AnimalRepository repository;

    public void create(AnimalDto animalDto){

        Animal animal = new Animal(animalDto);
        repository.save(animal);

    }
    
}
