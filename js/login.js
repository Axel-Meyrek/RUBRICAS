/* VARIABLES Y COMPONENTES */
const $buttonLogin = document.querySelector('#buttonLogin');

const $id = document.querySelector('#inputLoginID');

const $password = document.querySelector('#inputLoginPassword');

/* FUNCIONES */
const validarLogin = e => {
    e.preventDefault();

    if($id.value == '') {
        $id.classList.add('formLogin_input--error');
        return;
    }
    if($password.value === '') {
        $password.classList.add('formLogin_input--error');
        return;
    }
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

/* EVENTOS */
$buttonLogin.addEventListener('click', validarLogin);

$id.addEventListener('input', removeErrorInput);

$password.addEventListener('input', removeErrorInput);