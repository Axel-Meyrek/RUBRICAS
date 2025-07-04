/* VARIABLES Y COMPONENTES */
const $buttonLogin = document.querySelector('#buttonLogin');

/* FUNCIONES */
const validarLogin = e => {
    e.preventDefault();
    const $id = document.querySelector('#inputLoginID');
    const $password = document.querySelector('#inputLoginPassword');

    if($id.value === '') return;
    if($password.value === '') return;

    recuperarUser();
}

const recuperarUser = async () => {
    const id = document.querySelector('#inputLoginID').value;
    const password = document.querySelector('#inputLoginPassword').value;

    const URL = '../api/login.php';
    const options = {
        method: 'POST',
        body: JSON.stringify({ id, password }),
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    
    saveSessionInLocalStorach(data);
    redirectionUser(data.tipo);
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