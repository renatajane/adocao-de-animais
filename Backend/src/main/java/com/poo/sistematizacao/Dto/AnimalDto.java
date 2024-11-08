package com.poo.sistematizacao.dto;

import org.springframework.beans.BeanUtils;

import com.poo.sistematizacao.model.Animal;
import com.poo.sistematizacao.model.StatusAdocao;
import com.poo.sistematizacao.model.TipoAnimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDto {

    private Integer idAnimal;
    private TipoAnimal tipo;
    private String nome;
    private Integer idade;
    private String raca;
    private StatusAdocao statusAdocao;
    private String descricao;

    // Construtor sem o idAnimal para criação
    public AnimalDto(String nome, TipoAnimal tipo, Integer idade, String raca, String descricao) {
        this.nome = nome;
        this.tipo = tipo;
        this.idade = idade;
        this.raca = raca;
        this.descricao = descricao;
    }

    // Construtor que recebe entidade
    public AnimalDto(Animal animal) {
        BeanUtils.copyProperties(animal, this);
    }
}

