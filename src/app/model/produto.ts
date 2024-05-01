export class Produto {
    
    public codigo: number;
    public nome: string;
    public marca: string;
    public cor: string;
    public memoriaInterna: number;
    public memoriaRam: number;
    public descritivo: string;
    public valor: number;
    public valorPromo: number;
    public destaque: number;
    public estoque: number;

    constructor(){
        this.codigo = 0;
        this.nome = "";
        this.marca = "";
        this.cor = "";
        this.memoriaInterna = 0;
        this.memoriaRam = 0;
        this.descritivo = "";
        this.valor = 0;
        this.valorPromo = 0;
        this.destaque = 0;
        this.estoque = 0;
    }
}
