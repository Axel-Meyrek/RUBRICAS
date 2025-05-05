/* VARIABLES Y COMPONENTES */
const buttonsNav = document.querySelectorAll('.nav_item');


/* FUNCIONES */
const hiddenAllWindows = () => {
    const $windows = document.querySelectorAll('.window');
    $windows.forEach(window => window.classList.remove('showWindow'));
}

const addEventsButtons = () => {
    buttonsNav.forEach(button => button.addEventListener('click', (e) => {
        desactiveAllButtons();
        activeButton(e);
        const nombreVentana = button.childNodes[2].textContent.trim().replace(/ /g, "");
        showWindow(nombreVentana);
    }));
}

const showWindow = (ventanaMostrar) => {
    hiddenAllWindows();
    const selector = '#' + ventanaMostrar;
    console.log(selector)
    const $window = document.querySelector(selector);
    $window.classList.add('showWindow');
}

const activeButton = (e) => {
    console.log(e.target)
    e.target.classList.add('nav_item--active');
}

const desactiveAllButtons = () => {
    buttonsNav.forEach(button => button.classList.remove('nav_item--active'));
}



/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {

    addEventsButtons();
});

