package com.example.demo.repository;

import com.example.demo.model.BairrosModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BairrosRepository extends JpaRepository<BairrosModel, Integer> {
    // Ex: List<BairrosModel> findByCidade(String cidade);
}