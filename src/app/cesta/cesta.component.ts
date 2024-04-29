import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../model/item';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  public lista: Item[] = [];
  public totalCesta: number = 0;

  constructor(){
    try{
      let json = localStorage.getItem("cesta");

      if(json != null){
        this.lista = JSON.parse(json);
        for(let item of this.lista){
          this.totalCesta = this.totalCesta + item.total;
        }
      }
    }
    catch(e){}
  }

  limpar(){
    this.lista = [];
    localStorage.removeItem("cesta");
  }
}
