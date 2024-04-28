import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public lista: Produto[] = [
    {codigo: 1, nome: "Produto 1", descritivo: "", valor: 20.99, valorPromo: 15.99, destaque: 1, estoque: 50},
    {codigo: 2, nome: "Produto 2", descritivo: "", valor: 8, valorPromo: 10.99, destaque: 1, estoque: 0},
    {codigo: 3, nome: "Produto 3", descritivo: "", valor: 1000.95, valorPromo: 10.99, destaque: 1, estoque: 34},
    {codigo: 4, nome: "Produto 4", descritivo: "", valor: 5.90, valorPromo: 10.99, destaque: 1, estoque: 22},
    {codigo: 5, nome: "Produto 5", descritivo: "", valor: 53.50, valorPromo: 10.99, destaque: 1, estoque: 0},
  ]
}
