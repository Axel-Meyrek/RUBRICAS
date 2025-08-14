//VARIABLES Y COMPONENTES
import RubricaEvaluacionReciente from '../components/RubricaEvaluacionReciente.js';

import RubricaProfesor from '../components/RubricaProfesor.js';

import Criterio from '../components/Criterio.js';

let profesor = {};

let rubricas = [];

let grupos = [];

let gruposRubricas = [];

let idRubricaEvaluada = null;

window.criterios = [];

const $selectGrupos = document.querySelector('#selectGrupos');

const $buttonSaveEvaluacion = document.querySelector('#buttonSaveEvaluacion');

const $buttonVolver = document.querySelector('#buttonVolver');




//FUNCIONES
const showResumenData = async () => {
    document.querySelector('#nombreNav').textContent = profesor.nombre;

    document.querySelector('#emailNav').textContent = profesor.email;

    document.querySelector('#nombreProfesorDashboard').textContent = profesor.nombre;

    rubricas = await recuperarRubricas();
    if(rubricas.error === 'Sin datos') rubricas = [];

    document.querySelector('#rubricasTotal').textContent = rubricas.length || 0;

    grupos = await recuperarGrupos();
    if(grupos.error === 'Sin datos') grupos = [];

    document.querySelector('#gruposTotal').textContent = grupos.length || 0;

    document.querySelector('#estudiantesTotal').textContent = await recuperarTotalEstudiantes();

    renderRubricasRecientes();

    renderRubricas();


}

const showWindow = (selector) => {
    hiddenAllWindows();
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const validarRutaSegura = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    if(!data || !data.usuario || data.tipo !== 'profesor') {
        window.location.href = '../pages/login.html';
        localStorage.removeItem('Sesion');
    }
}

const recuperarStorach = () => {
    const data = JSON.parse(localStorage.getItem('Sesion'));
    profesor = data.usuario;
}

const recuperarGrupos = async () => {
    const URL = `../api/getGruposPorProfesor.php`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_profesor: profesor.id})
    };
    
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const recuperarTotalEstudiantes = async () => {
    const URL = `../api/getTotalEstudiantesPorProfesor.php`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_profesor: profesor.id})
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    return data.total_estudiantes || data.Total_Estudiantes || 0;
}

const recuperarRubricas = async () => {
    const URL = `../api/getRubricasAsignadasPorProfesor.php`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_profesor: profesor.id})
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const renderRubricasRecientes = () => {
    const $resumenRubricaContainer = document.querySelector('#resumenRubricaContainer');

    rubricas.slice(0, 2).forEach(rubrica => {
        const {titulo, fecha, id} = rubrica;
        $resumenRubricaContainer.innerHTML += RubricaEvaluacionReciente(titulo, fecha, id);
    });
}

