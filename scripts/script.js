const USUARIO_CORRETO = 'admin';
const SENHA_CORRETA = '1234';

function validarLogin(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const mensagemErro = document.getElementById('mensagemErro');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    mensagemErro.classList.add('d-none');
    mensagemSucesso.classList.add('d-none');

    if (!usuario || !senha) {
        mensagemErro.textContent = 'Preencha todos os campos.';
        mensagemErro.classList.remove('d-none');
        return;
    }

    if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
        window.location.href = 'home.html';
    } else {
        mensagemErro.textContent = 'Usuário ou senha incorretos.';
        mensagemErro.classList.remove('d-none');
    }
}

document.getElementById('Login').addEventListener('submit', validarLogin);