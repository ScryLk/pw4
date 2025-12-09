package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BairrosDTO {
    private Integer id;
    private String nome;
    private String cidade;
    private String estado;
    private String cep_inicial;
    private String cep_final;

    public BairrosDTO() {}

    public BairrosDTO(String nome, String cidade, String estado, String cep_inicial, String cep_final) {
        this.nome = nome;
        this.cidade = cidade;
        this.estado = estado;
        this.cep_inicial = cep_inicial;
        this.cep_final = cep_final;
    }
}