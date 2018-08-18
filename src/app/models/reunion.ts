import { TemaActa } from "./tema";
import { UsuarioActa } from "./usuarioActa";

export class Reunion {
    constructor(){}
    public fecha: Date;
    public resumen: String;
    public correlativo: Number;
    public estado: String;
    public proyectoId : Number;
    public usuarioActa : UsuarioActa[];
    public temaActa: TemaActa[];
    public actaId: Number;
}
