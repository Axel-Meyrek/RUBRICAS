/* VARIABLES Y COMPONENTES */
import RubricaReciente from "../components/RubricaReciente.js";

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

const renderRubricasRecientes = () => {
    const $resumenRubricaContainer = document.querySelector('#resumenRubricaContainer');
    console.log(rubricas);

    rubricas.slice(0, 2).forEach(rubrica => {
        const {titulo, fecha, id} = rubrica;
        $resumenRubricaContainer.innerHTML += RubricaReciente(titulo, fecha, id);
    });
}


/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {
    
    recuperarStorach();

    showResumenData();
}); 