const CriterioNuevo = () => {
    return (/* html */
        `<article class="criterio">
            <div class="criterio_flex--end">
                <button class="criterio_buttonDelete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 40 40"><path fill="currentColor" d="M32.937 7.304H27.19v-.956c0-1.345-.423-2.32-1.278-2.915c-.604-.39-1.353-.588-2.224-.588h-6.441l-.014.003l-.014-.003h-.909c-2.259 0-3.503 1.244-3.503 3.503v.956H7.063a.75.75 0 0 0 0 1.5h.647l1.946 25.785c0 1.631.945 2.566 2.594 2.566h15.461c1.611 0 2.557-.93 2.592-2.51L32.25 8.804h.686a.75.75 0 0 0 .001-1.5m-2.302 2.976H9.326l-.111-1.476h21.531zM14.308 6.348c0-1.423.58-2.003 2.003-2.003h7.378c.578 0 1.053.117 1.389.333c.413.287.613.833.613 1.67v.956H14.308zm14.498 28.224c-.019.81-.295 1.083-1.095 1.083H12.25c-.818 0-1.094-.269-1.096-1.123L9.439 11.779h21.082z"/><path fill="currentColor" d="M17.401 12.969a.75.75 0 0 0-.722.776l.704 19.354a.75.75 0 0 0 .748.723l.028-.001a.75.75 0 0 0 .722-.776l-.703-19.355c-.015-.414-.353-.757-.777-.721m-4.649.001a.75.75 0 0 0-.696.8l1.329 19.354a.75.75 0 0 0 .747.698l.053-.002a.75.75 0 0 0 .696-.8l-1.329-19.354a.756.756 0 0 0-.8-.696m9.784-.001c-.419-.04-.762.308-.776.722l-.705 19.354a.75.75 0 0 0 .722.776l.028.001a.75.75 0 0 0 .748-.723l.705-19.354a.75.75 0 0 0-.722-.776m4.649.001a.757.757 0 0 0-.8.696L25.056 33.02a.75.75 0 0 0 .696.8l.053.002a.75.75 0 0 0 .747-.698l1.329-19.354a.75.75 0 0 0-.696-.8"/></svg>
                </button>
            </div>
            <label class="createRubrica_label" for="">Pregunta/Descripción</label>
            <input class="createRubrica_input criterio_titulo" type="text" placeholder="Escribe la descripcion o la pregunta de este criterio">
            <label class="createRubrica_label" for="">Ponderación</label>
            <input class="createRubrica_input criterio_ponderacion" type="text" placeholder="Escribe la ponderación de este criterio">
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea criterio_se" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">Sobre el estandar</p>
            </div>
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea criterio_e" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">En el estandar</p>
            </div>
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea criterio_ae" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">Acercandose al estandar</p>
            </div>
            <!-- CRITERIO POINT -->
            <div class="createRubrica_criterioFlex">
                <textarea placeholder="Escribe la descripcion del puntaje correspondiente" class="createRubrica_textarea criterio_de" name="" id=""></textarea>
                <p class="createRubrica_criterioPoint">Debajo del estandar</p>
            </div>
        </article>`);
}

export default CriterioNuevo;