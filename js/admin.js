/* VARIABLES Y COMPONENTES */
import RubricaReciente from "../components/RubricaReciente.js";

import Grupo from "../components/Grupo.js";

import Estudiante from "../components/Estudiante.js";

import Rubrica from "../components/Rubrica.js";

import Criterio from "../components/Criterio.js";

import CriterioEditable from "../components/CriterioEditable.js";

let administrador = {};

let rubricas = [];

let profesores = [];

let grupos = [];

let gruposSeleccionados = [];

const $selectGrupos = document.querySelector('#selectGrupos');

const $btnAddCriterio = document.querySelector('#btnAddCriterio');

const $inputAutocompleteGrupos = document.querySelector('#inputAutocompleteGrupos');

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

    renderRubricas();

}

const recuperarStorach = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    administrador = data;
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

const recuperarCriterios = async (idRubrica) => {
    const URL = '../api/getCriterios.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ id_rubrica: idRubrica }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const recuperarGruposConRubricaAsignada = async (idRubrica) => {
    const URL = '../api/gruposConRubricaAsignada.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ id_rubrica: idRubrica }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const renderRubricasRecientes = () => {
    const $resumenRubricaContainer = document.querySelector('#resumenRubricaContainer');

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

const renderRubricas = () => {
    const $containerRubricas = document.querySelector('#containerRubricas');
    $containerRubricas.innerHTML = '';

    rubricas.forEach(rubrica => {
        const {titulo, descripcion, fecha, id} = rubrica;
        $containerRubricas.innerHTML += Rubrica(titulo, descripcion, fecha, id);
    });
}

const renderOptionsGrupos = async (idRubrica) => {
    const grupos = await recuperarGruposConRubricaAsignada(idRubrica);
    $selectGrupos.innerHTML = '<option disabled selected value="">Selecciona un grupo</option>';
    grupos.forEach(grupo => {
        const {id, nombre} = grupo;
        $selectGrupos.innerHTML += `<option value="${id}">${nombre}</option>`;
    });
}

const renderOptionsEstudiantes = async () => {
    const $selectEstudiantes = document.querySelector('#selectEstudiantes');
    
    if($selectGrupos.value === '') {
        $selectEstudiantes.innerHTML = '<option disabled selected value="">Selecciona un estudiante</option>';
        return;
    }

    const estudiantes = await recuperarEstudiantes($selectGrupos.value);

    $selectEstudiantes.innerHTML = '<option disabled selected value="">Selecciona un estudiante</option>';
    estudiantes.forEach(estudiante => {
        const {id, nombre} = estudiante;
        $selectEstudiantes.innerHTML += `<option value="${id}">${nombre}</option>`;
    });
}

window.simularRubrica = async (idRubrica) => {
    showWindowSimularRubrica();
    
    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);
    
    document.querySelector('#rubricaTitulo').textContent = rubrica.titulo;
    document.querySelector('#rubricaDescripcion').textContent = rubrica.descripcion;

    await renderOptionsGrupos(idRubrica);

    await renderOptionsEstudiantes();
    
    const criterios = await recuperarCriterios(idRubrica) || [];
    
    const $containerQuestions = document.querySelector('#containerQuestions');
    $containerQuestions.innerHTML = '';

    criterios.forEach((criterio, iterador) => {
        const {ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de} = criterio;
        $containerQuestions.innerHTML += Criterio(iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de);
    });
}

window.editarRubrica = async (idRubrica) => {
    showWindowEditarRubricas();

    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);

    document.querySelector('#inputEditTituloRubrica').value = rubrica.titulo;
    document.querySelector('#inputEditDescriptionRubrica').value = rubrica.descripcion;

    const criterios = await recuperarCriterios(idRubrica) || [];

    const $containerCriteriosEdit = document.querySelector('#containerCriteriosEdit');
    $containerCriteriosEdit.innerHTML = '';

    criterios.forEach( (criterio, iterador)=> {
        const {titulo, ponderacion, descripcion_se, descripcion_e, descripcion_ae, descripcion_de} = criterio;
        $containerCriteriosEdit.innerHTML += CriterioEditable(iterador, titulo, ponderacion, descripcion_se, descripcion_e, descripcion_ae, descripcion_de);
    });
}

const addCriterio = () => {
    const $containerCriterios = document.querySelector('#containerCriterios');
    $containerCriterios.innerHTML += CriterioEditable();
}

const renderGruposSeleccionados = (contenedor, arreglo) => {
    const $contenedor = document.querySelector('#' + contenedor);
    $contenedor.innerHTML = '';

    arreglo.forEach(grupo => {
        const {id, nombre} = grupo;
        $contenedor.innerHTML += /* html */
            `<article class="grupoSeleccionado">
                <p class="grupoSeleccionado_nombre">${nombre}</p>
                <button onclick="removeGrupoSeleccionado(${id})" class="grupoSeleccionado_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                </button>
            </article>`;
    });
}

const autocompleteGrupos = () => {
    const $containerGruposAutocomplete = document.querySelector('#containerGruposAutocomplete');
    if($inputAutocompleteGrupos.value === ''){
        $containerGruposAutocomplete.innerHTML = '';
        return;
    } 

    const value = $inputAutocompleteGrupos.value.toLowerCase();
    const filtrados = grupos.filter(grupo => grupo.nombre.toLowerCase().includes(value));

    $containerGruposAutocomplete.innerHTML = '';
    filtrados.forEach(grupoFiltrado => {
        const {id, nombre} = grupoFiltrado;
        $containerGruposAutocomplete.innerHTML += `<article onclick="asignarRubricaAGrupo(${id})" class="autocomplete_option">${nombre}</article>`;
    });
}

window.asignarRubricaAGrupo = (idGrupo) => {
    const isValidate = gruposSeleccionados.find(grupo => grupo.id == idGrupo);
    if(isValidate) return;

    const grupo = grupos.find(grupo => grupo.id == idGrupo);
    gruposSeleccionados.push(grupo);

    renderGruposSeleccionados('containerGruposAsignados', gruposSeleccionados);

    $inputAutocompleteGrupos.value = '';
    autocompleteGrupos();
}

window.removeGrupoSeleccionado = (idGrupo) => {
    gruposSeleccionados = gruposSeleccionados.filter(grupo => grupo.id != idGrupo);
    renderGruposSeleccionados('containerGruposAsignados', gruposSeleccionados);
}

const showWindowSimularRubrica = () => {
    hiddenAllWindows();
    const selector = '#CompletarRubrica';
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const showWindowEditarRubricas = () => {
    hiddenAllWindows();
    const selector = '#EditarRubrica';
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {
    
    recuperarStorach();

    showResumenData();
}); 

$selectGrupos.addEventListener('change', renderOptionsEstudiantes);

$btnAddCriterio.addEventListener('click', addCriterio);

$inputAutocompleteGrupos.addEventListener('input', autocompleteGrupos);