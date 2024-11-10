package com.poo.sistematizacao.dto;

import org.springframework.beans.BeanUtils;

import com.poo.sistematizacao.model.Animal;
import com.poo.sistematizacao.model.StatusAdocao;
import com.poo.sistematizacao.model.TipoAnimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnimalDtoRead {

    // Propriedades
    private Integer idAnimal;
    private TipoAnimal tipo;
    private String nome;
    private Integer idade;
    private String raca;
    private StatusAdocao statusAdocao;
    private String descricao;
    private String imagem;

    // Construtor que recebe entidade
    public AnimalDtoRead(Animal animal) {
        BeanUtils.copyProperties(animal, this);
        this.imagem = animal.getImagem();
    }
}
