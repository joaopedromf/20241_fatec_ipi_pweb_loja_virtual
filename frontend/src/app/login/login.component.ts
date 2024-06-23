import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public tipoInput: String = "password";
  public mensagem: String = "";
  public nivelMensagem: Number = 0;
  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService){
  }

  public entrar(){
    if(this.obj.email !== "" && this.obj.senha !== ""){
      this.service.login(this.obj).subscribe(
        (data: Cliente) => {
          if(data != null){
            localStorage.setItem("cliente", JSON.stringify(data));
            this.nivelMensagem = 1;
            this.mensagem = "Login efetuado com sucesso.";
            setTimeout(() => window.location.href = "./cadastro", 2500);
          }
          else{
            this.nivelMensagem = 3;
            this.mensagem = "E-mail ou senha inválidos.";
          }
        },
        (error) => {
          if(error.status === 401){
            this.nivelMensagem = 3;
            this.mensagem = "E-mail ou senha inválidos.";
          }
          else{
            this.nivelMensagem = 4;
            this.mensagem = "Ocorreu um erro, tente novamente mais tarde.";
          }
          console.log(error);
        }
      );
    }
    else{
      this.mensagem = "Preencha todos os campos."
      this.nivelMensagem = 2;
    }
  }

  public mudarVisibilidadeSenha(){
    this.tipoInput = this.tipoInput === "password" ? "text" : "password";
  }

  public avisoFechado(){
    this.mensagem = "";
  }
}
