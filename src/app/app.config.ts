export class AppSettings {
    public static API_ENDPOINT_LOCAL:string='http://localhost:8080/';
    public static API_ENDPOINT_REMOTE:string='https://portafolio-spring-boot.herokuapp.com/';
    public static SIDENAV_CONFIG:any={
        mode: {
            side: "side",
            over: "over",
            push: "push"
        },
        hasBackdrop:{
            value:null // true o false
        }
    }
 }