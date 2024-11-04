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

    // Propriedades de Animal
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_animal")
    private Integer idAnimal;

    @Column(name="tipo")
    private String tipo; //ex: gato, cachorro

    @Column(name="idade")
    private Integer idade;

    @Column(name="raca")
    private String raca;

    @Column(name="status_adocao")
    private Boolean statusAdocao;

    @Column(name="imagem")
    private String imagem;

    @Column(name="descricao")
    private String descricao; //ex: animal faz uso contínuo de determinada medicação

    // Construtor que aceita AnimalDto
    public Animal(AnimalDto animalDto) {
        this.tipo = animalDto.getTipo();
        this.idade = animalDto.getIdade();
        this.raca = animalDto.getRaca();
        this.statusAdocao = animalDto.getStatusAdocao();
        this.descricao = animalDto.getDescricao();
    }
    
}
