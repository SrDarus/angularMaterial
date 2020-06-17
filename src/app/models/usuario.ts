import { Role } from './role';

export class Usuario {
    email: string;
    role: Array<String>=[];
    rut:	string;
    nombre: string;
    apellido: string; 
    fechaNacimiento: string;
    fechaCreacion: 	string;   
    foto: string;
    password: 	string;    
    enabled: boolean;

    constructor(
        email: string,
        roles: Array<String>,
        rut: string,
        nombre: string,
        apellido: string,
        fechaNacimiento: string,
        fechaCreacion: string,
        foto: string,
        password?: string
    ){
        this.email = email
        this.role = roles
        this.rut = rut
        this.nombre = nombre
        this.apellido = apellido
        this.fechaNacimiento = fechaNacimiento
        this.fechaCreacion = fechaCreacion
        this.foto = foto
        this.password = password
    }
}
