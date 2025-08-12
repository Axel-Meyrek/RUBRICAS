const RubricaParaAsignar = (titulo, descripcion, fecha, id) => {
    return (/* html */
        `<article class="rubrica">
            <div class="rubrica_container">
                <h3 class="rubrica_name">${titulo}</h3>
                <p class="rubrica_description">${descripcion}</p>
                <p class="rubrica_fecha">Creada el ${fecha}</p>
            </div>
            
            <div class="rubrica_containerButtons">
                <button onclick="marcarRubricaComoAsignada('${id}', this)" class="rubrica_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"/></svg>
                    Asignar esta rubrica
                </button>
            </div>
        </article>`);
}

export default RubricaParaAsignar;