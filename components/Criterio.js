const Criterio = (iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de) => {
    return (
        /* html */
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
        </article>`);
}

export default Criterio;