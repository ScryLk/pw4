package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TiposImoveisDTO {
    private Integer id;
    private String nome;
    private String descricao;

    public TiposImoveisDTO() {}

    public TiposImoveisDTO(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}