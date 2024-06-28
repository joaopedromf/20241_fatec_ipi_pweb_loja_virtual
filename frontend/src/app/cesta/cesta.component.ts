import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Cliente } from '../model/cliente';
import { Pedido } from '../model/pedido';
import { PedidoService } from '../service/pedido.service';
import { ItemService } from '../service/item.service';

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
  public mensagem: String = "";
  public nivelMensagem: number = 0;

  constructor(private pedidoService: PedidoService, private itemService: ItemService){
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

  public gravarPedido(){
    let json = localStorage.getItem("cliente");
    if(json == null){
      this.nivelMensagem = 2;
      this.mensagem = " Você ainda não possui cadastro. Cadastre-se para fechar o pedido."
    }
    else{
      let cliente: Cliente = JSON.parse(json);
      let pedido: Pedido = new Pedido();
      pedido.codigoCliente = cliente.codigo;
      pedido.total = this.totalCesta;
      pedido.status = "Pendente";
      pedido.entrega = "Normal";
      pedido.dataPedido = new Date().toISOString().split('T')[0];
      this.pedidoService.gravar(pedido).subscribe(
        (data: Pedido) => {
          this.lista.forEach(item => item.codigoPedido = data.codigo);
          this.itemService.gravarLista(this.lista).subscribe(
            (data: Item[]) => {
              this.nivelMensagem = 1;
              this.mensagem = "Pedido efetuado com sucesso.";
              this.limpar();
            },
            (error) => {
              this.nivelMensagem = 4;
              this.mensagem = "Ocorreu um erro durante a gravação dos itens do pedido."
            }
          );
        },
        (error) => {
          this.nivelMensagem = 4;
          this.mensagem = "Ocorreu um erro durante a gravação do pedido.";
        }
      );
    }
  }

  public alterarQuantidade(item: Item){
    if(item.quantidade < 0){
      item.quantidade = 1;
    }
    else if(item.quantidade > this.maximo){
      item.quantidade = this.maximo;
    }

    this.atualizarTotal(item);
    localStorage.setItem("cesta", JSON.stringify(this.lista));
  }

  public aumentarQuantidade(item: Item){
    if(item.quantidade <= this.maximo - 1){
      item.quantidade++;
      this.atualizarTotal(item);
      localStorage.setItem("cesta", JSON.stringify(this.lista));
    }
  }

  public diminuirQuantidade(item: Item){
    if(item.quantidade < 2){
      this.atualizarCesta(item);
      this.atualizarTotal(item);
    }
    else{
      item.quantidade--;
      this.atualizarTotal(item);
      localStorage.setItem("cesta", JSON.stringify(this.lista));
    }
    
  }

  public inputVazio(item: Item){
    if(item.quantidade == null){
      item.quantidade = 1;
      item.valorTotal = item.quantidade * item.valorUnitario;
      localStorage.setItem("cesta", JSON.stringify(this.lista));
    }
    else if(item.quantidade == 0){
      this.atualizarCesta(item);
    }
  }

  public removerItem(item: Item){
    item.quantidade = 0;
    this.atualizarTotal(item);
    this.atualizarCesta(item);
  }

  private atualizarCesta(item: Item){
    this.lista = this.lista.filter(i => i.codigoProduto != item.codigoProduto)
    localStorage.setItem("cesta", JSON.stringify(this.lista));
  }

  private atualizarTotal(item: Item){
    item.valorTotal = item.quantidade * item.valorUnitario;
    this.totalCesta = 0;
    for(let i of this.lista){
      this.totalCesta = this.totalCesta + i.valorTotal;
    }
  }

  limpar(){
    this.lista = [];
    localStorage.removeItem("cesta");
  }

  public avisoFechado(){
    this.mensagem = "";
  }
}
