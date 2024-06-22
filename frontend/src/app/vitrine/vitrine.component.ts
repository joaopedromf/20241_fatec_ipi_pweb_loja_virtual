import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ProdutoService } from '../service/produto.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public mensagem: String;
  public nivelMensagem: Number = 0;
  public lista: Produto[] = [];

  public constructor(private service: ProdutoService){
    this.mensagem = "";
    this.service.listar().subscribe(
      (data) => {
        if(data==null){
          this.nivelMensagem = 2;
          this.mensagem = "Produtos não encontrados.";
        }
        else{
          this.lista = data;
        }
      },
      (error) => {
        this.nivelMensagem = 3;
        this.mensagem = "Ocorreu um erro no carregamento da vitrine.";
      }
    )
  }

  public detalhe(produto: Produto){
    localStorage.setItem("detalhe", JSON.stringify(produto.codigo));
    window.location.href="./detalhe";
  }

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
      let indice: number = lista.findIndex(i => i.codigoProduto == itemCesta.codigoProduto);
      
      if(indice == -1){
        lista.push(itemCesta)
      }
      else{
        if(lista[indice].qtd < 50){
          lista[indice].qtd++;
          lista[indice].total = lista[indice].valor * lista[indice].qtd;
        }
      }
    }

    localStorage.setItem("cesta", JSON.stringify(lista));
    window.location.href="./cesta";
  }

  public avisoFechado(){
    this.mensagem = "";
  }
}