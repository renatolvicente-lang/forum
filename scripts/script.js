const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";

if (localStorage.getItem("mm_forum_auth") === "1") {
    window.location.href = "home.html";
}

function setAlert(targetId, type, message) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.classList.remove("d-none", "alert-danger", "alert-success", "alert-warning", "alert-info");
    el.classList.add(`alert-${type}`);
    el.textContent = message;
}

function hideAlert(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.classList.add("d-none");
    el.textContent = "";
}

// Alterna a tela do "pop-up"/card (login <-> cadastro).
function alternarTelaAuth(destino) {
    const loginView = document.getElementById("loginView");
    const signupView = document.getElementById("signupView");

    hideAlert("mensagemLogin");
    hideAlert("mensagemCadastro");

    if (!loginView || !signupView) return;

    const irParaCadastro = destino === "cadastro";
    loginView.classList.toggle("d-none", irParaCadastro);
    signupView.classList.toggle("d-none", !irParaCadastro);
}

function validarLogin(event) {
    event.preventDefault();
    hideAlert("mensagemLogin");

    const usuario = document.getElementById("usuario")?.value.trim() ?? "";
    const senha = document.getElementById("senha")?.value.trim() ?? "";

    if (!usuario || !senha) {
        setAlert("mensagemLogin", "danger", "Nenhum campo pode estar vazio.");
        return;
    }

    if (usuario !== USUARIO_CORRETO || senha !== SENHA_CORRETA) {
        setAlert("mensagemLogin", "danger", "Usuário ou senha incorretos.");
        return;
    }

    localStorage.setItem("mm_forum_auth", "1");
    localStorage.setItem("mm_forum_user", usuario);
    window.location.href = "home.html";
}

function validarCadastro(event) {
    event.preventDefault();
    hideAlert("mensagemCadastro");

    const novoUsuario = document.getElementById("cadUsuario")?.value.trim() ?? "";
    const novaSenha = document.getElementById("cadSenha")?.value.trim() ?? "";
    const confirmarSenha = document.getElementById("cadConfirmarSenha")?.value.trim() ?? "";

    if (!novoUsuario || !novaSenha || !confirmarSenha) {
        setAlert("mensagemCadastro", "danger", "Nenhum campo pode estar vazio.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        setAlert("mensagemCadastro", "danger", "As senhas não coincidem.");
        return;
    }

    setAlert(
        "mensagemCadastro",
        "success",
        'Cadastro simulado com sucesso! Para entrar, use o login fixo do projeto: "admin" / "1234".',
    );

    document.getElementById("Cadastro")?.reset();
    setTimeout(() => alternarTelaAuth("login"), 800);
}

document.getElementById("Login")?.addEventListener("submit", validarLogin);
document.getElementById("Cadastro")?.addEventListener("submit", validarCadastro);

document.getElementById("linkIrCadastro")?.addEventListener("click", (e) => {
    e.preventDefault();
    alternarTelaAuth("cadastro");
});

document.getElementById("linkIrLogin")?.addEventListener("click", (e) => {
    e.preventDefault();
    alternarTelaAuth("login");
});

window.alternarTelaAuth = alternarTelaAuth;
