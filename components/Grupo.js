const Grupo = (id, nombre) => {
    return (
        /* html */
        `<article onclick="renderEstudiantes(${id})" class="grupo">
                <p class="grupo_name">${nombre}</p>
            </article>`
        );
}

export default Grupo;