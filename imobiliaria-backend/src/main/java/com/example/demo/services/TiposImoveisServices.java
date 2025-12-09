package com.example.demo.services;

import com.example.demo.dto.TiposImoveisDTO;
import com.example.demo.model.TiposImoveisModel;
import com.example.demo.repository.TiposImoveisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TiposImoveisServices {

    @Autowired
    private TiposImoveisRepository repositorio;

    public List<TiposImoveisModel> getAll() {
        return repositorio.findAll();
    }

    public Page<TiposImoveisModel> getAll(Pageable pageable) {
        Page<TiposImoveisModel> list = repositorio.findAll(pageable);
        return list;
    }

    public TiposImoveisModel find(Integer id) {
        Optional<TiposImoveisModel> model = repositorio.findById(id);
        return model.orElse(null);
    }

    public TiposImoveisModel insert(TiposImoveisModel model) {
        return repositorio.save(model);
    }

    public TiposImoveisModel insert(TiposImoveisDTO dto) {
        TiposImoveisModel model = new TiposImoveisModel();
        model.setNome(dto.getNome());
        model.setDescricao(dto.getDescricao());
        return repositorio.save(model);
    }

    public TiposImoveisModel update(TiposImoveisModel model) {
        try {
            if (find(model.getId()) != null) {
                return repositorio.save(model);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    // --- MÉTODO UPDATE USANDO DTO (NOVO) ---
    public TiposImoveisModel update(Integer id, TiposImoveisDTO dto) {
        java.util.Optional<TiposImoveisModel> optionalModel = repositorio.findById(id);
        if (optionalModel.isPresent()) {
            TiposImoveisModel model = optionalModel.get();
            // Atualiza os campos com os dados do DTO
            model.setNome(dto.getNome());
            model.setDescricao(dto.getDescricao());
            // Salva as alterações
            return repositorio.save(model);
        } else {
            return null; // Ou lançar exceção
        }
    }

    public boolean delete(Integer id) {
        try {
            if (find(id) != null) {
                repositorio.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
}