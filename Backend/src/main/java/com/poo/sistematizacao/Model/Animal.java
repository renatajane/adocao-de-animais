package com.poo.sistematizacao.model;

import com.poo.sistematizacao.dto.AnimalDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Column(name="nome")
    private String nome;

    @Enumerated(EnumType.STRING)  
    @Column(name="tipo")
    private TipoAnimal tipo; //ex: gato, cachorro

    @Column(name="idade")
    private Integer idade;

    @Column(name="raca")
    private String raca;

    @Enumerated(EnumType.STRING)  
    @Column(name="status_adocao")
    private StatusAdocao statusAdocao;

    @Column(name="imagem")
    private String imagem;

    @Column(name="descricao")
    private String descricao; //ex: animal faz uso contínuo de determinada medicação

    // Construtor que aceita AnimalDto
    public Animal(AnimalDto animalDto) {
        this.tipo = animalDto.getTipo();
        this.nome = animalDto.getNome();
        this.idade = animalDto.getIdade();
        this.raca = animalDto.getRaca();
        this.statusAdocao = animalDto.getStatusAdocao();
        this.descricao = animalDto.getDescricao();
    }
    
}
