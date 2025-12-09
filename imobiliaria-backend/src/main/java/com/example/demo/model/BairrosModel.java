package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "bairros")
@Getter
@Setter
public class BairrosModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Cidade é obrigatória")
    private String cidade;

    @NotBlank(message = "Estado é obrigatório")
    private String estado;

    private String cep_inicial;
    private String cep_final;

    // Relacionamento com Imóveis (um bairro pode ter muitos imóveis)
    @OneToMany(mappedBy = "bairro", orphanRemoval = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    //@JsonManagedReference("bairro-imovel") 
    @JsonIgnore
    private List<ImoveisModel> imoveis = new ArrayList<>();

    public BairrosModel() {}

    public BairrosModel(Integer id, String nome, String cidade, String estado, String cep_inicial, String cep_final) {
        this.id = id;
        this.nome = nome;
        this.cidade = cidade;
        this.estado = estado;
        this.cep_inicial = cep_inicial;
        this.cep_final = cep_final;
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
        BairrosModel other = (BairrosModel) obj;
        return id != null && id.equals(other.id);
    }
}