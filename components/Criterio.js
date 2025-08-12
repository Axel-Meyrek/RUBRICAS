const Criterio = (id, iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de) => {
    if (!criterios[iterador]) {
        criterios[iterador] = {
            id_criterio: id, // guardamos el id real del criterio
            valor: null
        };
    }

    return (/* html */
        `<article class="question" id="criterio${iterador}">
            <p class="question_puntaje">Puntaje: <span>${ponderacion}%</span></p>
            <h3 class="question_title">Criterio ${iterador + 1}: ${titulo}</h3>
            <div class="question_botonera">
                <div class="question_flex">
                    <p class="question_description">${descripcion_se}</p>
                    <button onclick="marcarCriterio('${id}', ${iterador}, 'Sobre el estándar')" class="question_buttonCalification">Sobre el estándar</button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_e}</p>
                    <button onclick="marcarCriterio('${id}', ${iterador}, 'En el estándar')" class="question_buttonCalification">En el estándar</button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_ae}</p>
                    <button onclick="marcarCriterio('${id}', ${iterador}, 'Acercándose al estándar')" class="question_buttonCalification">Acercándose al estándar</button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_de}</p>
                    <button onclick="marcarCriterio('${id}', ${iterador}, 'Debajo del estándar')" class="question_buttonCalification">Debajo del estándar</button>
                </div>
            </div>
        </article>`
    );
};

export default Criterio;
