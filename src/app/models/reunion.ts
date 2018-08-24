import { TemaActa } from "./tema";
import { UsuarioActa } from "./usuarioActa";
import { ElementoDialogo } from "./ElementoDialogo";

export class Reunion {
    constructor(){}
    public fecha: Date;
    public resumen: String;
    public horaInicio: String;
    public horaFin: String;
    public correlativo: Number;
    public estado: String;
    public proyectoId : Number;
    public usuarioActa : UsuarioActa[];
    public temaActa: TemaActa[];
    public tareaPendiente: ElementoDialogo[];
    public actaId: Number;
}
