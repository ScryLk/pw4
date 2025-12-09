package com.example.demo.services;

import com.example.demo.dto.BairrosDTO;
import com.example.demo.model.BairrosModel;
import com.example.demo.repository.BairrosRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BairrosServices {

    @Autowired
    private BairrosRepository repositorio;

    public List<BairrosModel> getAll() {
        return repositorio.findAll();
    }

    public Page<BairrosModel> getAll(Pageable pageable) {
        Page<BairrosModel> list = repositorio.findAll(pageable);
        return list;
    }

    public BairrosModel find(Integer id) {
        Optional<BairrosModel> model = repositorio.findById(id);
        return model.orElse(null);
    }

    public BairrosModel insert(BairrosModel model) {
        return repositorio.save(model);
    }

    public BairrosModel insert(BairrosDTO dto) {
        BairrosModel model = new BairrosModel();
        model.setNome(dto.getNome());
        model.setCidade(dto.getCidade());
        model.setEstado(dto.getEstado());
        model.setCep_inicial(dto.getCep_inicial());
        model.setCep_final(dto.getCep_final());
        return repositorio.save(model);
    }

    public BairrosModel update(BairrosModel model) {
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

    // --- MÉTODO UPDATE USANDO DTO ---
    public BairrosModel update(Integer id, BairrosDTO dto) {
        Optional<BairrosModel> optionalModel = repositorio.findById(id);
        if (optionalModel.isPresent()) {
            BairrosModel model = optionalModel.get();
            // Atualiza os campos com os dados do DTO
            model.setNome(dto.getNome());
            model.setCidade(dto.getCidade());
            model.setEstado(dto.getEstado());
            model.setCep_inicial(dto.getCep_inicial());
            model.setCep_final(dto.getCep_final());
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