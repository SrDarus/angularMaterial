export class Usuario {
    email: String;
    perfil:	number;
    rut:	String;
    nombre: String;
    apellido: String; 
    fechaNacimiento: Date;
    fechaCreacion: 	Date;   
    password: 	String;    


    constructor(
        email: String,
        perfil: number,
        rut: String,
        nombre: String,
        apellido: String,
        fechaNacimiento: Date,
        fechaCreacion: Date,
        password?: String
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
