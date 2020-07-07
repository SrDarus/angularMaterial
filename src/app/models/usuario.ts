
export class Usuario {
    email: string;
    role: Array<String>=[];
    rut:	string;
    nombre: string;
    apellido: string; 
    fechaNacimiento: string;
    fechaCreacion: 	string;   
    foto: string;
    enabled: boolean;
    password: 	string;    

    constructor(
        email: string,
        roles: Array<String>,
        rut: string,
        nombre: string,
        apellido: string,
        fechaNacimiento: string,
        fechaCreacion: string,
        foto: string,
        enabled: boolean,
        password?: string,
    ){
        this.email = email
        this.role = roles
        this.rut = rut
        this.nombre = nombre
        this.apellido = apellido
        this.fechaNacimiento = fechaNacimiento
        this.fechaCreacion = fechaCreacion
        this.foto = foto
        this.enabled = enabled
        this.password = password
    }
}
