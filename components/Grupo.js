const Grupo = (id) => {
    return (
        /* html */
        `<article onclick="renderEstudiantes('${id}')" class="grupo">
                <p class="grupo_name">${id}</p>
            </article>`
        );
}

export default Grupo;