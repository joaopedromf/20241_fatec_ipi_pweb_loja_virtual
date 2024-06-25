package com.fatec.loja.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.loja.entity.ItemEntity;
import com.fatec.loja.repository.ItemRepository;

@RestController
@CrossOrigin(origins = "*")
public class ItemController {
    
    @Autowired
    ItemRepository repository;

    @GetMapping("/api/pedido/{codigo}/itens")
    public ResponseEntity<List<ItemEntity>> listar(@PathVariable(name = "codigo") int codigoPedido){
        List<ItemEntity> itens = repository.findItems(codigoPedido);
        if(!itens.isEmpty()){
            return ResponseEntity.ok(itens);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/item/{codigo}")
    public ResponseEntity<ItemEntity> carregar(@PathVariable int codigo){
        Optional<ItemEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            return ResponseEntity.ok(obj.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/item")
    public ResponseEntity<ItemEntity> gravar(@RequestBody ItemEntity item){
        repository.save(item);
        return ResponseEntity.status(201).body(item);
    }

    @PostMapping("/api/itens")
    public ResponseEntity<List<ItemEntity>> gravarLista(@RequestBody List<ItemEntity> lista){
        repository.saveAll(lista);
        return ResponseEntity.status(201).body(lista);
    }

    @PutMapping("/api/item")
    public ResponseEntity<ItemEntity> atualizar(@RequestBody ItemEntity item){
        Optional<ItemEntity> obj = repository.findById(item.getCodigo());
        if(obj.isPresent()){
            repository.save(item);
            return ResponseEntity.ok(item);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/item/{codigo}")
    public ResponseEntity<Void> remover(@PathVariable int codigo){
        Optional<ItemEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            repository.deleteById(codigo);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
