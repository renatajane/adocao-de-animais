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

    private Integer idAnimal;
    private String tipo;
    private String nome;
    private Integer idade;
    private String raca;
    private Boolean statusAdocao;
    private String descricao;

    // Construtor sem o idAnimal para criação
    public AnimalDto(String nome, String tipo, Integer idade, String raca, Boolean statusAdocao, String descricao) {
        this.nome = nome;
        this.tipo = tipo;
        this.idade = idade;
        this.raca = raca;
        this.statusAdocao = statusAdocao;
        this.descricao = descricao;
    }

    // Construtor que recebe entidade
    public AnimalDto(Animal animal) {
        BeanUtils.copyProperties(animal, this);
    }
}

