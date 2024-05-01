import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../model/item';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent {
  public obj : Produto = new Produto();
  
  constructor(){
    try{
      let json = localStorage.getItem("detalhe");

      if(json == null){
        window.location.href = "./vitrine";
      }
      else{
        this.obj = JSON.parse(json);
      }
    }
    catch(e){}
  }

  public comprar(){
    let itemCesta: Item = new Item();
    itemCesta.codigoProduto = this.obj.codigo;
    itemCesta.nomeProduto = this.obj.nome;
    itemCesta.qtd = 1;
    if(this.obj.valor<=this.obj.valorPromo || this.obj.valorPromo==0){
      itemCesta.valor = this.obj.valor;
      itemCesta.total = this.obj.valor;
    }
    else{
      itemCesta.valor = this.obj.valorPromo;
      itemCesta.total = this.obj.valorPromo;
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
