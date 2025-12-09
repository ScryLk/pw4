package com.example.demo.controller;

import com.example.demo.dto.BairrosDTO;
import com.example.demo.model.BairrosModel;
import com.example.demo.model.ImoveisModel;
import com.example.demo.services.BairrosServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/bairros")
public class BairrosController {

    @Autowired
    private BairrosServices service;

    @GetMapping
    public ResponseEntity<List<BairrosModel>> getAll() {
        List<BairrosModel> lista = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    @GetMapping("/bairros-page")
    public Page<BairrosModel> getPosts(Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BairrosModel> getById(@PathVariable Integer id) {
        BairrosModel model = service.find(id);
        if (model != null) {
            return ResponseEntity.status(HttpStatus.OK).body(model);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /* @PostMapping
    public ResponseEntity<Void> create(@RequestBody BairrosModel model) {
        model = service.insert(model);
        // return new ResponseEntity(model, HttpStatus.CREATED);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).build();
    } */

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody BairrosDTO dto) {
        BairrosModel model = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    /* @PutMapping("/{id}")
    public ResponseEntity<BairrosModel> update(@PathVariable Integer id, @RequestBody BairrosModel model) {
        model.setId(id);
        model = service.update(model);
        if (model != null) {
            return ResponseEntity.status(HttpStatus.OK).body(model);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    } */

    // --- MÉTODO UPDATE ATUALIZADO PARA USAR DTO ---
    @PutMapping("/{id}")
    public ResponseEntity<BairrosModel> update(@PathVariable Integer id, @RequestBody BairrosDTO dto) {
        // O service deve ter um método para atualizar usando DTO
        BairrosModel model = service.update(id, dto);
        if (model != null) {
            return ResponseEntity.status(HttpStatus.OK).body(model);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        boolean deleted = service.delete(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}