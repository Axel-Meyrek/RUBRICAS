const CriterioHola = (iterador, ponderacion, titulo, descripcion_se, descripcion_e, descripcion_ae, descripcion_de) => {
    return (
        /* html */
        `<article class="question">
            <p class="question_puntaje">Puntaje: <span>${ponderacion}%</span></p>
            <h3 class="question_title">Criterio ${iterador+1}: ${titulo}</h3>
            <div class="question_botonera">
                <div class="question_flex">
                    <p class="question_description">${descripcion_se}</p>
                    <button class="question_buttonCalification">
                        <svg class="question_icon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0M3.343 8.223a.25.25 0 0 1 .25-.25h6.782a.25.25 0 0 1 .25.25c0 .552-.27 1.337-.852 1.983c-.59.656-1.504 1.173-2.79 1.173c-1.284 0-2.198-.517-2.789-1.173c-.581-.646-.85-1.43-.85-1.983Zm1.239-2.247a1.024 1.024 0 0 1 .002-2.049h.003a1.024 1.024 0 0 1-.003 2.049zm4.831 0a1.024 1.024 0 0 1 .003-2.049h.002a1.024 1.024 0 0 1-.002 2.049z" clip-rule="evenodd"/></svg>
                        <p class="question_label">Sobre el estándar</p>
                    </button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_e}</p>
                    <button class="question_buttonCalification">
                        <svg class="question_icon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M14 7A7 7 0 1 0 0 7a7 7 0 0 0 14 0m-3.56-2.048c0 .565-.457 1.023-1.022 1.024h-.002a1.025 1.025 0 0 1-.003-2.049h.003c.565 0 1.024.459 1.024 1.025m-4.831 0c0 .565-.457 1.023-1.022 1.024h-.003a1.025 1.025 0 0 1-.002-2.049h.002c.566 0 1.025.459 1.025 1.025M4.189 7.76a.625.625 0 1 0-1.206.325a4.163 4.163 0 0 0 8.038 0a.625.625 0 1 0-1.207-.325a2.913 2.913 0 0 1-5.624 0" clip-rule="evenodd"/></svg>
                        <p class="question_label">En el estándar</p>
                    </button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_ae}</p>
                    <button class="question_buttonCalification">
                        <svg class="question_icon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m6.48 15.38a1 1 0 0 1-1.19.76A6.2 6.2 0 0 0 16 16a6 6 0 0 0-4.6 2.14a1 1 0 0 1-.76.36a1 1 0 0 1-.77-1.64A8 8 0 0 1 16 14a7.5 7.5 0 0 1 1.71.19a1 1 0 0 1 .77 1.19M9.5 9a2 2 0 1 1-2-2a2 2 0 0 1 2 2m5 0a2 2 0 1 1 2 2a2 2 0 0 1-2-2"/></svg>
                        <p class="question_label">Acercándose al estándar</p>
                    </button>
                </div>
                <div class="question_flex">
                    <p class="question_description">${descripcion_de}</p>
                    <button class="question_buttonCalification">
                        <svg class="question_icon" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16"><path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M3.65 6.718a.59.59 0 0 1-.14-.83c.19-.27.57-.34.84-.14c0 0 .33.21.84.07c.5-.14.69-.48.69-.49a.61.61 0 0 1 .8-.27c.29.14.42.49.28.78c-.04.09-.42.85-1.47 1.13c-.24.06-.45.09-.65.09c-.68 0-1.13-.29-1.19-.34m6.875.267c-1.045-.279-1.426-1.042-1.47-1.129v-.001c-.14-.3 0-.66.29-.8c.3-.14.66 0 .8.29c0 0 .18.34.69.48c.481.132.793-.048.844-.077l.006-.003c.27-.17.64-.1.83.17c.18.27.12.63-.15.82l-.003.001c-.069.046-.506.339-1.187.339c-.2 0-.42-.02-.65-.09m1.184 5.077a.6.6 0 0 1-.771-.353C10.566 10.71 9.375 10.1 8 10.1s-2.566.609-2.938 1.61a.6.6 0 0 1-1.124-.42C4.558 9.625 6.37 8.9 8 8.9c1.629 0 3.443.724 4.062 2.39a.6.6 0 0 1-.353.772"/></svg>                        
                        <p class="question_label">Debajo del estándar</p>
                    </button>
                </div>
            </div>
        </article>`);
}

export default CriterioHola;