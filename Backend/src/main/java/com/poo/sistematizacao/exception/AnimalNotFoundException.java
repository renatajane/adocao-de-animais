package com.poo.sistematizacao.exception;

public class AnimalNotFoundException extends RuntimeException{
    public AnimalNotFoundException(String message) {
        super(message);
    }
}
