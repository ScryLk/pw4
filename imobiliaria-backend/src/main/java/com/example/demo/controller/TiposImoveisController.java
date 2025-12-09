package com.example.demo.controller;

import com.example.demo.dto.TiposImoveisDTO;
import com.example.demo.model.TiposImoveisModel;
import com.example.demo.services.TiposImoveisServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/tipos-imoveis")
public class TiposImoveisController {

    @Autowired
    private TiposImoveisServices service;

    @GetMapping
    public ResponseEntity<List<TiposImoveisModel>> getAll() {
        List<TiposImoveisModel> lista = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    @GetMapping("/tipos-page")
    public Page<TiposImoveisModel> getPosts(Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TiposImoveisModel> getById(@PathVariable Integer id) {
        TiposImoveisModel model = service.find(id);
        if (model != null) {
            return ResponseEntity.status(HttpStatus.OK).body(model);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /* @PostMapping
    public ResponseEntity<Void> create(@RequestBody TiposImoveisModel model) {
        model = service.insert(model);
        // return new ResponseEntity(model, HttpStatus.CREATED);
        URI uri =
        ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).build();
    } */

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody TiposImoveisDTO dto) {
        TiposImoveisModel model = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    /* @PutMapping("/{id}")
    public ResponseEntity<TiposImoveisModel> update(@PathVariable Integer id, @RequestBody TiposImoveisModel model) {
        model.setId(id);
        model = service.update(model);
        if (model != null) {
            return ResponseEntity.status(HttpStatus.OK).body(model);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }  */

    // --- MÉTODO UPDATE ATUALIZADO PARA USAR DTO ---
    @PutMapping("/{id}")
    public ResponseEntity<TiposImoveisModel> update(@PathVariable Integer id, @RequestBody TiposImoveisDTO dto) {
        TiposImoveisModel model = service.update(id, dto);
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