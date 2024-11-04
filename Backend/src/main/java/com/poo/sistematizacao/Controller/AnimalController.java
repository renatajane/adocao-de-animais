package com.poo.sistematizacao.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    @PostMapping
    public void create(@RequestBody AnimalDto animalDto) {
        service.create(animalDto);
    }

    // Lista todos os animais
    @GetMapping("/list")
    public List<AnimalDto> list() {
        return service.list();
    }

    // Lista animais por tipo
    @GetMapping("/list-tipo")
    public List<AnimalDto> listTipo(@RequestParam String tipo) {
        return service.listType(tipo);
    }

    // Edita informações de um animal
    @PutMapping("/{id}")
    public ResponseEntity<AnimalDto> update(@PathVariable Integer id, @RequestBody AnimalDto animalDto) {
        return service.update(id, animalDto);
    }

    // Edita apenas o status de adoção do animal
    @PatchMapping("/{id}/status")
    public ResponseEntity<AnimalDto> updateStatusAdocao(@PathVariable Integer id, @RequestParam Boolean status) {
        return service.updateStatusAdocao(id, status);
    }

    // Post para inserir imagem
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        return service.uploadImage(file);
    }

    // Remove animal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
