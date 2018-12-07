export class restPath {
    //public APP: string = 'http://www.a.dminute.pw/api/dminute';
    //public APP: string = 'https://dminutezuul.herokuapp.com/api/dminutems';
    //public APP: string = 'http://127.0.0.1:3333';
    public APP: string = '/api';

    /***INICIO GENERICOS***/
    public logIn: string = '/token/generate-token';
    public listUsers = '/usuario/listaUsuarios';
    public listUsersParam = '/bff/listaUsuarioFiltro';
    public listEstadoElemento = '/bff/estadoElemento';
    public listActaIdelemento = '/bff/listaActaFiltroElemento/';
    public getUser = '/usuario/user?username=';
    public usuarioGuardar = '/token/usuarioGuardar';
    public listarTipoElementoDialogo = '/listaFormulario/tiposElementoDialogo';
    /***FIN GENERICOS***/
    
    //***INICIO OPCIONES DE PROYECTO***//
    //METODO POST
    public addProyect = '/proyecto/nuevoProyecto';
    public editProyect = '/proyecto/editarProyecto';
    public delProjectById = '/proyecto/eliminarProyecto/';
    //METODO GET
    public projectById = '/proyecto/proyectoid/';
    public getProyect = '/proyecto/proyectoid?proyectoid='; 
    public listProyects = '/proyecto/listarProyectoUsuario';
    public listarMinutaProyectoById = '/bff/listarMinutaProyecto/';
    //***FIN OPCIONES DE PROYECTO***//

    //***INICIO OPCIONES DE ACTA O REUNION ***//    
    //METODO POST
    public addActa = '/acta/guardarActa'; //mismo metodo para nueva acta o editar acta
    public delActa = '/acta/eliminarActa';
    //METODO GET
    public listarReuniones = '/acta/listarActaProyecto/';
    public getMeetingById = '/acta/getActa/';
    public getAttendantList = '/acta/getUsuariosActa/';
    //***FIN OPCIONES DE ACTA O REUNION ***//    
   
    //***INICIO OPCIONES DE TEMA DE UN ACTA ***//    
    //METODO POST
    public guardarTema = '/tema/guardarTema';
    public delTema = '/tema/eliminarTema';
    //METODO GET
    public listarTema = '/tema/listarTema/'
    //***FIN OPCIONES DE TEMA DE UN ACTA ***//   

    //***INICIO OPCIONES DE ELEMENTOS DE DIALOGO DE UN ACTA ***//    
    //METODO POST
    public addElementoDialogo = '/elementoDialogo/guardarElementoDialogoTema';
    public delElementoDialogo = '/elementoDialogo/eliminarElementoDialogoTema';
    public addEstadoElementoKanban = '/bff/updateEstadoElementoKanban';
    //METODO GET
    public listarElementoDialogo = '/elementoDialogo/getElementoDialogoTema';
    //***FIN OPCIONES DE ELEMENTOS DE DIALOGO DE UN ACTA ***//    

}
