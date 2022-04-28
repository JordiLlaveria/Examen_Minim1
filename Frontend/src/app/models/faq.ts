import { User } from "./user";

export class Faq {
    _id?: string;
    titulopregunta: string;
    pregunta: string;
    respuesta: string;
    fechapregunta?: Date;
    persona: User;

    constructor(titulopregunta: string, pregunta: string, respuesta: string, persona:User, fechapregunta:Date) {
        this.titulopregunta = titulopregunta;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.fechapregunta = fechapregunta;
        this.persona = persona;
    }   
}