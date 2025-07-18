const Criterio = (iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de) => {
    // Guardamos la ponderación inicial (si no existe ya)
    if (!criterios[iterador]) {
        criterios[iterador] = {
            ponderacion: parseFloat(ponderacion),
            valor: null // aún no ha sido calificado
        };
    }

    return (/* html */
        `<article class="question" id="criterio${iterador}">
            <p class="question_puntaje">Puntaje: <span>${ponderacion}%</span></p>
            <h3 class="question_title">Criterio ${iterador + 1}: ${titulo}</h3>
            <div class="question_botonera">
                <div class="question_flex">
                    <p class="question_description">${descripcion_se}</p>
                    <button onclick="marcarCriterio(${iterador}, '0')" class="question_buttonCalification">Sobre el estándar</button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_e}</p>
                    <button onclick="marcarCriterio(${iterador}, '1')" class="question_buttonCalification">En el estándar</button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_ae}</p>
                    <button onclick="marcarCriterio(${iterador}, '2')" class="question_buttonCalification">Acercándose al estándar</button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_de}</p>
                    <button onclick="marcarCriterio(${iterador}, '3')" class="question_buttonCalification">Debajo del estándar</button>
                </div>
            </div>
        </article>`
    );
};

export default Criterio;