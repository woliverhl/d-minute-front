import { TemaActa } from "./tema";
import { Reunion } from "./reunion";
export class Project {
    constructor(){}
    public nombre: string;
    public descripcion: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public usuariosNuevoProyecto: Array<Object>;
    public proyectoId: Number;
    public meet: Reunion;
}
