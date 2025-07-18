//VARIABLES Y COMPONENTES
import RubricaEvaluacionReciente from '../components/RubricaEvaluacionReciente.js';

import RubricaProfesor from '../components/RubricaProfesor.js';

import Criterio from '../components/Criterio.js';

let profesor = {};

let rubricas = [];

let grupos = [];

let gruposRubricas = [];

window.criterios = [];

const $selectGrupos = document.querySelector('#selectGrupos');

const $buttonSaveEvaluacion = document.querySelector('#buttonSaveEvaluacion');



//FUNCIONES
const showResumenData = async () => {
    document.querySelector('#nombreNav').textContent = profesor.nombre;

    document.querySelector('#emailNav').textContent = profesor.email;

    document.querySelector('#nombreProfesorDashboard').textContent = profesor.nombre;

    rubricas = await recuperarRubricas();

    document.querySelector('#rubricasTotal').textContent = rubricas.length;

    grupos = await recuperarGrupos();
    
    document.querySelector('#gruposTotal').textContent = grupos.length;

    document.querySelector('#estudiantesTotal').textContent = await recuperarTotalEstudiantes();

    renderRubricasRecientes();

    renderRubricas();


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


const renderOptionsGrupos = async (idRubrica) => {
    gruposRubricas = await recuperarGruposConRubricaAsignada(idRubrica);
    $selectGrupos.innerHTML = '<option disabled selected value="">Selecciona un grupo</option>';
    gruposRubricas.forEach(grupo => {
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
    
window.evaluarRubrica = async (idRubrica) => {
    showWindowEvaluar();
    
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

window.marcarCriterio = (iterador, valor) => {
    const $criterio = document.querySelector(`#criterio${iterador}`);
    const $valor = document.querySelector(`#valor${iterador}`);
    const botones = $criterio.querySelectorAll('.question_buttonCalification');

    // Limpiar botones previos
    botones.forEach(b => b.classList.remove('selected'));

    const botonPresionado = $criterio.querySelector(`button[onclick="marcarCriterio(${iterador}, '${valor}')"]`);
    if (botonPresionado) botonPresionado.classList.add('selected');

    $criterio.classList.add('bg-blue-100');

    criterios[iterador].valor = parseInt(valor);

    let puntajeTotal = 0;
    criterios.forEach(criterio => {
        if (criterio.valor !== null) {
            const multiplicador = [1, 0.75, 0.5, 0.25][criterio.valor]; // según valor
            puntajeTotal += criterio.ponderacion * multiplicador;
        }
    });
};

window.guardarEvaluacion = () => {
    let puntajeTotal = 0;
    let sumaPonderaciones = 0;

    criterios.forEach((criterio, index) => {
        if (criterio.valor !== null) {
            const multiplicador = [1, 0.75, 0.5, 0.25][criterio.valor];
            puntajeTotal += criterio.ponderacion * multiplicador;
        }

        sumaPonderaciones += criterio.ponderacion;
    });

    if (sumaPonderaciones === 0) {
        return;
    }

    const puntajeFinal = (puntajeTotal / sumaPonderaciones) * 100;

    const evaluacion = {
        id_profesor: profesor.id,
        id_rubrica: rubricas.find(r => r.titulo === document.querySelector('#rubricaTitulo').textContent).id,
        id_estudiante: document.querySelector('#selectEstudiantes').value,
        puntaje: puntajeFinal
    }

    setEvaluacion(evaluacion);
};

const setEvaluacion = async (evaluacion) => {
  try {
    const respuesta = await fetch('../api/setEvaluacion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(evaluacion)
    });

    const datos = await respuesta.json();

    if (datos.success) {
      console.log("✅ Evaluación guardada correctamente:", datos.message);
    } else {
      console.error("❌ No se pudo guardar la evaluación:", datos.error);
    }
  } catch (error) {
    console.error("💥 Error al enviar la evaluación:", error);
  }
}












//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    
    validarRutaSegura();

    recuperarStorach();

    showResumenData();
});

 $selectGrupos.addEventListener('change', async () => {
    await renderOptionsEstudiantes();
});

$buttonSaveEvaluacion.addEventListener('click', guardarEvaluacion);