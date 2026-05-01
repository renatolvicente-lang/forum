const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";
const USERS_STORAGE_KEY = "mm_forum_users";

if (localStorage.getItem("mm_forum_auth") === "1") {
    window.location.href = "home.html";
}

function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_STORAGE_KEY);
        const obj = raw ? JSON.parse(raw) : {};
        return obj && typeof obj === "object" ? obj : {};
    } catch {
        return {};
    }
}

function writeUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function seedDefaultUser() {
    const users = readUsers();
    if (!users[USUARIO_CORRETO]) {
        users[USUARIO_CORRETO] = SENHA_CORRETA;
        writeUsers(users);
    }
}

seedDefaultUser();

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

    const users = readUsers();
    const senhaCadastrada = users[usuario];
    if (!senhaCadastrada) {
        setAlert("mensagemLogin", "danger", "Usuário não cadastrado. Clique em “Cadastre-se”.");
        return;
    }

    if (senha !== senhaCadastrada) {
        setAlert("mensagemLogin", "danger", "Senha incorreta.");
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

    const users = readUsers();
    if (users[novoUsuario]) {
        setAlert("mensagemCadastro", "danger", "Este usuário já existe. Tente outro.");
        return;
    }

    users[novoUsuario] = novaSenha;
    writeUsers(users);

    setAlert("mensagemCadastro", "success", "Cadastro realizado! Agora você já pode entrar com suas credenciais.");

    document.getElementById("Cadastro")?.reset();
    setTimeout(() => {
        alternarTelaAuth("login");
        const loginUser = document.getElementById("usuario");
        if (loginUser) loginUser.value = novoUsuario;
        document.getElementById("senha")?.focus();
    }, 600);
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

