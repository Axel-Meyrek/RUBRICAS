/* VARIABLES Y COMPONENTES */
const buttonsNav = document.querySelectorAll('.buttonNavigate');

const $buttonMenu = document.querySelector('#buttonMenu');

const $nav = document.querySelector('#nav');

const $btnCerrarSesion = document.querySelector('#btnCerrarSesion');


/* FUNCIONES */
const hiddenAllWindows = () => {
    const $windows = document.querySelectorAll('.window');
    $windows.forEach(window => window.classList.remove('showWindow'));
}

const addEventsButtons = () => {
    buttonsNav.forEach(button => button.addEventListener('click', (e) => {
        desactiveAllButtons();
        activeButton(e);
        desactiveMenu();
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

const activeAndDesactiveMenu = () => {
    $nav.classList.toggle('nav--active');
}

const desactiveMenu = () => {
    $nav.classList.remove('nav--active');
}

const cerraSession = () => {
    localStorage.removeItem('Sesion');
    window.location.href = '../pages/login.html';
}

/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {

    addEventsButtons();
});

$buttonMenu.addEventListener('click', activeAndDesactiveMenu);

$btnCerrarSesion.addEventListener('click', cerraSession);