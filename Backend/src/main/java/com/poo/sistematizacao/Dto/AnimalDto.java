package com.poo.sistematizacao.dto;

import org.springframework.beans.BeanUtils;

import com.poo.sistematizacao.model.Animal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnimalDto {

    // Propriedades
    private Integer idAnimal;
    private String tipo;
    private String nome;
    private Integer idade;
    private String raca;
    private Boolean statusAdocao;
    private String descricao;

    // Construtor que recebe entidade
    public AnimalDto(Animal animal) {
        BeanUtils.copyProperties(animal, this);
    }

}
