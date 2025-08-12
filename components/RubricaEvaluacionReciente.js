const RubricaEvaluacionReciente = (titulo, fecha, id) => {
    return (
        /* html */
        `<div class="resumenRubrica">
                <div class="resumenRubrica_container">
                    <h4 class="resumenRubrica_name">${titulo}</h4>
                    <p class="resumenRubrica_criterios">${fecha}</p>
                </div>
                <button onclick="evaluarRubrica('${id}')" class="resumenRubrica_button">Evaluar</button>
            </div>`
        );
}

export default RubricaEvaluacionReciente;