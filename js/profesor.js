/* VARIABLES Y COMPONENTES */
const $selectGrupos = document.querySelector('#selectGrupos');

let profesor = [];

let grupos = [];

let rubricas = [];


/* FUNCIONES */
const recuperarStorach = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    profesor = data.usuario;
}

const showResumenData = async () => {

    document.querySelector('#nombreProfesorDashboard').textContent = profesor.nombre_completo;

    document.querySelector('#nombreNav').textContent = profesor.nombre_completo;

    document.querySelector('#emailNav').textContent = profesor.correo_electronico;

    document.querySelector('#gruposTotal').textContent = grupos.length;
    
    document.querySelector('#estudiantesTotal').textContent = await recuperarTotalEstudiantes(profesor.id);
    
    rubricas = await recuperarRubricas(profesor.id);

    document.querySelector('#rubricasTotal').textContent = rubricas.length;
    
    grupos = await recuperarGrupos(profesor.id);

    document.querySelector('#gruposTotal').textContent = grupos.length;

    renderRubricasRecientes();
    
    renderRubricas();

    renderGrupos();

}

const recuperarRubricas = async (idProfesor) => {
    const URL = '../api/getRubricasxProfesor.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({id_profesor: idProfesor }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const recuperarGrupos = async (idProfesor) => {
    const URL = '../api/getGruposxProfesor.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({id_profesor: idProfesor }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
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

const recuperarTotalEstudiantes = async (idProfesor) => {
    const URL = '../api/getTotalEstudiantes.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({id_profesor: idProfesor }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data.Total_Estudiantes;
}

const recuperarCriterios = async (idRubrica) => {
    const URL = '../api/getCriterios.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({id_rubrica: idRubrica }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const renderRubricasRecientes = () => {
    const $resumenRubricaContainer = document.querySelector('#resumenRubricaContainer');

    rubricas.slice(0, 2).forEach(rubrica => {
        const {id, titulo, fecha_creacion } = rubrica;
        const $rubrica = /* html */
            `<div class="resumenRubrica">
                <div class="resumenRubrica_container">
                    <h4 class="resumenRubrica_name">${titulo}</h4>
                    <p class="resumenRubrica_criterios">${fecha_creacion}</p>
                </div>
                <button onclick="renderEvaluacion(${id})" class="resumenRubrica_button">Evaluar</button>
            </div>`;

        $resumenRubricaContainer.innerHTML += $rubrica;
    });
}

const renderRubricas = () => {

    const $containerRubricas = document.querySelector('#containerRubricas');
    $containerRubricas.innerHTML = '';

    rubricas.forEach(rubrica => {
        console.log(rubrica);
        const {id, titulo, descripcion, fecha_creacion } = rubrica;
        const $rubrica = /* html */
            `<article class="rubrica">
                <div class="rubrica_container">
                    <h3 class="rubrica_name">${titulo}</h3>
                    <p class="rubrica_description">${descripcion}</p>
                    <p class="rubrica_fecha">Creada el ${fecha_creacion}</p>
                </div>
                
                <div class="rubrica_containerButtons">
                    <button onclick="renderEvaluacion(${id})" class="rubrica_button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"/></svg>
                        Evaluar
                    </button>
                </div>
            </article>`;

        $containerRubricas.innerHTML += $rubrica;
    });
}

const renderGrupos = () => {
    const $containerGrupos = document.querySelector('#containerGrupos');
    $containerGrupos.innerHTML = '';
    console.log(grupos);

    grupos.forEach(grupo => {
        const $grupo = /* html */
        `<article onclick="renderEstudiantes(${grupo.ID})" class="grupo">
            <p class="grupo_name">${grupo.NOMBRE}</p>
        </article>`;

        $containerGrupos.innerHTML += $grupo;
    });
}

const renderEstudiantes = async (idGrupo) => {
    estudiantes = await recuperarEstudiantes(idGrupo);
    const $containerEstudiantes = document.querySelector('#containerEstudiantes');
    $containerEstudiantes.innerHTML = '';

    estudiantes.forEach(estudiante => {
        const $estudiante = /* html */
            `<article class="estudiante">
                <p class="estudiante_name">${estudiante.nombre_completo}</p>
                <div class="estudiante_botonera">
                    <button class="estudiante_buttonEvaluar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"/></svg>
                        Evaluar
                    </button>
                </div>
            </article>`;

        $containerEstudiantes.innerHTML += $estudiante;
    });
}

const renderEvaluacion = async (idRubrica) => {
    showWindowEvaluarRubrica();

    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);

    document.querySelector('#tituloRubrica').textContent = rubrica.titulo;
    document.querySelector('#descripcionRubrica').textContent = rubrica.descripcion;

    const gruposEvaluar = grupos.filter(grupo => grupo.ID_RUBRICA == idRubrica);
    
    const $selectGrupos = document.querySelector('#selectGrupos');
    $selectGrupos.innerHTML = '<option disabled selected value="">Selecciona un grupo</option>';
    gruposEvaluar.forEach(grupo => {
        const $optionGrupo = /* html */
                    `<option value="${grupo.ID}">${grupo.NOMBRE}</option>`;
        $selectGrupos.innerHTML += $optionGrupo;
    });
    
    await renderCriterios(idRubrica);
}

const showWindowEvaluarRubrica = () => {
    hiddenAllWindows();
    const selector = '#CompletarRubrica';
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const renderOptionsEstudiantes = async () => {
    const estudiantes = await recuperarEstudiantes(document.querySelector('#selectGrupos').value);
    console.log(estudiantes);
    
    const $selectEstudiantes = document.querySelector('#selectEstudiantes');
    $selectEstudiantes.innerHTML = '<option disabled selected value="">Selecciona un estudiante</option>';

    estudiantes.forEach(estudiante => {
        const $optionEstudiante = `<option value="${estudiante.id}">${estudiante.nombre_completo}</option>`;
        $selectEstudiantes.innerHTML += $optionEstudiante;
    });
}

const renderCriterios = async (idRubrica) => {
    const criterios = await recuperarCriterios(idRubrica);

    const $containerQuestions = document.querySelector('#containerQuestions');
    $containerQuestions.innerHTML = '';

    criterios.forEach((criterio, iterador) => {
        const {titulo, ponderacion, descripcion_de, descripcion_ae, descripcion_e, descripcion_se} = criterio;
        const $criterio = /* html */
                `<article class="question">
                    <p class="question_puntaje">Puntaje: <span>${ponderacion}%</span></p>
                    <h3 class="question_title">Criterio ${iterador+1}: ${titulo}</h3>
                    <div class="question_botonera">
                        <div class="question_flex">
                            <p class="question_description">${descripcion_se}</p>
                            <button class="question_buttonCalification">Sobre el estándar</button>
                        </div>
                        <div class="question_flex">
                            <p class="question_description">${descripcion_e}</p>
                            <button class="question_buttonCalification">En el estándar</button>
                        </div>
                        <div class="question_flex">
                            <p class="question_description">${descripcion_ae}</p>
                            <button class="question_buttonCalification">Acercandose al estándar</button>
                        </div>
                        <div class="question_flex">
                            <p class="question_description">${descripcion_de}</p>
                            <button class="question_buttonCalification">Debajo del estándar</button>
                        </div>
                    </div>
                </article>`;

        $containerQuestions.innerHTML += $criterio;
    });
}


/* EVENTOS */
document.addEventListener('DOMContentLoaded', recuperarStorach);

document.addEventListener('DOMContentLoaded', showResumenData);

$selectGrupos.addEventListener('change', renderOptionsEstudiantes);