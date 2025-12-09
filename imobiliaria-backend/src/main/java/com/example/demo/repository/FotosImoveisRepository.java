package com.example.demo.repository;

import com.example.demo.model.FotosImoveisModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FotosImoveisRepository extends JpaRepository<FotosImoveisModel, Integer> {
    List<FotosImoveisModel> findByImovelId(Integer imovelId);
    List<FotosImoveisModel> findByImovelIdAndCapaTrue(Integer imovelId); // Foto de capa
    List<FotosImoveisModel> findByImovelIdOrderByOrdemAsc(Integer imovelId); // Ordenadas por ordem
}