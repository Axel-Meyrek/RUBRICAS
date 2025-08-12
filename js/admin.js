/* VARIABLES Y COMPONENTES */
import RubricaReciente from "../components/RubricaReciente.js";

import Grupo from "../components/Grupo.js";

import Estudiante from "../components/Estudiante.js";

import Rubrica from "../components/Rubrica.js";

import CriterioNuevo from "../components/CriterioNuevo.js";

import CriterioEditable from "../components/CriterioEditable.js";

import CriterioSimulado from "../components/CriterioSimulado.js";

import RubricaParaAsignar from "../components/RubricaParaAsignar.js";

let administrador = {};

let rubricas = [];

let profesores = [];

let grupos = [];

let idRubricaEditar = null;

let rubricasSeleccionadasParaAsignar = [];

let estudiantesSeleccionadosParaAsignar = [];

const fondo = document.querySelector('#fondoPopover');

const $fileInput = document.querySelector('#fileInput');

const popover = document.querySelector('#popoverCentrado');

const $selectGrupos = document.querySelector('#selectGrupos');

const $btnAddCriterio = document.querySelector('#btnAddCriterio');

const $btnCargarExcel = document.querySelector('#btnCargarExcel');

const $btnSaveEditRubric = document.querySelector('#btnSaveEditRubric');

const $btnAddCriterioEdit = document.querySelector('#btnAddCriterioEdit');

const $buttonSaveNewRubrica = document.querySelector('#buttonSaveNewRubrica');

const $btnClosePopover = document.querySelector('#btnClosePopover');



/* FUNCIONES */

const showResumenData = async () => {

    document.querySelector('#nombreNav').textContent = administrador.nombre;

    document.querySelector('#emailNav').textContent = administrador.email;
    
    document.querySelector('#nombreAdminDashboard').textContent = administrador.nombre;

    rubricas = await recuperarRubricas() || [];
    if (rubricas.error === 'Sin datos') rubricas = [];

    document.querySelector('#rubricasTotal').textContent = rubricas.length || 0;

    grupos = await recuperarGrupos() || [];
    if (grupos.error === 'Sin datos') grupos = [];

    document.querySelector('#gruposTotal').textContent = grupos.length || 0;

    profesores = await recuperarProfesores() || [];
    if (profesores.error === 'Sin datos') profesores = [];

    document.querySelector('#profesoresTotal').textContent = profesores.length || 0;

    try {
        renderRubricasRecientes();
    } catch (error) {
        console.error("Error al renderizar rúbricas recientes:", error);
    }

    try {
        renderRubricas();
    } catch (error) {
        console.error("Error al renderizar opciones de grupos:", error);
    }

    try {
        renderGrupos();
    } catch (error) {
        console.error("Error al renderizar grupos:", error);
    }

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
}

const enviarCriterios = async (criterios) => {
    const URL = '../api/setCriterios.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(criterios),
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch(URL, options);
}

const enviarProfesores = async (profesores) => {
    const URL = '../api/setProfesores.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(profesores),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
}

const enviarGrupos = async (grupos) => {
    const URL = '../api/setGrupos.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(grupos),
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch(URL, options);
}

const enviarEstudiantes = async (estudiantes) => {
    const URL = '../api/setEstudiantes.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(estudiantes),
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch(URL, options);
}

const setearRubricaConEstudiante = async (relaciones) => {
    const URL = '../api/setRubricaEstudiante.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(relaciones),
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(URL, options);
    const data = await response.json();
};

