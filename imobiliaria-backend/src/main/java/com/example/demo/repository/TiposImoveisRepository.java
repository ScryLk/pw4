package com.example.demo.repository;

import com.example.demo.model.TiposImoveisModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TiposImoveisRepository extends JpaRepository<TiposImoveisModel, Integer> {
    // Você pode adicionar métodos customizados aqui se necessário
    // Ex: List<TiposImoveisModel> findByNomeContaining(String nome);
}