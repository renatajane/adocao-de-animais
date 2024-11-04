package com.poo.sistematizacao.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnimalDto {

    // Propriedades
    private Integer idAnimal;
    private String categoria;
    private String tipo;
    private Integer idade;
    private String raca;
    private Boolean statusAdocao;
    private String descricao;

}