const actualizarRubrica = async (id_rubrica, titulo, descripcion) => {
    const URL = '../api/updateRubrica.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ id_rubrica, titulo, descripcion }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const actualizarCriterios = async (criterios) => {
    const URL = '../api/updateCriterios.php';
    const options = {
        method: 'POST',
        body: JSON.stringify(criterios),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const renderRubricasRecientes = () => {
    const $resumenRubricaContainer = document.querySelector('#resumenRubricaContainer');
    $resumenRubricaContainer.innerHTML = '';

    if (rubricas.length === 0) {
        $resumenRubricaContainer.innerHTML = '<p>No hay rúbricas recientes.</p>';
        return;
    }

    rubricas.slice(0, 2).forEach(rubrica => {
        const {titulo, fecha, id} = rubrica;
        $resumenRubricaContainer.innerHTML += RubricaReciente(titulo, fecha, id);
    });
}

const renderGrupos = () => {
    const $containerGrupos = document.querySelector('#containerGrupos');
    $containerGrupos.innerHTML = '';

    if (grupos.length === 0) {
        $containerGrupos.innerHTML = '<p>No hay grupos disponibles.</p>';
        return;
    }

    grupos.forEach(grupo => {
        const {id} = grupo;
        $containerGrupos.innerHTML += Grupo(id);
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
        $selectGrupos.innerHTML += `<option value="${id}">${id}</option>`;
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

const renderRubricasParaAsignar = () => {
    const $containerRubricSelect = document.querySelector('#containerRubricSelect');
    $containerRubricSelect.innerHTML = '';
    rubricas.forEach(rubrica => {
        const {titulo, descripcion, fecha, id} = rubrica;
        $containerRubricSelect.innerHTML += RubricaParaAsignar(titulo, descripcion, fecha, id);
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
    idRubricaEditar = idRubrica;

    showWindow('#EditarRubrica');

    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);

    document.querySelector('#inputEditTituloRubrica').value = rubrica.titulo;
    document.querySelector('#inputEditDescriptionRubrica').value = rubrica.descripcion;

    const criterios = await recuperarCriterios(idRubrica) || [];

    const $containerCriteriosEdit = document.querySelector('#containerCriteriosEdit');
    $containerCriteriosEdit.innerHTML = '';

    criterios.forEach( (criterio, iterador)=> {
        const {id, titulo, ponderacion, descripcion_se, descripcion_e, descripcion_ae, descripcion_de} = criterio;
        $containerCriteriosEdit.innerHTML += CriterioEditable(id, iterador, titulo, ponderacion, descripcion_se, descripcion_e, descripcion_ae, descripcion_de);
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

const guardarRubricaEditada = async (idRubrica) => {
    const nuevosCriterios = [];

    const rubrica = {
        titulo: document.querySelector('#inputEditTituloRubrica').value,
        descripcion: document.querySelector('#inputEditDescriptionRubrica').value,
        id: idRubrica
    }

    //actualizar el local
    const index = rubricas.findIndex(rubrica => rubrica.id == idRubrica);
    rubricas[index].titulo = rubrica.titulo;
    rubricas[index].descripcion = rubrica.descripcion;


    await actualizarRubrica(rubrica.id, rubrica.titulo, rubrica.descripcion);

    const criterioTitulo = document.querySelectorAll('.criterio_titulo_editable');

    const criterioPonderacion = document.querySelectorAll('.criterio_ponderacion_editable');

    const criterioId = document.querySelectorAll('.criterio_id_editable');

    const descripcion_se = document.querySelectorAll('.criterio_se_editable');

    const descripcion_e = document.querySelectorAll('.criterio_e_editable');

    const descripcion_ae = document.querySelectorAll('.criterio_ae_editable');

    const descripcion_de = document.querySelectorAll('.criterio_de_editable');

    const criterios = [];

    for(let i = 0; i < criterioTitulo.length; i++) {
        
        const criterio = {
            id: criterioId[i].value,
            titulo: criterioTitulo[i].value,
            ponderacion: criterioPonderacion[i].value,
            descripcion_se: descripcion_se[i].value,
            descripcion_e: descripcion_e[i].value,
            descripcion_ae: descripcion_ae[i].value,
            descripcion_de: descripcion_de[i].value
        }

        if (parseInt(criterioId[i].value) === -1) {
            nuevosCriterios.push(criterio);
        }else{
            criterios.push(criterio);
        }
    }

    await actualizarCriterios(criterios);

    await enviarCriterios(nuevosCriterios);

    renderRubricas();

    showWindow('#MisRubricas');
}

const mostrarPopover = () => {
    popover.classList.remove('oculto');
    fondo.classList.remove('oculto');
    renderRubricasParaAsignar();
}

const cerrarPopover = () => {
    popover.classList.add('oculto');
    fondo.classList.add('oculto');
}

function obtenerPeriodo() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;

    let estacion = null;

    if (mes >= 3 && mes <= 5) {
        estacion = 'Primavera';
    } else if (mes >= 6 && mes <= 8) {
        estacion = 'Verano';
    } else if (mes >= 9 && mes <= 11) {
        estacion = 'Otoño';
    }

    return estacion ? `${anio}_${estacion}` : `${anio}`;
}

const cargarExcel = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });


        // Profesores únicos
        const profesorSet = new Set();
        const profesores = [];

        json.forEach(prof => {
            const idProfesor = prof['ID EVALUADOR'];
            if (!profesorSet.has(idProfesor)) {
                profesorSet.add(idProfesor);
                profesores.push({
                    id: idProfesor,
                    nombre: prof['NOMBRE EVALUADOR'],
                    email: prof['CORREO EVALUADOR'],
                    password: 'prof123'
                });
            }
        });

        // Grupos únicos
        const grupoSet = new Set();
        const grupos = [];
        const periodoGrupo = obtenerPeriodo();

        json.forEach(grupo => {
            const idGrupo = grupo['CLAVE MATERIA'] + '_' + grupo['GRUPO'] + '_' + periodoGrupo;
            if (!grupoSet.has(idGrupo)) {
                grupoSet.add(idGrupo);
                grupos.push({
                    id: idGrupo,
                    periodo: periodoGrupo,
                    id_profesor: grupo['ID EVALUADOR']
                });
            }
        });

        // Estudiantes (no se filtran aquí)
        const estudiantes = json.map(estudiante => ({
            id: estudiante['ID ALUMNO'],
            matricula: estudiante['MATRÍCULA'],
            nombre: estudiante['NOMBRE COMPLETO ALUMNO'],
            id_grupo: estudiante['CLAVE MATERIA'] + '_' + estudiante['GRUPO'] + '_' + periodoGrupo
        }));

        try {
            await enviarProfesores(profesores);
        } catch (error) {
            console.log('Error al enviar los profesores:', error);
        }

        try {
            await enviarGrupos(grupos);
        } catch (error) {
            console.log('Error al enviar los grupos:', error);
        }

        try {
            await enviarEstudiantes(estudiantes);
        } catch (error) {
            console.log('Error al enviar los estudiantes:', error);
        }

        estudiantesSeleccionadosParaAsignar = estudiantes.map(est => est.id);

    };

    reader.readAsArrayBuffer(file);
    e.target.value = '';
    mostrarPopover();
}


window.marcarRubricaComoAsignada = (idRubrica, boton) => {
    if (rubricasSeleccionadasParaAsignar.includes(idRubrica)) {
        rubricasSeleccionadasParaAsignar = rubricasSeleccionadasParaAsignar.filter(id => id !== idRubrica);
        boton.classList.remove('asignada');
        return;
    }

    rubricasSeleccionadasParaAsignar.push(idRubrica);
    boton.classList.add('asignada');
};

const asignarRubricasAEstudiantes = async () => {
    const relaciones = [];
    for(let i = 0; i < estudiantesSeleccionadosParaAsignar.length; i++) {
        for(let j = 0; j < rubricasSeleccionadasParaAsignar.length; j++){
            const relacion = {
                id_estudiante: estudiantesSeleccionadosParaAsignar[i],
                id_rubrica: rubricasSeleccionadasParaAsignar[j]
            };
            relaciones.push(relacion);
        }
    }
    setearRubricaConEstudiante(relaciones);
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

$btnSaveEditRubric.addEventListener('click', () => {
   guardarRubricaEditada(idRubricaEditar);
});

$btnClosePopover.addEventListener('click', async () => {
    cerrarPopover();
    await asignarRubricasAEstudiantes();
    grupos = await recuperarGrupos() || [];
    renderGrupos();

    rubricasSeleccionadasParaAsignar = [];
    estudiantesSeleccionadosParaAsignar = [];
    
});

$selectGrupos.addEventListener('change', renderOptionsEstudiantes);

$buttonSaveNewRubrica.addEventListener('click', recuperarNuevaRubrica);

$btnCargarExcel.addEventListener('click', () => $fileInput.click());

$fileInput.addEventListener('change', cargarExcel);
