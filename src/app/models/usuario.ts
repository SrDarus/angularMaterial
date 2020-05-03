export class Usuario {
    rut:string
    nombre:string
    edad: number
    usuario:string
    fecha:string
    perfil:number

    constructor(rut:string,
        nombre:string,
        edad:number,
        usuario:string,
        fecha:string,
        perfil:number){
            this.rut = rut
            this.nombre = nombre
            this.edad = edad
            this.usuario = usuario
            this.fecha = fecha
            this.perfil = perfil        
    }
}
