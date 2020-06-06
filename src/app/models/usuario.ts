import { Perfil } from './perfil';

export class Usuario {
    email: string;
    perfil:	Perfil;
    rut:	string;
    nombre: string;
    apellido: string; 
    fechaNacimiento: string;
    fechaCreacion: 	string;   
    foto: string;
    password: 	string;    


    constructor(
        email: string,
        perfil: Perfil,
        rut: string,
        nombre: string,
        apellido: string,
        fechaNacimiento: string,
        fechaCreacion: string,
        foto: string,
        password?: string
    ){
        this.email = email
        this.perfil = perfil
        this.rut = rut
        this.nombre = nombre
        this.apellido = apellido
        this.fechaNacimiento = fechaNacimiento
        this.fechaCreacion = fechaCreacion
        this.foto = foto
        this.password = password
    }
}
