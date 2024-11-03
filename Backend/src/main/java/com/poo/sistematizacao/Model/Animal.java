package com.poo.sistematizacao.Model;

import com.poo.sistematizacao.Dto.AnimalDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="animal")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_animal")
    private Integer idAnimal;

    @Column(name="categoria")
    private String categoria;

    // Construtor que aceita AnimalDto
    public Animal(AnimalDto animalDto) {
        this.categoria = animalDto.getCategoria();
    }
    
}
