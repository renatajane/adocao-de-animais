package com.poo.sistematizacao.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.poo.sistematizacao.dto.AnimalDto;
import com.poo.sistematizacao.dto.AnimalDtoRead;
import com.poo.sistematizacao.model.TipoAnimal;
import com.poo.sistematizacao.service.AnimalService;

@RestController
@RequestMapping("/api/animal")
public class AnimalController {

    @Autowired
    AnimalService service;

    // Busca animal por id
    @GetMapping("/{id}")
    public AnimalDtoRead findById(@PathVariable Integer id) {
        return service.findById(id);
    }

    // Cria animal já com a imagem
    @RequestMapping(value = "/create",
                    method = RequestMethod.POST,  
                    consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnimalDto> create(
            @RequestParam("nome") String nome,
            @RequestParam("tipo") TipoAnimal tipo,
            @RequestParam("idade") Integer idade,
            @RequestParam("raca") String raca,
            @RequestParam("descricao") String descricao,
            @RequestPart("file") MultipartFile file) throws IOException {
        AnimalDto animalDto = new AnimalDto(nome, tipo, idade, raca, descricao);
        var animalCreated = service.create(animalDto, file);
        return ResponseEntity.ok(animalCreated);
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

    // Endpoint para obter a imagem do animal
    @GetMapping("/image/{id}")
    public ResponseEntity<Resource> getAnimalImage(@PathVariable Integer id) throws Exception {

        Resource image = service.getImage(id);

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
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(image);

    }

    // Edita informações de um animal
    @PutMapping("/{id}")
    public ResponseEntity<AnimalDto> update(@PathVariable Integer id, @RequestBody AnimalDto animalDto)
            throws Exception {
        var animalUpdated = service.update(id, animalDto);
        return ResponseEntity.ok(animalUpdated);
    }

    // Remove animal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
