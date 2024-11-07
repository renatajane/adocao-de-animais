package com.poo.sistematizacao.controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import com.poo.sistematizacao.dto.AnimalDto;
import com.poo.sistematizacao.dto.AnimalDtoRead;
import com.poo.sistematizacao.model.Animal;
import com.poo.sistematizacao.model.StatusAdocao;
import com.poo.sistematizacao.repository.AnimalRepository;
import com.poo.sistematizacao.service.AnimalService;

@RestController
@RequestMapping("/api/animal")
public class AnimalController {

    @Autowired
    AnimalService service;

    @Autowired
    AnimalRepository repository;

    // Insere um animal novo
    @PostMapping
    public void create(@RequestBody AnimalDto animalDto) {
        service.create(animalDto);
    }

    @PostMapping("/createWithImage")
    public ResponseEntity<AnimalDto> createWithImage(
        @RequestParam("nome") String nome,
        @RequestParam("tipo") String tipo,
        @RequestParam("idade") Integer idade,
        @RequestParam("raca") String raca,
        @RequestParam("descricao") String descricao,
        @RequestParam("file") MultipartFile file) {
        // Criando o DTO do Animal com os dados recebidos, sem o idAnimal
        AnimalDto animalDto = new AnimalDto(nome, tipo, idade, raca, descricao);
        return service.createWithImage(animalDto, file);
    }
    

    // Lista todos os animais
    @GetMapping("/list")
    public List<AnimalDtoRead> list() {
        return service.list();
    }

    // Lista animais por tipo
    @GetMapping("/list-tipo")
    public List<AnimalDtoRead> listTipo(@RequestParam String tipo) {
        return service.listType(tipo);
    }

    // Edita informações de um animal
    @PutMapping("/{id}")
    public ResponseEntity<AnimalDto> update(@PathVariable Integer id, @RequestBody AnimalDto animalDto) {
        return service.update(id, animalDto);
    }

    // Edita apenas o status de adoção do animal
    @PatchMapping("/{id}/status")
    public ResponseEntity<AnimalDto> updateStatusAdocao(@PathVariable Integer id, @RequestParam StatusAdocao status) {
        return service.updateStatusAdocao(id, status);
    }

    // Post para inserir imagem
    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
        return service.uploadImage(id, file);
    }

    // Endpoint para obter a imagem do animal
    @GetMapping("/image/{id}")
    public ResponseEntity<Resource> getAnimalImage(@PathVariable Integer id) {
        Optional<Animal> optionalAnimal = repository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal animal = optionalAnimal.get();
            String imageUrl = animal.getImagem(); // Recupera a URL da imagem associada ao animal

            if (imageUrl != null) {
                Path imagePath = Paths.get(imageUrl.replace("http://localhost:8080/", ""));
                File file = imagePath.toFile();
                if (file.exists()) {
                    Resource image = new FileSystemResource(file);

                    // Verifica a extensão do arquivo para determinar o tipo de mídia correto
                    String fileName = image.getFilename();
                    String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

                    MediaType mediaType = switch (fileExtension) {
                        case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
                        case "png" -> MediaType.IMAGE_PNG;
                        default -> MediaType.APPLICATION_OCTET_STREAM; // Para tipos desconhecidos
                    };

                    return ResponseEntity.ok()
                            .contentType(mediaType) // Define o tipo de mídia correto
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"") // Exibe a
                                                                                                              // imagem
                                                                                                              // no
                                                                                                              // navegador
                            .body(image); // Retorna a imagem
                }
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Retorna 404 se a imagem não for encontrada
    }

    // Remove animal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
