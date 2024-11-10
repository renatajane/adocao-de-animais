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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.poo.sistematizacao.dto.AnimalDto;
import com.poo.sistematizacao.dto.AnimalDtoRead;
import com.poo.sistematizacao.exception.AnimalNotFoundException;
import com.poo.sistematizacao.model.Animal;
import com.poo.sistematizacao.model.StatusAdocao;
import com.poo.sistematizacao.repository.AnimalRepository;

@Service
public class AnimalService {

    @Autowired
    AnimalRepository repository;

    private final String uploadDir = "uploads/";

    // Busca animal por Id
    public AnimalDtoRead findById(Integer id) {

        Optional<Animal> animalOptional = repository.findById(id);

        if (animalOptional.isPresent()) {
            Animal animal = animalOptional.get();
            return new AnimalDtoRead(animal);
        } else {
            throw new AnimalNotFoundException("Animal não encontrado para o ID: " + id);
        }
    }

    // Cria animal com a imagem
    public AnimalDto create(AnimalDto animalDto, MultipartFile file) throws IOException {

        if (animalDto.getIdade() < 0) {
            throw new IllegalArgumentException("A idade não pode ser menor do que zero.");
        }

        // Cria o objeto Animal a partir do AnimalDto
        Animal animal = new Animal(animalDto);

        animalDto.getStatusAdocao();
        animal.setStatusAdocao(StatusAdocao.DISPONIVEL);

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
            String fileName = savedAnimal.getIdAnimal() + "_" + file.getOriginalFilename();
            Path filePath = directoryPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Cria a URL para acessar a imagem, com base no ID do animal
            String imageUrl = "http://localhost:8080/uploads/" + fileName;
            savedAnimal.setImagem(imageUrl); // Atualiza o animal com a URL da imagem

            // Salva novamente o animal com a URL da imagem
            savedAnimal = repository.save(savedAnimal);
        }

        // Retorna o animal recém-criado com a imagem associada
        return new AnimalDto(savedAnimal);
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

    // Método para recuperar a imagem
    public Resource getImage(Integer id) throws Exception {

        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal animal = optionalAnimal.get();
            String imageUrl = animal.getImagem(); // Recupera a URL da imagem associada ao animal

            if (imageUrl != null) {
                Path imagePath = Paths.get(imageUrl.replace("http://localhost:8080/", ""));
                File file = imagePath.toFile();
                if (file.exists()) {
                    Resource image = new FileSystemResource(file);
                    return image;
                }
            }
        }
        throw new Exception("Imagem não encontrada");
    }

    // Atualiza informações de um animal
    public AnimalDto update(Integer id, AnimalDto animalDto) throws Exception {
        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal animal = optionalAnimal.get();

            if (animalDto.getIdade() < 0) {
                throw new IllegalArgumentException("A idade não pode ser menor do que zero.");
            }

            // Atualizando os dados do animal, exceto a imagem
            animal.setNome(animalDto.getNome());
            animal.setTipo(animalDto.getTipo());
            animal.setIdade(animalDto.getIdade());
            animal.setRaca(animalDto.getRaca());
            animal.setStatusAdocao(animalDto.getStatusAdocao());
            animal.setDescricao(animalDto.getDescricao());

            // Salvando o animal atualizado
            Animal updatedAnimal = repository.save(animal);

            return new AnimalDto(updatedAnimal);
        } else {
            throw new Exception("Animal não encontrado.");
        }
    }

    // Remove animal
    public void delete(Integer id) {
        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            repository.delete(optionalAnimal.get());
        } else {
            throw new AnimalNotFoundException("Animal não encontrado.");
        }
    }

}
