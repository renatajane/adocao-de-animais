package com.poo.sistematizacao.config;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class StartupApplicationListener {

    private static final String UPLOADS_DIR = "uploads";
    private static final Logger logger = Logger.getLogger(StartupApplicationListener.class.getName());

    @EventListener(ContextRefreshedEvent.class)
    public void onApplicationEvent() {
        Path uploadsPath = Paths.get(UPLOADS_DIR);

        try {
            if (Files.exists(uploadsPath) && Files.isDirectory(uploadsPath)) {
                logger.info("Excluindo conteúdo da pasta 'uploads'...");
                deleteContents(uploadsPath.toFile());
                Files.createDirectories(uploadsPath);  // Garante que a pasta será recriada vazia
            } else {
                logger.info("A pasta 'uploads' não existe, criando nova pasta.");
                Files.createDirectories(uploadsPath);
            }
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Erro ao deletar o conteúdo da pasta 'uploads': " + e.getMessage(), e);
        }
    }

    private void deleteContents(File directory) {
        File[] allContents = directory.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                if (file.isDirectory()) {
                    deleteContents(file);  // Remove o conteúdo de subpastas
                }
                boolean deleted = file.delete();
                logger.info("Deletando " + file.getAbsolutePath() + " - " + (deleted ? "Sucesso" : "Falha"));
            }
        }
    }
}
