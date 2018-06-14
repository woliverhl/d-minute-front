export class restPath {
    //public APP: string = '/api';
    public APP: string = 'https://dminutems.herokuapp.com';
    public logIn: string = '/token/generate-token';
    public listProyects = '/proyecto/listarProyectoUsuario';
    public listUsers = '/usuario/listaUsuarios';
    public addProyect = '/proyecto/nuevoProyecto';
    public projectById = '/proyecto/proyectoid/';
    public guardarReunion = '/acta/guardarActa';
    public listarReuniones = '/acta/listarActaProyecto/';
    public getUser = '/usuario/user?username='
}
