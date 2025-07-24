/* VARIABLES Y COMPONENTES */
import RubricaReciente from "../components/RubricaReciente.js";

import Grupo from "../components/Grupo.js";

import Estudiante from "../components/Estudiante.js";

import Rubrica from "../components/Rubrica.js";

import CriterioNuevo from "../components/CriterioNuevo.js";

import CriterioEditable from "../components/CriterioEditable.js";

import CriterioSimulado from "../components/CriterioSimulado.js";

let administrador = {};

let rubricas = [];

let profesores = [];

let grupos = [];

const $fileInput = document.querySelector('#fileInput');

const $selectGrupos = document.querySelector('#selectGrupos');

const $btnCargarExcel = document.querySelector('#btnCargarExcel');

const $btnAddCriterio = document.querySelector('#btnAddCriterio');

const $btnSaveEditRubric = document.querySelector('#btnSaveEditRubric');

const $btnAddCriterioEdit = document.querySelector('#btnAddCriterioEdit');

const $buttonSaveNewRubrica = document.querySelector('#buttonSaveNewRubrica');

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

const showWindow = (selector) => {
    hiddenAllWindows();
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const validarRutaSegura = () =>{
    const data = JSON.parse(localStorage.getItem('Sesion'));
    if(!data || !data.usuario || data.tipo !== 'administrador') {
        window.location.href = '../pages/login.html';
        localStorage.removeItem('Sesion');
    }
}

const recuperarStorach = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    administrador = data.usuario;
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

const enviarNuevaRubrica = async (titulo, descripcion) => {
    const URL = '../api/setRubrica.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ titulo, descripcion }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
};

const enviarCriterios = async (criterios) => {
    const URL = '../api/setCriterios.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(criterios),
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch(URL, options);
};

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
    });
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
    showWindow('#CompletarRubrica');
    
    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);
    
    document.querySelector('#rubricaTitulo').textContent = rubrica.titulo;
    document.querySelector('#rubricaDescripcion').textContent = rubrica.descripcion;

    try {
        await renderOptionsGrupos(idRubrica);
    } catch (error) {
        console.error(error);
    }

    try {
        await renderOptionsEstudiantes();        
    } catch (error) {
        console.error(error);
    }

    const criterios = await recuperarCriterios(idRubrica) || [];
    
    const $containerQuestions = document.querySelector('#containerQuestions');
    $containerQuestions.innerHTML = '';

    criterios.forEach((criterio, iterador) => {
        const {ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de} = criterio;
        $containerQuestions.innerHTML += CriterioSimulado(iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de);
    });
}

window.editarRubrica = async (idRubrica) => {
    showWindow('#EditarRubrica');

    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);
    console.log(rubrica);

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

const addCriterio = (contenedorCriterios) => {
    const $containerCriterios = document.querySelector(`#${contenedorCriterios}`);
    $containerCriterios.insertAdjacentHTML('beforeend', CriterioNuevo());
}

const vaciarAllInputsCreateRubric = () => {
    document.querySelector('#inputTituloRubrica').value = '';
    document.querySelector('#inputDescriptionRubrica').value = '';
    document.querySelector('#containerCriterios').innerHTML = CriterioNuevo();
}

const recuperarNuevaRubrica = async () => {
    const rubrica = {
        titulo: document.querySelector('#inputTituloRubrica').value,
        descripcion: document.querySelector('#inputDescriptionRubrica').value
    }

    const criterioTitulo = document.querySelectorAll('.criterio_titulo');
    
    const criterioPonderacion = document.querySelectorAll('.criterio_ponderacion');
    
    const descripcion_se = document.querySelectorAll('.criterio_se');
    
    const descripcion_e = document.querySelectorAll('.criterio_e');
    
    const descripcion_ae = document.querySelectorAll('.criterio_ae');
    
    const descripcion_de = document.querySelectorAll('.criterio_de');

    const criterios = [];

    const data = await enviarNuevaRubrica(rubrica.titulo, rubrica.descripcion);
    console.log(data.id_rubrica);

    //actualizar el local
    rubrica.id = data.id_rubrica;
    rubricas.push(rubrica);


    for(let i = 0; i < criterioTitulo.length; i++) {
        const criterio = {
            titulo: criterioTitulo[i].value,
            ponderacion: criterioPonderacion[i].value,
            id_rubrica: rubrica.id,
            descripcion_se: descripcion_se[i].value,
            descripcion_e: descripcion_e[i].value,
            descripcion_ae: descripcion_ae[i].value,
            descripcion_de: descripcion_de[i].value
        }
        criterios.push(criterio);
    }


    await enviarCriterios(criterios);

    vaciarAllInputsCreateRubric();

    showWindow('#MisRubricas'); 
    
    renderRubricasRecientes();

    renderRubricas();
}



const cargarExcel = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    console.log(json);
    };

    reader.readAsArrayBuffer(file);
}





/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {

    validarRutaSegura();
    
    recuperarStorach();

    showResumenData();
});

$btnAddCriterio.addEventListener('click', () => {
    addCriterio('containerCriterios');
});

$btnAddCriterioEdit.addEventListener('click', () => {
    addCriterio('containerCriteriosEdit');
});

$selectGrupos.addEventListener('change', renderOptionsEstudiantes);

$buttonSaveNewRubrica.addEventListener('click', recuperarNuevaRubrica);

$btnCargarExcel.addEventListener('click', () => $fileInput.click());

$fileInput.addEventListener('change', cargarExcel);