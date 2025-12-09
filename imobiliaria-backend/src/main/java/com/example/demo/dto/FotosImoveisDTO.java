package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 
@NoArgsConstructor: Gera um construtor sem argumentos (public MinhaClasse() {}).
@AllArgsConstructor: Gera um construtor com todos os argumentos, na ordem em que os campos são declarados.
@RequiredArgsConstructor: Gera um construtor com os campos obrigatórios (aqueles final ou anotados com @NonNull).
 */

@NoArgsConstructor
@Getter
@Setter
public class FotosImoveisDTO {
    //@NonNull // <-- Torna 'id' obrigatório para @RequiredArgsConstructor
    private Integer id;
    private String nome_arquivo;
    private String caminho;
    private Boolean capa;
    private Integer ordem;
    // ID do imóvel ao qual a foto pertence
    private Integer imovelId;

    public FotosImoveisDTO(Integer id, String nome_arquivo, String caminho, Boolean capa, Integer ordem, Integer imovelId) {
        this.id = id;
        this.nome_arquivo = nome_arquivo;
        this.caminho = caminho;
        this.capa = capa;
        this.ordem = ordem;
        this.imovelId = imovelId;
    }
}
/* 
A anotação @Data é um atalho que inclui:

@Getter
@Setter
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
Mas ela NÃO inclui @NoArgsConstructor ou @AllArgsConstructor.
 */