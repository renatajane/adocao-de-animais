package com.poo.sistematizacao.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.poo.sistematizacao.Dto.AnimalDto;
import com.poo.sistematizacao.Model.Animal;
import com.poo.sistematizacao.Repository.AnimalRepository;

@Service
public class AnimalService {

    @Autowired
    AnimalRepository repository;

    private final String uploadDir = "uploads/";

    // Insere um animal novo
    public void create(AnimalDto animalDto) {

        Animal animal = new Animal(animalDto);
        repository.save(animal);

    }
    // Busca todos os animais
    // Busca animais por tipo
    // Edita informações de um animal
    // Edita apenas o status de adoção do animal

    // Imagem do animal
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        try {
            // Verifica se o diretório existe, senão cria
            Path directoryPath = Paths.get(uploadDir);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            // Salva o arquivo no diretório
            String fileName = file.getOriginalFilename();
            Path filePath = directoryPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // URL pública 
            String imageUrl = "http://localhost:8080/uploads/" + fileName;
            return ResponseEntity.ok(imageUrl); // Retorna o URL da imagem

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer upload");
        }
    }

    // Remove animal
    public void delete(Integer id){
        Animal animal = repository.findById(id).get();
        repository.delete(animal);
    }

}
