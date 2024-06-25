import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  public lista: Item[] = [];
  public totalCesta: number = 0;
  public maximo: number = 50;

  constructor(){
    try{
      let json = localStorage.getItem("cesta");

      if(json != null){
        this.lista = JSON.parse(json);
        for(let item of this.lista){
          this.totalCesta = this.totalCesta + item.valorTotal;
        }
      }
    }
    catch(e){}
  }

  public alterarQuantidade(item: Item){
    if(item.qtd < 0){
      item.qtd = 1;
    }
    else if(item.qtd > this.maximo){
      item.qtd = this.maximo;
    }

    this.atualizarTotal(item);
    localStorage.setItem("cesta", JSON.stringify(this.lista));
  }

  public aumentarQuantidade(item: Item){
    if(item.qtd <= this.maximo - 1){
      item.qtd++;
      this.atualizarTotal(item);
      localStorage.setItem("cesta", JSON.stringify(this.lista));
    }
  }

  public diminuirQuantidade(item: Item){
    if(item.qtd < 2){
      this.atualizarCesta(item);
      this.atualizarTotal(item);
    }
    else{
      item.qtd--;
      this.atualizarTotal(item);
      localStorage.setItem("cesta", JSON.stringify(this.lista));
    }
    
  }

  public inputVazio(item: Item){
    if(item.qtd == null){
      item.qtd = 1;
      item.valorTotal = item.qtd * item.valorUnitario;
      localStorage.setItem("cesta", JSON.stringify(this.lista));
    }
    else if(item.qtd == 0){
      this.atualizarCesta(item);
    }
  }

  public removerItem(item: Item){
    item.qtd = 0;
    this.atualizarTotal(item);
    this.atualizarCesta(item);
  }

  private atualizarCesta(item: Item){
    this.lista = this.lista.filter(i => i.codigoProduto != item.codigoProduto)
    localStorage.setItem("cesta", JSON.stringify(this.lista));
  }

  private atualizarTotal(item: Item){
    item.valorTotal = item.qtd * item.valorUnitario;
    this.totalCesta = 0;
    for(let i of this.lista){
      this.totalCesta = this.totalCesta + i.valorTotal;
    }
  }

  limpar(){
    this.lista = [];
    localStorage.removeItem("cesta");
  }
}
