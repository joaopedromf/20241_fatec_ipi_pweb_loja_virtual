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

import com.fatec.loja.entity.ClienteEntity;
import com.fatec.loja.repository.ClienteRepository;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    ClienteRepository repository;
    
    @GetMapping("/api/clientes")
    public ResponseEntity<List<ClienteEntity>> listar(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/api/cliente/{codigo}")
    public ResponseEntity<ClienteEntity> carregar(@PathVariable int codigo){
        Optional<ClienteEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            return ResponseEntity.ok(obj.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/cliente")
    public ResponseEntity<ClienteEntity> gravar(@RequestBody ClienteEntity cliente){
        cliente.setSenha(repository.criptografarSenha(cliente.getSenha()));
        repository.save(cliente);
        return ResponseEntity.status(201).body(cliente);
    }

    @PutMapping("/api/cliente")
    public ResponseEntity<ClienteEntity> atualizar(@RequestBody ClienteEntity cliente){
        Optional<ClienteEntity> obj = repository.findById(cliente.getCodigo());
        if(obj.isPresent()){
            cliente.setSenha(repository.criptografarSenha(cliente.getSenha()));
            repository.save(cliente);
            return ResponseEntity.ok(cliente);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/cliente/{codigo}")
    public ResponseEntity<Void> remover(@PathVariable int codigo){
        Optional<ClienteEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            repository.deleteById(codigo);;
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/cliente/login")
    public ResponseEntity<ClienteEntity> fazerLogin(@RequestBody ClienteEntity cliente){
        Optional<ClienteEntity> retorno = repository.fazerLogin(cliente.getEmail(), cliente.getSenha());
        if(retorno.isPresent()){
            return ResponseEntity.ok(retorno.get());
        }
        else{
            return ResponseEntity.status(401).build();
        }
    }
}
