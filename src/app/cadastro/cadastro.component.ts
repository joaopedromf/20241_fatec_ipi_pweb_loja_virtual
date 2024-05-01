import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
  public obj: Cliente = new Cliente(); 

  public gravar(){
    console.log(JSON.stringify(this.obj));   
    localStorage.setItem("cadastro", JSON.stringify(this.obj));
  }
}
