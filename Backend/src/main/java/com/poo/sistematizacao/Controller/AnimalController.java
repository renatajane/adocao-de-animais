package com.poo.sistematizacao.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.poo.sistematizacao.Dto.AnimalDto;
import com.poo.sistematizacao.Service.AnimalService;

@RestController
@RequestMapping("/api/animal")
public class AnimalController {

    @Autowired
    AnimalService service;

    // Insere um animal novo
    @PostMapping("/create")
    public void create(@RequestBody AnimalDto animalDto) {
        service.create(animalDto);
    }

    // Edita informações de um animal
    // Edita apenas o status de adoção do animal

    // Remove animal

    // Post para inserir imagem
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        return service.uploadImage(file);
    }

}
