import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ProdutoService } from '../service/produto.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  public mensagem: string = "";
  public nivelMensagem: Number = 0;
  public pesquisa: string = "";
  public lista: Produto[] = [];

  public constructor(private service: ProdutoService){
    try{
      let json = localStorage.getItem("pesquisa");

      if(json == null){
        this.nivelMensagem = 2;
        this.mensagem = "Produtos não encontrados.";
      }
      else{
        this.pesquisa = JSON.parse(json);
        this.service.pesquisar(this.pesquisa).subscribe(
          (data: Produto[]) => {
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
    }
    catch(e){}
  }

  public detalhe(produto: Produto){
    localStorage.setItem("detalhe", JSON.stringify(produto.codigo));
    window.location.href="./detalhe";
  }

  public comprar(produto: Produto){
    let itemCesta: Item = new Item();
    itemCesta.codigoProduto = produto.codigo;
    itemCesta.nomeProduto = produto.nome;
    itemCesta.quantidade = 1;
    if(produto.valor<=produto.valorPromo || produto.valorPromo==0){
      itemCesta.valorUnitario = produto.valor;
      itemCesta.valorTotal = produto.valor;
    }
    else{
      itemCesta.valorUnitario = produto.valorPromo;
      itemCesta.valorTotal = produto.valorPromo;
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
