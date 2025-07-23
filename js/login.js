/* VARIABLES Y COMPONENTES */
const $buttonLogin = document.querySelector('#buttonLogin');

const $id = document.querySelector('#inputLoginID');

const $password = document.querySelector('#inputLoginPassword');


/* FUNCIONES */
const validarLogin = () => {
    if($id.value === '' && $password.value === '') {
        $id.classList.add('formLogin_input--error');
        $password.classList.add('formLogin_input--error');
        return false;
    }

    if($id.value ==='') {
        $id.classList.add('formLogin_input--error');
        return false;
    }
    if($password.value === '') {
        $password.classList.add('formLogin_input--error');
        return false;
    }

    return true;
}

const removeErrorInput = (e) => {
    e.target.classList.remove('formLogin_input--error');
}

const redirectionUser = (tipoUser) => {
    if(tipoUser === 'profesor') window.location.href = '../pages/profesor.html';
    if(tipoUser === 'administrador') window.location.href = '../pages/admin.html';
}

const saveSessionInLocalStorach = (data) => {
    localStorage.setItem('Sesion', JSON.stringify(data));
}

const recuperarUser = async e => {
    e.preventDefault();

    if(!validarLogin()) return;

    const id = $id.value;
    const password = $password.value;

    const URL = '../api/login.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ id, password}),
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    if(data.error) {
        usuarioNoEncontrado();
        validarLogin();
        return;
    }

    saveSessionInLocalStorach(data);

    redirectionUser(data.tipo);
}

const usuarioNoEncontrado = () => {
    $id.value = '';
    $password.value = '';

    const $alertUserNotFound = document.querySelector('#alertUserNotFound');
    $alertUserNotFound.hidden = false;
}

/* EVENTOS */
$buttonLogin.addEventListener('click', recuperarUser);

$id.addEventListener('input', removeErrorInput);

$password.addEventListener('input', removeErrorInput);

document.addEventListener('DOMContentLoaded', () => {

    const sesion = localStorage.getItem('Sesion');
    if(sesion) {
        const data = JSON.parse(sesion);
        redirectionUser(data.tipo);
    }
    
});