package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "tipos_imoveis")
@Getter
@Setter
public class TiposImoveisModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    // Relacionamento com Imóveis (um tipo pode ter muitos imóveis)
    @OneToMany(mappedBy = "tipoImovel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JsonManagedReference
    @JsonIgnore
    private List<ImoveisModel> imoveis;

    public TiposImoveisModel() {}

    public TiposImoveisModel(Integer id, String nome, String descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
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
        TiposImoveisModel other = (TiposImoveisModel) obj;
        return id != null && id.equals(other.id);
    }
}