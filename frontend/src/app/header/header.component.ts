import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public pesquisa: string = "";

  public pesquisar(pesquisa: string){
    
    if(pesquisa != null && pesquisa != ""){
      localStorage.setItem("pesquisa", JSON.stringify(pesquisa));
      window.location.href="./pesquisa";
    }
  }
}
