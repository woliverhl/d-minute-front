import { TemaActa } from "./tema";
import { ElementoDialogo } from "./ElementoDialogo";

export class Reunion {
    constructor(){}
    public fecha: String;
    public resumen: String;
    public horaInicio: String;
    public horaFin: String;
    public correlativo: Number;
    public estado: String;
    public proyectoId : Number;
    public usuarioActa : Array<Object>;
    public temaActa: TemaActa[];
    public tareaPendiente: ElementoDialogo[];
    public actaId: Number;
    public username: string; //Secretario
}