const setEvaluacion = async (evaluacion) => {
    const URL = `../api/setEvaluacion.php`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(evaluacion)
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const setProfesorEstudianteRubrica = async (data) => {
    const URL = `../api/setProfesorEstudianteRubrica.php`;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    const response = await fetch(URL, options);
    const result = await response.json();
    return result;
}

const renderRubricas = () => {
    const $containerRubricas = document.querySelector('#containerRubricas');
    $containerRubricas.innerHTML = '';

    rubricas.forEach(rubrica => {
        const {titulo, descripcion, fecha, id} = rubrica;
        $containerRubricas.innerHTML += RubricaProfesor(titulo, descripcion, fecha, id);
    });
}

const showWindowEvaluar = () => {
    hiddenAllWindows();
    const selector = '#EvaluarRubrica';
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const recuperarGruposConRubricaAsignadaPorProfesor = async (idRubrica, idProfesor) => {
    const URL = '../api/getGruposPorRubricaAsignadaPorProfesor.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ id_rubrica: idRubrica, id_profesor: idProfesor }),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}

const renderOptionsGrupos = async (idRubrica, idProfesor) => {
    gruposRubricas = await recuperarGruposConRubricaAsignadaPorProfesor(idRubrica, idProfesor);
    $selectGrupos.innerHTML = '<option disabled selected value="">Selecciona un grupo</option>';
    gruposRubricas.forEach(grupo => {
        const {id} = grupo;
        $selectGrupos.innerHTML += `<option value="${id}">${id}</option>`;
    });
}

const renderOptionsEstudiantes = async () => {
    const $selectEstudiantes = document.querySelector('#selectEstudiantes');
    
    if($selectGrupos.value === '') {
        $selectEstudiantes.innerHTML = '<option disabled selected value="">Selecciona un estudiante</option>';
        return;
    }

    const estudiantes = await recuperarEstudiantesSinEvaluar($selectGrupos.value, idRubricaEvaluada);

    $selectEstudiantes.innerHTML = '<option disabled selected value="">Selecciona un estudiante</option>';
    estudiantes.forEach(estudiante => {
        const {id, nombre} = estudiante;
        $selectEstudiantes.innerHTML += `<option value="${id}">${nombre}</option>`;
    });
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
    
window.evaluarRubrica = async (idRubrica) => {  
    showWindowEvaluar();

    idRubricaEvaluada = idRubrica;

    const rubrica = rubricas.find(rubrica => rubrica.id == idRubrica);
    
    document.querySelector('#rubricaTitulo').textContent = rubrica.titulo;
    document.querySelector('#rubricaDescripcion').textContent = rubrica.descripcion;

    await renderOptionsGrupos(idRubrica, profesor.id);

    await renderOptionsEstudiantes();
    
    const criterios = await recuperarCriterios(idRubrica) || [];
    
    const $containerQuestions = document.querySelector('#containerQuestions');
    $containerQuestions.innerHTML = '';

    criterios.forEach((criterio, iterador) => {
        const {id, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de} = criterio;
        $containerQuestions.innerHTML += Criterio(id, iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de);
    });
}

window.marcarCriterio = (idCriterio, iterador, valor) => {
    const $criterio = document.querySelector(`#criterio${iterador}`);
    const botones = $criterio.querySelectorAll('.question_buttonCalification');

    botones.forEach(b => b.classList.remove('selected'));

    const botonPresionado = $criterio.querySelector(`button[onclick="marcarCriterio('${idCriterio}', ${iterador}, '${valor}')"]`);
    if (botonPresionado) botonPresionado.classList.add('selected');

    $criterio.classList.add('bg-blue-100');
    criterios[iterador].valor = valor;
};

window.guardarEvaluacion = async () => {
    //Para la tabla evaluación
    const respuestas = criterios.map(criterio => ({
        id_criterio: criterio.id_criterio,
        id_rubrica: idRubricaEvaluada,
        id_estudiante: document.querySelector('#selectEstudiantes').value,
        evaluacion: criterio.valor
    }));

    //Para la tabla Profesor_Estudiante_Rubrica
    const respuestasProfesorEstudiante = {
        id_profesor: profesor.id,
        id_estudiante: document.querySelector('#selectEstudiantes').value,
        id_rubrica: idRubricaEvaluada
    };

    await setEvaluacion(respuestas);
    await setProfesorEstudianteRubrica(respuestasProfesorEstudiante);

    console.log('Respuestas a guardar:', respuestas);
    console.log('Respuestas Profesor-Estudiante a guardar:', respuestasProfesorEstudiante);

    showWindow('#MisRubricas');

};

const recuperarEstudiantesSinEvaluar = async (id_grupo, id_rubrica) => {
  const URL = '../api/getEstudiantesSinEvaluar.php';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_grupo, id_rubrica }),
  };

  const response = await fetch(URL, options);
  const data = await response.json();
  return data;
};



//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    
    validarRutaSegura();

    recuperarStorach();

    showResumenData();
});

 $selectGrupos.addEventListener('change', async () => {
    await renderOptionsEstudiantes();
});

$buttonVolver.addEventListener('click', () => {
    showWindow('#MisRubricas');
});

$buttonSaveEvaluacion.addEventListener('click', guardarEvaluacion);



const obtenerDatosYDescargarExcel = async () => {
  try {
    const response = await fetch("api/getEvaluaciones.php");
    if (!response.ok) throw new Error("Error al obtener datos: " + response.statusText);
    const datos = await response.json();

    // Opcional: ajustar nombres de columnas para Excel
    const datosParaExcel = datos.map(item => ({
      Rubrica: item.rubrica,
      Matricula: item.matricula,
      "Id Estudiante": item.id_estudiante,
      "Nombre Curso": item.nombre_curso,
      "Nombre Estudiante": item.nombre_estudiante,
      Criterio: item.criterio,
      Respuesta: item.respuesta
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosParaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluaciones");
    XLSX.writeFile(workbook, "Evaluaciones.xlsx");
  } catch (error) {
    console.error("Error generando Excel:", error);
  }
}

document.getElementById("btnDescargar").addEventListener("click", () => {
  obtenerDatosYDescargarExcel();
});