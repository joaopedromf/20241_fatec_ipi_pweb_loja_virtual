import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public lista: Produto[] = [
    {codigo: 1, nome: "Produto 1", descritivo: "", valor: 20.99, valorPromo: 15.99, destaque: 1, estoque: 50},
    {codigo: 2, nome: "Produto 2", descritivo: "", valor: 8, valorPromo: 0, destaque: 1, estoque: 0},
    {codigo: 3, nome: "Produto 3", descritivo: "", valor: 1000.95, valorPromo: 10.99, destaque: 1, estoque: 34},
    {codigo: 4, nome: "Produto 4", descritivo: "", valor: 5.90, valorPromo: 0, destaque: 1, estoque: 22},
    {codigo: 5, nome: "Produto 5", descritivo: "", valor: 53.50, valorPromo: 0, destaque: 1, estoque: 0},
  ];

  public comprar(produto: Produto){
    let itemCesta: Item = new Item();
    itemCesta.codigoProduto = produto.codigo;
    itemCesta.nomeProduto = produto.nome;
    itemCesta.qtd = 1;
    if(produto.valor<=produto.valorPromo || produto.valorPromo==0){
      itemCesta.valor = produto.valor;
      itemCesta.total = produto.valor;
    }
    else{
      itemCesta.valor = produto.valorPromo;
      itemCesta.total = produto.valorPromo;
    }

    let lista: Item[] = [];
    let json = localStorage.getItem("cesta");

    if(json == null){
      lista.push(itemCesta);
      console.log(JSON.stringify(lista));
    }
    else{
      lista = JSON.parse(json);
      lista.push(itemCesta)
    }

    localStorage.setItem("cesta", JSON.stringify(lista));
    window.location.href="./cesta";
  }
}