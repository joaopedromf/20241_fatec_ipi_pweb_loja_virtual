import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}

  public gravar(obj: Item): string{
    let mensagem = "";
    this.http.post<Item>("http://localhost:8090/api/item", obj).subscribe({
      next: data => {
        mensagem = "Registro salvo com sucesso!";
      },
      error: error => {
        console.log(error);
        mensagem = "Ocorreu um erro durante a gravação!";
      }
    });
    return mensagem;
  }

  public gravarLista(lista: Item[]): Observable<Item[]>{
    return this.http.post<Item[]>("http://localhost:8090/api/itens", lista);
  }

  public alterar(obj: Item): string{
    let mensagem = "";
    this.http.put<String>("http://localhost:8090/api/item", obj).subscribe({
      next: data => {
        mensagem = "Registro alterado com sucesso!";
      },
      error: error => {
        console.log(error);
        mensagem = "Ocorreu um erro durante a alteração!";
      }
    });
    return mensagem;
  }

  public remover(obj: Item): string{
    let mensagem = "";
    this.http.delete<String>("http://localhost:8090/api/item/" + obj.codigo).subscribe({
      next: data => {
        mensagem = "Registro removido com sucesso!";
      },
      error: error => {
        console.log(error);
        mensagem = "Ocorreu um erro durante a remoção!";
      }
    });
    return mensagem;
  }

  public carregar(codigo: string): Observable<Item>{
    return this.http.get<Item>("http://localhost:8090/api/item/" + codigo);
  }

  public listar(codigoPedido: string): Observable<Item[]>{
    return this.http.get<Item[]>("http://localhost:8090/api/pedido/" + codigoPedido + "/itens");
  }
}
