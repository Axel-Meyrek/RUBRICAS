/* VARIABLES Y COMPONENTES */
import RubricaReciente from "../components/RubricaReciente.js";

import Grupo from "../components/Grupo.js";

import Estudiante from "../components/Estudiante.js";

let administrador = {};

let rubricas = [];

let profesores = [];

let grupos = [];

/* FUNCIONES */

const showResumenData = async () => {

    document.querySelector('#nombreNav').textContent = administrador.nombre;

    document.querySelector('#emailNav').textContent = administrador.email;
    
    document.querySelector('#nombreAdminDashboard').textContent = administrador.nombre;

    rubricas = await recuperarRubricas();

    document.querySelector('#rubricasTotal').textContent = rubricas.length;
    
    grupos = await recuperarGrupos();
    
    document.querySelector('#gruposTotal').textContent = grupos.length;
    
    profesores = await recuperarProfesores();
    
    document.querySelector('#profesoresTotal').textContent = profesores.length;

    renderRubricasRecientes();

    renderGrupos();

}

const recuperarStorach = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    administrador = data;
    console.log(administrador)
}

const recuperarRubricas = async () => {
    const URL = '../api/getRubricas.php';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

const recuperarGrupos = async () => {
    const URL = '../api/getGrupos.php';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

const recuperarProfesores = async () => {
    const URL = '../api/getProfesores.php';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

const recuperarEstudiantes = async (idGrupo) => {
    const URL = '../api/getEstudiantes.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({id_grupo: idGrupo }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const renderRubricasRecientes = () => {
    const $resumenRubricaContainer = document.querySelector('#resumenRubricaContainer');
    console.log(rubricas);

    rubricas.slice(0, 2).forEach(rubrica => {
        const {titulo, fecha, id} = rubrica;
        $resumenRubricaContainer.innerHTML += RubricaReciente(titulo, fecha, id);
    });
}

const renderGrupos = () => {
    const $containerGrupos = document.querySelector('#containerGrupos');
    $containerGrupos.innerHTML = '';
    
    grupos.forEach(grupo => {
        const {id, nombre} = grupo;
        $containerGrupos.innerHTML += Grupo(id, nombre);
    })
}

window.renderEstudiantes = async (idGrupo) => {
    const estudiantes = await recuperarEstudiantes(idGrupo);
    const $containerEstudiantes = document.querySelector('#containerEstudiantes');
    $containerEstudiantes.innerHTML = '';
    estudiantes.forEach(estudiante => {
        const {nombre} = estudiante;
        $containerEstudiantes.innerHTML += Estudiante(nombre);
    });
}


/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {
    
    recuperarStorach();

    showResumenData();
}); 