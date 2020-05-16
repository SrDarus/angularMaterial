export class Usuario {
    email: string;
    perfil:	number;
    rut:	string;
    nombre: string;
    apellido: string; 
    fechaNacimiento: string;
    fechaCreacion: 	string;   
    password: 	string;    


    constructor(
        email: string,
        perfil: number,
        rut: string,
        nombre: string,
        apellido: string,
        fechaNacimiento: string,
        fechaCreacion: string,
        password?: string
    ){
        this.email = email
        this.perfil = perfil
        this.rut = rut
        this.nombre = nombre
        this.apellido = apellido
        this.fechaNacimiento = fechaNacimiento
        this.fechaCreacion = fechaCreacion
        this.password = password
    }
}
