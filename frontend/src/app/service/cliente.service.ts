import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  public gravar(obj: Cliente): Observable<String>{
    return this.http.post<String>("http://localhost:8090/api/cliente", obj);
  }

  public alterar(obj: Cliente): Observable<String>{
    return this.http.put<String>("http://localhost:8090/api/cliente", obj)
  }

  public remover(obj: Cliente): Observable<String>{
    return this.http.delete<String>("http://localhost:8090/api/cliente/" + obj.codigo);
  }

  public carregar(codigo: number): Observable<Cliente>{
    return this.http.get<Cliente>("http://localhost:8090/api/cliente/" + codigo);
  }

  public listar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>("http://localhost:8090/api/clientes");
  }

  public login(obj: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>("http://localhost:8090/api/cliente/login", obj);
  }
}
