package com.example.demo.dto;

import com.example.demo.model.ImoveisModel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ImoveisDTO {
    private Integer id;
    private String titulo;
    private String descricao;
    private BigDecimal preco_venda;
    private BigDecimal preco_aluguel;
    private ImoveisModel.Finalidade finalidade;
    private ImoveisModel.Status status;
    private Integer dormitorios;
    private Integer banheiros;
    private Integer garagem;
    private BigDecimal area_total;
    private BigDecimal area_construida;
    private String endereco;
    private String numero;
    private String complemento;
    private String cep;
    private String caracteristicas;
    private Boolean destaque;

    // IDs para relacionamentos
    private Integer tipoImovelId;
    private Integer bairroId;
    private Integer usuarioId;

    public ImoveisDTO() {}

    public ImoveisDTO(String titulo, String descricao, BigDecimal preco_venda, BigDecimal preco_aluguel,
                      ImoveisModel.Finalidade finalidade, ImoveisModel.Status status, Integer dormitorios,
                      Integer banheiros, Integer garagem, BigDecimal area_total, BigDecimal area_construida,
                      String endereco, String numero, String complemento, String cep, String caracteristicas,
                      Boolean destaque, Integer tipoImovelId, Integer bairroId, Integer usuarioId) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco_venda = preco_venda;
        this.preco_aluguel = preco_aluguel;
        this.finalidade = finalidade;
        this.status = status;
        this.dormitorios = dormitorios;
        this.banheiros = banheiros;
        this.garagem = garagem;
        this.area_total = area_total;
        this.area_construida = area_construida;
        this.endereco = endereco;
        this.numero = numero;
        this.complemento = complemento;
        this.cep = cep;
        this.caracteristicas = caracteristicas;
        this.destaque = destaque;
        this.tipoImovelId = tipoImovelId;
        this.bairroId = bairroId;
        this.usuarioId = usuarioId;
    }
}