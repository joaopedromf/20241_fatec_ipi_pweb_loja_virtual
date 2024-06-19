export class Produto {
    
    public codigo: number;
    public nome: string;
    public marca: string;
    public modelo: string;
    public cor: string;
    public memoriaInterna: number;
    public memoriaRam: number;
    public tela: number;
    public descritivo: string;
    public valor: number;
    public valorPromo: number;
    public destaque: boolean;
    public estoque: number;

    constructor(){
        this.codigo = 0;
        this.nome = "";
        this.marca = "";
        this.modelo = "";
        this.cor = "";
        this.memoriaInterna = 0;
        this.memoriaRam = 0;
        this.tela = 0.0;
        this.descritivo = "";
        this.valor = 0;
        this.valorPromo = 0;
        this.destaque = false;
        this.estoque = 0;
    }
}
