import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
  public tipoInput: String = "password";
  public mensagem: String = "";
  public nivelMensagem: Number = 0;
  public obj: Cliente = new Cliente();

  public constructor(private service: ClienteService){
    try{
      let json = localStorage.getItem("cliente");
      if(json !== null){
        this.obj = JSON.parse(json);
      }
      else{
        this.mensagem = "Você ainda não possui cadastro."
        this.nivelMensagem = 2;
      }
    }
    catch(e){}
  }

  public gravar(){
    if(this.obj.cep !== "" && this.obj.cidade !== "" && this.obj.cpf !== "" && this.obj.email !== "" && this.obj.endereco !== "" && this.obj.estado !== "" && this.obj.nome !== "" && this.obj.senha !== "" && this.obj.telefone !== ""){
      this.obj.codigo = 0;
      this.service.gravar(this.obj).subscribe(
        (data: String) => {
          this.mensagem = "Registro gravado com sucesso.";
          this.nivelMensagem = 1;
          this.limpar();
        },
        (error) => {
          this.mensagem = "Ocorreu um erro durante a gravação.";
          this.nivelMensagem = 3;
        }
      );
    }
    else{
      this.mensagem = "Preencha todos os campos obrigatórios."
      this.nivelMensagem = 2;
    }
  }

  public alterar(){
    if(this.obj.codigo > 0 && this.obj.cep !== "" && this.obj.cidade !== "" && this.obj.cpf !== "" && this.obj.email !== "" && this.obj.endereco !== "" && this.obj.estado !== "" && this.obj.nome !== "" && this.obj.senha !== "" && this.obj.telefone !== ""){
      this.service.alterar(this.obj).subscribe(
        (data: String) => {
          try{
            let json = localStorage.getItem("cliente");
            if(json !== null){
              let cliente: Cliente = JSON.parse(json);
              if(cliente.codigo == this.obj.codigo){
                localStorage.setItem("cliente", JSON.stringify(this.obj));
              }
            }
          }
          catch(e){}
          this.mensagem = "Registro alterado com sucesso.";
          this.nivelMensagem = 1;
          this.limpar();
        },
        (error) => {
          if(error.status === 404){
            this.mensagem = "Digite um código válido."
            this.nivelMensagem = 2;
          }
          else{
            this.mensagem = "Ocorreu um erro durante a alteração.";
            this.nivelMensagem = 3;
          }
        }
      );
    }
    else{
      this.mensagem = "Preencha todos os campos obrigatórios."
      this.nivelMensagem = 2;
    }
  }

  public remover(){
    if(this.obj.codigo > 0){
      this.service.remover(this.obj).subscribe(
        (data: String) => {
          try{
            let json = localStorage.getItem("cliente");
            if(json !== null){
              let cliente: Cliente = JSON.parse(json);
              if(cliente.codigo == this.obj.codigo){
                localStorage.removeItem("cliente");
              }
            }
          }
          catch(e){}
          this.mensagem = "Registro excluído com sucesso.";
          this.nivelMensagem = 1;
          this.limpar();
        },
        (error) => {
          if(error.status === 404){
            this.mensagem = "Digite um código válido."
            this.nivelMensagem = 2;
          }
          else{
            this.mensagem = "Ocorreu um erro durante a exclusão.";
            this.nivelMensagem = 3;
          }
        }
      );
    }
    else{
      this.mensagem = "Digite um código válido."
      this.nivelMensagem = 2;
    }
  }

  public carregar(){
    if(this.obj.codigo > 0){
      this.service.carregar(this.obj.codigo).subscribe(
        (data: Cliente) => {
          if(data==null){
            this.mensagem = "Registro não encontrado.";
            this.limpar();
          } 
          else {        
            this.mensagem = "";
            this.obj= data;
          }
        },
        (error) => {
          if(error.status === 404){
            this.limpar();
            this.mensagem = "Digite um código válido."
            this.nivelMensagem = 2;
          }
          else{
            this.limpar();
            this.mensagem = "Ocorreu um erro no carregamento do usuário.";
            this.nivelMensagem = 3;
          }
        }
      );
    }
    else{
      this.limpar();
      this.mensagem = "Digite um código válido."
      this.nivelMensagem = 2;
    }
  }

  public limpar(){
    this.obj.codigo = 0;
    this.obj.cep = "";
    this.obj.cidade = "";
    this.obj.complemento = "";
    this.obj.cpf = "";
    this.obj.email = "";
    this.obj.endereco = "";
    this.obj.estado = "";
    this.obj.nome = "";
    this.obj.senha = "";
    this.obj.telefone = "";
  }

  public mudarVisibilidadeSenha(){
    this.tipoInput = this.tipoInput === "password" ? "text" : "password";
  }

  public avisoFechado(){
    this.mensagem = "";
  }
}
