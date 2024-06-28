import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../model/item';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent {
  public mensagem: String = "";
  public nivelMensagem: Number = 0;
  public obj : Produto = new Produto();
  
  public constructor(private service: ProdutoService){
    try{
      let codigo = localStorage.getItem("detalhe");
      if(codigo == null){
        this.nivelMensagem = 2;
        this.mensagem = "Produto não encontrado.";
      }
      else{
        this.service.carregar(codigo).subscribe(
          (data: Produto) => {
            if(data == null){
              this.nivelMensagem = 2;
              this.mensagem = "Produto não encontrado.";
            }
            else{
              this.obj = data;
            }
          },
          (error) => {
            this.nivelMensagem = 3;
            this.mensagem = "Ocorreu um erro no carregamento dos detalhes.";
          }
        )
      }
    }
    catch(e){}
  }

  public comprar(){
    let itemCesta: Item = new Item();
    itemCesta.codigoProduto = this.obj.codigo;
    itemCesta.nomeProduto = this.obj.nome;
    itemCesta.quantidade = 1;
    if(this.obj.valor<=this.obj.valorPromo || this.obj.valorPromo==0){
      itemCesta.valorUnitario = this.obj.valor;
      itemCesta.valorTotal = this.obj.valor;
    }
    else{
      itemCesta.valorUnitario = this.obj.valorPromo;
      itemCesta.valorTotal = this.obj.valorPromo;
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
        if(lista[indice].quantidade < 50){
          lista[indice].quantidade++;
          lista[indice].valorTotal = lista[indice].valorUnitario * lista[indice].quantidade;
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
