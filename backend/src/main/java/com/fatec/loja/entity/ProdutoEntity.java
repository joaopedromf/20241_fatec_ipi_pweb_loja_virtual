package com.fatec.loja.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto")
public class ProdutoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;
    private String nome;
    private String marca;
    private String modelo;
    private String cor;
    private int memoriaInterna;
    private int memoriaRam;
    private double tela;
    @Column(length = 5000)
    private String descritivo;
    private double valor;
    private double valorPromo;
    private boolean destaque;
    private int estoque;
    
    public ProdutoEntity() {
    }

    public ProdutoEntity(int codigo, String marca, String modelo, String cor, int memoriaInterna, int memoriaRam, double tela, String descritivo, double valor, double valorPromo, boolean destaque, int estoque){
        this.codigo = codigo;
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.memoriaInterna = memoriaInterna;
        this.memoriaRam = memoriaRam;
        this.tela = tela;
        this.descritivo = descritivo;
        this.valor = valor;
        this.valorPromo = valorPromo;
        this.destaque = destaque;
        this.estoque = estoque;
        setNome();
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome() {
        nome = marca + " " + modelo + " " +  memoriaInterna + "GB " + cor;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public int getMemoriaInterna() {
        return memoriaInterna;
    }

    public void setMemoriaInterna(int memoriaInterna) {
        this.memoriaInterna = memoriaInterna;
    }

    public int getMemoriaRam() {
        return memoriaRam;
    }

    public void setMemoriaRam(int memoriaRam) {
        this.memoriaRam = memoriaRam;
    }

    public double getTela() {
        return tela;
    }

    public void setTela(double tela) {
        this.tela = tela;
    }

    public String getDescritivo() {
        return descritivo;
    }

    public void setDescritivo(String descritivo) {
        this.descritivo = descritivo;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public double getValorPromo() {
        return valorPromo;
    }

    public void setValorPromo(double valorPromo) {
        this.valorPromo = valorPromo;
    }

    public boolean isDestaque() {
        return destaque;
    }

    public void setDestaque(boolean destaque) {
        this.destaque = destaque;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
    }
}