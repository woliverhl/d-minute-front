import { Project } from "./project";
import { Reunion } from "./reunion";
import { ElementoDialogo } from "./ElementoDialogo";
export class ActaDialogica {
    public proyectoDto: Project;
    public listaActa: Reunion [];
    public actaDto: Reunion;
    public kanbanTareasTodo: ElementoDialogo[];
    public kanbanTareasDoing: ElementoDialogo[];
    public kanbanTareasDone: ElementoDialogo[];

}
