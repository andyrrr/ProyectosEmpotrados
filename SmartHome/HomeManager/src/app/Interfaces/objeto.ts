export interface ObjetoInterface {
    nombre:string
    estado:string
    tipo:string
}

export class Objeto implements ObjetoInterface{
    nombre!: string
    estado!: string
    tipo!: string

    constructor (nom:string, est:string, tip:string){
        this.nombre = nom
        this.estado = est
        this.tipo = tip
    }
}


