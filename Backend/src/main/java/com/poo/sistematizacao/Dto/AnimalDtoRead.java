package com.poo.sistematizacao.dto;

import org.springframework.beans.BeanUtils;

import com.poo.sistematizacao.model.Animal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnimalDtoRead {

    // Propriedades
    private Integer idAnimal;
    private String tipo;
    private String nome;
    private Integer idade;
    private String raca;
    private Boolean statusAdocao;
    private String descricao;
    private String imagem;

    // Construtor que recebe entidade
    public AnimalDtoRead(Animal animal) {
        BeanUtils.copyProperties(animal, this);
        this.imagem = animal.getImagem();
    }
}
