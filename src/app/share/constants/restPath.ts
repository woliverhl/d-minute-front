export class restPath {
    //public APP: string = 'http://www.a.dminute.pw/api/dminute';
    //public APP: string = 'https://dminutezuul.herokuapp.com/api/dminutems';
    //public APP: string = 'https://dminuteapi.herokuapp.com';
    public APP: string = '/api';
    public logIn: string = '/token/generate-token';
    public listProyects = '/proyecto/listarProyectoUsuario';
    public listUsers = '/usuario/listaUsuarios';
    public addProyect = '/proyecto/nuevoProyecto';
    public addActa = '/acta/guardarActa';
    public projectById = '/proyecto/proyectoid/';
    public guardarReunion = '/acta/guardarActa';
    public listarReuniones = '/acta/listarActaProyecto/';
    public getUser = '/usuario/user?username=';
    public getAttendantList = '/acta/getUsuariosActa/';
    public getMeetingById = '/acta/getActa/';
    public usuarioGuardar = '/token/usuarioGuardar';
    public guardarTema = '/tema/guardarTema';
    public listarTema = '/tema/listarTema/'
}
