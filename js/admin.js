/* VARIABLES Y COMPONENTES */
let administrador = {};

let rubricas = [];

let profesores = [];

let grupos = [];

let numCriterios = 2;

/* FUNCIONES */
const recuperarStorach = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    administrador = data.usuario;
}

const showResumenData = async () => {

    document.querySelector('#nombreAdminDashboard').textContent = administrador.nombre_completo;

    document.querySelector('#nombreNav').textContent = administrador.nombre_completo;

    document.querySelector('#emailNav').textContent = administrador.correo_electronico;

    rubricas = await recuperarRubricas();

    document.querySelector('#rubricasTotal').textContent = rubricas.length;
    
    profesores = await rescuperarProfesores();
    
    document.querySelector('#profesoresTotal').textContent = profesores.length;
    
    grupos = await recuperarGrupos();

    document.querySelector('#gruposTotal').textContent = grupos.length;

    renderRubricasRecientes();

    renderRubricas();

    renderGrupos();
    
}

const recuperarRubricas = async () => {
    const URL = '../api/getRubricas.php';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

const rescuperarProfesores = async () => {
    const URL = '../api/getProfesores.php';
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
        const $rubrica = /* html */
            `<div class="resumenRubrica">
                <div class="resumenRubrica_container">
                    <h4 class="resumenRubrica_name">${rubrica.TITULO}</h4>
                    <p class="resumenRubrica_criterios">${rubrica.FECHA_CREACION}</p>
                </div>
                <button onclick="editarRubrica(${rubrica.ID})" class="resumenRubrica_button">Ver</button>
            </div>`;

        $resumenRubricaContainer.innerHTML += $rubrica;
    });
}

const renderRubricas = () => {

    const $containerRubricas = document.querySelector('#containerRubricas');

    $containerRubricas.innerHTML = '';

    rubricas.forEach(rubrica => {
        const {ID, TITULO, DESCRIPCION, FECHA_CREACION} = rubrica;
        const $rubrica = /* html */
            `<article class="rubrica">
                <div class="rubrica_container">
                    <h3 class="rubrica_name">${TITULO}</h3>
                    <p class="rubrica_description">${DESCRIPCION}</p>
                        <p class="rubrica_fecha">Creada el ${FECHA_CREACION}</p>
                </div>
                
                <div class="rubrica_containerButtons">
                    
                    <button onclick="simularRubrica(${ID})" class="rubrica_button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg>
                    </button>

                    <button onclick="editarRubrica(${ID})" class="rubrica_button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 1024 1024"><path fill="currentColor" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"/><path fill="currentColor" d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"/></svg>
                        Editar
                    </button>
                    
                    <button class="rubrica_button rubrica_button--delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 40 40"><path fill="currentColor" d="M32.937 7.304H27.19v-.956c0-1.345-.423-2.32-1.278-2.915c-.604-.39-1.353-.588-2.224-.588h-6.441l-.014.003l-.014-.003h-.909c-2.259 0-3.503 1.244-3.503 3.503v.956H7.063a.75.75 0 0 0 0 1.5h.647l1.946 25.785c0 1.631.945 2.566 2.594 2.566h15.461c1.611 0 2.557-.93 2.592-2.51L32.25 8.804h.686a.75.75 0 0 0 .001-1.5m-2.302 2.976H9.326l-.111-1.476h21.531zM14.308 6.348c0-1.423.58-2.003 2.003-2.003h7.378c.578 0 1.053.117 1.389.333c.413.287.613.833.613 1.67v.956H14.308zm14.498 28.224c-.019.81-.295 1.083-1.095 1.083H12.25c-.818 0-1.094-.269-1.096-1.123L9.439 11.779h21.082z"/><path fill="currentColor" d="M17.401 12.969a.75.75 0 0 0-.722.776l.704 19.354a.75.75 0 0 0 .748.723l.028-.001a.75.75 0 0 0 .722-.776l-.703-19.355c-.015-.414-.353-.757-.777-.721m-4.649.001a.75.75 0 0 0-.696.8l1.329 19.354a.75.75 0 0 0 .747.698l.053-.002a.75.75 0 0 0 .696-.8l-1.329-19.354a.756.756 0 0 0-.8-.696m9.784-.001c-.419-.04-.762.308-.776.722l-.705 19.354a.75.75 0 0 0 .722.776l.028.001a.75.75 0 0 0 .748-.723l.705-19.354a.75.75 0 0 0-.722-.776m4.649.001a.757.757 0 0 0-.8.696L25.056 33.02a.75.75 0 0 0 .696.8l.053.002a.75.75 0 0 0 .747-.698l1.329-19.354a.75.75 0 0 0-.696-.8"/></svg>
                    </button>
                </div>
            </article>`;

        $containerRubricas.innerHTML += $rubrica;
    });
}

