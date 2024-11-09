package com.poo.sistematizacao.model;

public class ErroResponse {

    private String erro;
    private boolean comErro;

    // Construtores, getters e setters
    public ErroResponse(String erro, boolean comErro) {
        this.erro = erro;
        this.comErro = comErro;
    }

    public String getErro() {
        return erro;
    }

    public void setErro(String erro) {
        this.erro = erro;
    }

    public boolean isComErro() {
        return comErro;
    }

    public void setComErro(boolean comErro) {
        this.comErro = comErro;
    }
}
