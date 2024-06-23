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

import com.fatec.loja.entity.ProdutoEntity;
import com.fatec.loja.repository.ProdutoRepository;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    @Autowired
    ProdutoRepository repository;

    @GetMapping("/api/produtos")
    public ResponseEntity<List<ProdutoEntity>> listar(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/api/produto/{codigo}")
    public ResponseEntity<ProdutoEntity> carregar(@PathVariable int codigo){
        Optional<ProdutoEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            return ResponseEntity.ok(obj.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/produto")
    public ResponseEntity<ProdutoEntity> gravar(@RequestBody ProdutoEntity produto){
        produto.setNome();
        repository.save(produto);
        return ResponseEntity.status(201).body(produto);
    }

    @PostMapping("/api/produtos")
    public ResponseEntity<List<ProdutoEntity>> gravarLista(@RequestBody List<ProdutoEntity> produtos){
        for(ProdutoEntity produto : produtos){
            produto.setNome();
        }
        repository.saveAll(produtos);
        return ResponseEntity.status(201).body(produtos);
    }

    @PutMapping("/api/produto")
    public ResponseEntity<ProdutoEntity> atualizar(@RequestBody ProdutoEntity produto){
        Optional<ProdutoEntity> obj = repository.findById(produto.getCodigo());
        if(obj.isPresent()){
            produto.setNome();
            repository.save(produto);
            return ResponseEntity.ok(produto);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/produto/{codigo}")
    public ResponseEntity<Void> remover(@PathVariable int codigo){
        Optional<ProdutoEntity> obj = repository.findById(codigo);
        if(obj.isPresent()){
            repository.deleteById(codigo);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/produto/busca/{pesquisa}")
    public ResponseEntity<List<ProdutoEntity>> buscar(@PathVariable String pesquisa){
        String aux = '%'+ pesquisa +'%';
        List<ProdutoEntity> lista = repository.buscar(aux);
        return ResponseEntity.ok(lista);
    }
}
