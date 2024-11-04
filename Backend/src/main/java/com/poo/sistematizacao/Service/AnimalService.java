package com.poo.sistematizacao.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

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
    public List<AnimalDto> list() {
        List<Animal> listaAnimais = repository.findAll();
        return listaAnimais.stream().map(AnimalDto::new).toList();
    }

    // Busca animais por tipo
    public List<AnimalDto> listType(String tipo) {
        List<Animal> listaAnimaisTipo = repository.findByTipo(tipo);
        return listaAnimaisTipo.stream().map(AnimalDto::new).toList();
    }

    // Edita informações de um animal
    public ResponseEntity<AnimalDto> update(Integer id, AnimalDto animalDto) {
        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal animal = optionalAnimal.get();
            animal.setNome(animalDto.getNome());
            animal.setTipo(animalDto.getTipo());
            animal.setIdade(animalDto.getIdade());
            animal.setRaca(animalDto.getRaca());
            animal.setStatusAdocao(animalDto.getStatusAdocao());
            animal.setDescricao(animalDto.getDescricao());
            Animal updatedAnimal = repository.save(animal);
            return ResponseEntity.ok(new AnimalDto(updatedAnimal));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Edita apenas o status de adoção do animal
    public ResponseEntity<AnimalDto> updateStatusAdocao(Integer id, Boolean statusAdocao) {
        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal animal = optionalAnimal.get();
            animal.setStatusAdocao(statusAdocao);
            Animal updatedAnimal = repository.save(animal);
            return ResponseEntity.ok(new AnimalDto(updatedAnimal));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Imagem do animal
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        try {
            // Verifica se o diretório existe, se não existir, é criado
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
    public ResponseEntity<String> delete(Integer id) {
        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            repository.delete(optionalAnimal.get());
            return ResponseEntity.ok("Animal removido com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado.");
        }
    }

}
