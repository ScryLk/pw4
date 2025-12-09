package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "fotos_imovel")
@Getter
@Setter
public class FotosImoveisModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Nome do arquivo é obrigatório")
    private String nome_arquivo;

    @NotBlank(message = "Caminho da foto é obrigatório")
    private String caminho; // URL da foto

    private Boolean capa = false; // Se é a foto principal/capa

    @NotNull(message = "Ordem é obrigatória")
    private Integer ordem; // Ordem de exibição

    // Relacionamento com Imóveis (muitas fotos para um imóvel)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "imovel_id", nullable = false)
    @JsonBackReference
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ImoveisModel imovel;

    public FotosImoveisModel() {}

    public FotosImoveisModel(Integer id, String nome_arquivo, String caminho, Boolean capa, Integer ordem) {
        this.id = id;
        this.nome_arquivo = nome_arquivo;
        this.caminho = caminho;
        this.capa = capa;
        this.ordem = ordem;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FotosImoveisModel other = (FotosImoveisModel) obj;
        return id != null && id.equals(other.id);
    }
}