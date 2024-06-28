import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './esqueci.component.html',
  styleUrl: './esqueci.component.css'
})
export class EsqueciComponent {
  public email: string = "";
  public mensagem: string = "";
  public nivelMensagem: number = 0;

  constructor(private service: ClienteService){}

  public recuperarSenha(){
    if(this.email !== ""){
      this.service.recuperarSenha(this.email).subscribe(
        (data: Cliente) => {
          if(data==null){
            this.nivelMensagem = 3;
            this.mensagem = "E-mail não encontrado.";
          }
          else{
            this.nivelMensagem = 1;
            this.mensagem = `E-mail de recuperação enviado. Senha: ${data.senha}`
          }
        },
        (error) => {
          if(error.status === 404){
            this.nivelMensagem = 3;
            this.mensagem = "E-mail não encontrado.";
          }
          else{
            this.nivelMensagem = 4;
            this.mensagem = "Ocorreu um erro, tente novamente mais tarde."
            console.log(error)
          }
        }
      );
    }
    else{
      this.nivelMensagem = 2;
      this.mensagem = "Preencha o campo abaixo."
    }
  }

  public avisoFechado(){
    this.mensagem = "";
  }
}
