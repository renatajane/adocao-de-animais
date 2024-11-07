package com.poo.sistematizacao.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.poo.sistematizacao.dto.AnimalDto;
import com.poo.sistematizacao.dto.AnimalDtoRead;
import com.poo.sistematizacao.model.Animal;
import com.poo.sistematizacao.repository.AnimalRepository;

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

    public ResponseEntity<AnimalDto> createWithImage(AnimalDto animalDto, MultipartFile file) {
        try {
            // Cria o objeto Animal a partir do AnimalDto
            Animal animal = new Animal(animalDto);
    
            // Salva o animal no banco de dados
            Animal savedAnimal = repository.save(animal);
    
            // Verifica se a imagem foi recebida
            if (file != null && !file.isEmpty()) {
                // Realiza o upload da imagem para o animal recém-criado
                Path directoryPath = Paths.get(uploadDir);
                if (!Files.exists(directoryPath)) {
                    Files.createDirectories(directoryPath);
                }
    
                // Salva o arquivo no diretório com o ID do animal e nome original do arquivo
                String fileName = savedAnimal.getIdAnimal() + "_" + file.getOriginalFilename(); // Inclui o ID do animal no nome
                Path filePath = directoryPath.resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
                // Cria a URL para acessar a imagem, com base no ID do animal
                String imageUrl = "http://localhost:8080/uploads/" + fileName;
                savedAnimal.setImagem(imageUrl); // Atualiza o animal com a URL da imagem
    
                // Salva novamente o animal com a URL da imagem
                savedAnimal = repository.save(savedAnimal);
            }
    
            // Retorna o animal recém-criado com a imagem associada
            return ResponseEntity.ok(new AnimalDto(savedAnimal));
    
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    

    // Busca todos os animais
    public List<AnimalDtoRead> list() {
        List<Animal> listaAnimais = repository.findAll();
        return listaAnimais.stream().map(AnimalDtoRead::new).toList();
    }

    // Busca animais por tipo
    public List<AnimalDtoRead> listType(String tipo) {
        List<Animal> listaAnimaisTipo = repository.findByTipo(tipo);
        return listaAnimaisTipo.stream().map(AnimalDtoRead::new).toList();
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

    // Upload de imagem do animal
    public ResponseEntity<String> uploadImage(Integer animalId, MultipartFile file) {
        Optional<Animal> optionalAnimal = repository.findById(animalId);
    
        if (optionalAnimal.isPresent()) {
            Animal animal = optionalAnimal.get();
            try {
                // Verifica se o diretório existe, se não existir, é criado
                Path directoryPath = Paths.get(uploadDir);
                if (!Files.exists(directoryPath)) {
                    Files.createDirectories(directoryPath);
                }
    
                // Salva o arquivo no diretório com o ID do animal e nome original do arquivo
                String fileName = animalId + "_" + file.getOriginalFilename(); // Inclui o ID do animal no nome
                Path filePath = directoryPath.resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
                // Cria a URL para acessar a imagem, com base no ID do animal
                String imageUrl = "http://localhost:8080/uploads/" + fileName;
                animal.setImagem(imageUrl); // Atualiza o animal com a URL da imagem
    
                // Salva a URL no banco de dados
                repository.save(animal);
    
                return ResponseEntity.ok(imageUrl); // Retorna o URL da imagem
    
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer upload");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado.");
        }
    }    

    // Método para recuperar a imagem
    public Resource getImage(Integer id) {
        String fileName = id + ".jpg"; // Ou use o nome original, conforme o seu armazenamento
        File file = new File(uploadDir, fileName);

        if (file.exists()) {
            return new FileSystemResource(file); // Retorna o arquivo como recurso
        }
        return null; // Retorna null caso o arquivo não exista
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