const renderGrupos = () => {
    const $containerGrupos = document.querySelector('#containerGrupos');
    $containerGrupos.innerHTML = '';
    
    grupos.forEach(grupo => {
        const $grupo = /* html */
            `<article onclick="renderEstudiantes(${grupo.ID})" class="grupo">
                <p class="grupo_name">${grupo.NOMBRE}</p>
            </article>`;

        $containerGrupos.innerHTML += $grupo;
    })
}

const renderEstudiantes = async (idGrupo) => {
    const estudiantes = await recuperarEstudiantes(idGrupo);
    const $containerEstudiantes = document.querySelector('#containerEstudiantes');
    $containerEstudiantes.innerHTML = '';
    estudiantes.forEach(estudiante => {
        const $estudiante = /* html */
            `<article class="estudiante">
                <p class="estudiante_name">${estudiante.nombre_completo}</p>
            </article>`;

        $containerEstudiantes.innerHTML += $estudiante;
    });
}

const showWindowEditarRubricas = () => {
    hiddenAllWindows();
    const selector = '#EditarRubrica';
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const showWindowSimularRubrica = () => {
    hiddenAllWindows();
    const selector = '#CompletarRubrica';
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const editarRubrica = async (idRubrica) => {
    showWindowEditarRubricas();

    const rubrica = rubricas.find(rubrica => rubrica.ID == idRubrica);

    document.querySelector('#inputEditTituloRubrica').value = rubrica.TITULO;
    document.querySelector('#inputEditDescriptionRubrica').value = rubrica.DESCRIPCION;

    const criterios = await recuperarCriterios(idRubrica) || [];

    const $containerCriteriosEdit = document.querySelector('#containerCriteriosEdit');
    $containerCriteriosEdit.innerHTML = '';

    criterios.forEach( (criterio, iterador)=> {
        const {titulo, ponderacion, descripcion_de, descripcion_ae, descripcion_e, descripcion_se} = criterio;
        const $criterio = /* html */
            `<article class="criterio">
                <div class="criterio_flex">
                    <p class="criterio_title">Criterio ${iterador+1}</p>
                    <button class="criterio_buttonDelete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 40 40"><path fill="currentColor" d="M32.937 7.304H27.19v-.956c0-1.345-.423-2.32-1.278-2.915c-.604-.39-1.353-.588-2.224-.588h-6.441l-.014.003l-.014-.003h-.909c-2.259 0-3.503 1.244-3.503 3.503v.956H7.063a.75.75 0 0 0 0 1.5h.647l1.946 25.785c0 1.631.945 2.566 2.594 2.566h15.461c1.611 0 2.557-.93 2.592-2.51L32.25 8.804h.686a.75.75 0 0 0 .001-1.5m-2.302 2.976H9.326l-.111-1.476h21.531zM14.308 6.348c0-1.423.58-2.003 2.003-2.003h7.378c.578 0 1.053.117 1.389.333c.413.287.613.833.613 1.67v.956H14.308zm14.498 28.224c-.019.81-.295 1.083-1.095 1.083H12.25c-.818 0-1.094-.269-1.096-1.123L9.439 11.779h21.082z"/><path fill="currentColor" d="M17.401 12.969a.75.75 0 0 0-.722.776l.704 19.354a.75.75 0 0 0 .748.723l.028-.001a.75.75 0 0 0 .722-.776l-.703-19.355c-.015-.414-.353-.757-.777-.721m-4.649.001a.75.75 0 0 0-.696.8l1.329 19.354a.75.75 0 0 0 .747.698l.053-.002a.75.75 0 0 0 .696-.8l-1.329-19.354a.756.756 0 0 0-.8-.696m9.784-.001c-.419-.04-.762.308-.776.722l-.705 19.354a.75.75 0 0 0 .722.776l.028.001a.75.75 0 0 0 .748-.723l.705-19.354a.75.75 0 0 0-.722-.776m4.649.001a.757.757 0 0 0-.8.696L25.056 33.02a.75.75 0 0 0 .696.8l.053.002a.75.75 0 0 0 .747-.698l1.329-19.354a.75.75 0 0 0-.696-.8"/></svg>
                    </button>
                </div>

                <label class="createRubrica_label" for="">Pregunta/Descripción</label>
                <input class="createRubrica_input" value="${titulo}" type="text" placeholder="Escribe la descripcion o la pregunta de este criterio">
                
                <label class="createRubrica_label" for="">Ponderacion</label>
                <input class="createRubrica_input" value="${ponderacion}" type="text" placeholder="Escribe la ponderacion de este criterio">

                <!-- CRITERIO POINT -->
                <div class="createRubrica_criterioFlex">
                    <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id="">${descripcion_se}</textarea>
                    <p class="createRubrica_criterioPoint">Sobre el estandar</p>
                </div>
                <!-- CRITERIO POINT -->
                <div class="createRubrica_criterioFlex">
                    <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id="">${descripcion_e}</textarea>
                    <p class="createRubrica_criterioPoint">En el estandar</p>
                </div>
                <!-- CRITERIO POINT -->
                <div class="createRubrica_criterioFlex">
                    <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id="">${descripcion_ae}</textarea>
                    <p class="createRubrica_criterioPoint">Acercandose al estandar</p>
                </div>
                <!-- CRITERIO POINT -->
                <div class="createRubrica_criterioFlex">
                    <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id="">${descripcion_de}</textarea>
                    <p class="createRubrica_criterioPoint">Debajo del estandar</p>
                </div>
            </article>`;

        $containerCriteriosEdit.innerHTML += $criterio;
    });
}

const simularRubrica = async (idRubrica) => {

    showWindowSimularRubrica();
    
    const rubrica = rubricas.find(rubrica => rubrica.ID == idRubrica);
    
    document.querySelector('#rubricaTitulo').textContent = rubrica.TITULO;
    document.querySelector('#rubricaDescripcion').textContent = rubrica.DESCRIPCION;
    
    const criterios = await recuperarCriterios(idRubrica) || [];
    
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
                        <button class="question_buttonCalification">Sobre el estandar</button>
                    </div>
                    <div class="question_flex">
                        <p class="question_description">${descripcion_e}</p>
                        <button class="question_buttonCalification">En al estándar</button>
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

const addCriterio = () => {
    numCriterios++;
    const $criterio = /* html */
        `<article class="criterio">
            <div class="criterio_flex">
                <p class="criterio_title">Criterio ${numCriterios}</p>
                <button class="criterio_buttonDelete">
                    <svg class="iconRemove" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 40 40"><path fill="currentColor" d="M32.937 7.304H27.19v-.956c0-1.345-.423-2.32-1.278-2.915c-.604-.39-1.353-.588-2.224-.588h-6.441l-.014.003l-.014-.003h-.909c-2.259 0-3.503 1.244-3.503 3.503v.956H7.063a.75.75 0 0 0 0 1.5h.647l1.946 25.785c0 1.631.945 2.566 2.594 2.566h15.461c1.611 0 2.557-.93 2.592-2.51L32.25 8.804h.686a.75.75 0 0 0 .001-1.5m-2.302 2.976H9.326l-.111-1.476h21.531zM14.308 6.348c0-1.423.58-2.003 2.003-2.003h7.378c.578 0 1.053.117 1.389.333c.413.287.613.833.613 1.67v.956H14.308zm14.498 28.224c-.019.81-.295 1.083-1.095 1.083H12.25c-.818 0-1.094-.269-1.096-1.123L9.439 11.779h21.082z"/><path fill="currentColor" d="M17.401 12.969a.75.75 0 0 0-.722.776l.704 19.354a.75.75 0 0 0 .748.723l.028-.001a.75.75 0 0 0 .722-.776l-.703-19.355c-.015-.414-.353-.757-.777-.721m-4.649.001a.75.75 0 0 0-.696.8l1.329 19.354a.75.75 0 0 0 .747.698l.053-.002a.75.75 0 0 0 .696-.8l-1.329-19.354a.756.756 0 0 0-.8-.696m9.784-.001c-.419-.04-.762.308-.776.722l-.705 19.354a.75.75 0 0 0 .722.776l.028.001a.75.75 0 0 0 .748-.723l.705-19.354a.75.75 0 0 0-.722-.776m4.649.001a.757.757 0 0 0-.8.696L25.056 33.02a.75.75 0 0 0 .696.8l.053.002a.75.75 0 0 0 .747-.698l1.329-19.354a.75.75 0 0 0-.696-.8"/></svg>
                </button>
            </div>
            <label class="createRubrica_label" for="">Pregunta/Descripción</label>
            <input class="createRubrica_input" type="text" placeholder="Escribe la descripcion o la pregunta de este criterio">
            <label class="createRubrica_label" for="">Ponderación</label>
            <input class="createRubrica_input" type="text" placeholder="Escribe la ponderación de este criterio">
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">Debajo del estandar</p>
            </div>
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">Acercandose al estandar</p>
            </div>
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">En el estandar</p>
            </div>
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">Debajo del estandar</p>
            </div>
        </article>`;

    const $containerCriterios = document.querySelector('#containerCriterios');
    $containerCriterios.innerHTML += $criterio;
}


/* EVENTOS */
document.addEventListener('DOMContentLoaded', recuperarStorach);

document.addEventListener('DOMContentLoaded', showResumenData);