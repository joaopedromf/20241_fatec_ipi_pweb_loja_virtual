import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) {}

  public gravar(obj: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>("http://localhost:8090/api/pedido", obj);
  }

  public alterar(obj: Pedido): Observable<String>{
    return this.http.put<String>("http://localhost:8090/api/pedido", obj)
  }

  public remover(obj: Pedido): Observable<String>{
    return this.http.delete<String>("http://localhost:8090/api/pedido/" + obj.codigo);
  }

  public carregar(codigo: number): Observable<Pedido>{
    return this.http.get<Pedido>("http://localhost:8090/api/pedido/" + codigo);
  }

  public listar(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>("http://localhost:8090/api/pedidos");
  }
}
