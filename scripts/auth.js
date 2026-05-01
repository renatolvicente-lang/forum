function isAuthenticated() {
    return localStorage.getItem("mm_forum_auth") === "1";
}

function getUserName() {
    return localStorage.getItem("mm_forum_user") || "Visitante";
}

function requireAuth() {
    if (isAuthenticated()) return;
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("mm_forum_auth");
    localStorage.removeItem("mm_forum_user");
    window.location.href = "index.html";
}

function wireAuthUi() {
    const navUser = document.getElementById("navUser");
    if (navUser) navUser.textContent = getUserName();

    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
}

requireAuth();
document.addEventListener("DOMContentLoaded", wireAuthUi);

window.mmForumLogout = logout;

