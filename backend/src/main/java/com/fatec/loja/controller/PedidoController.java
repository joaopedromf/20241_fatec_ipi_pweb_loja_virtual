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

import com.fatec.loja.entity.PedidoEntity;
import com.fatec.loja.repository.PedidoRepository;

@RestController
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    PedidoRepository repository;

    @GetMapping("/api/pedidos")
    public ResponseEntity<List<PedidoEntity>> listar(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/api/pedido/{codigo}")
    public ResponseEntity<PedidoEntity> carregar(@PathVariable int codigo){
        Optional<PedidoEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            return ResponseEntity.ok(obj.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/pedido")
    public ResponseEntity<PedidoEntity> gravar(@RequestBody PedidoEntity pedido){
        repository.save(pedido);
        return ResponseEntity.status(201).body(pedido);
    }

    @PutMapping("/api/pedido")
    public ResponseEntity<PedidoEntity> atualizar(@RequestBody PedidoEntity pedido){
        Optional<PedidoEntity> obj = repository.findById(pedido.getCodigo());
        if(obj.isPresent()){
            repository.save(pedido);
            return ResponseEntity.ok(pedido);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/pedido/{codigo}")
    public ResponseEntity<Void> remover(@PathVariable int codigo){
        Optional<PedidoEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            repository.deleteById(codigo);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
