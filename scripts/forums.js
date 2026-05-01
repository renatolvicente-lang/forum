function voteKey(rawKey) {
    return `mm_forum_votes_${rawKey}`;
}

function readVotes(rawKey) {
    const value = localStorage.getItem(voteKey(rawKey));
    const num = Number.parseInt(value || "0", 10);
    return Number.isFinite(num) ? num : 0;
}

function writeVotes(rawKey, value) {
    localStorage.setItem(voteKey(rawKey), String(value));
}

function findVoteMessageEl(fromButton) {
    const cardBody = fromButton.closest(".card-body");
    return cardBody?.querySelector(".js-vote-message") || null;
}

function showVoteMessage(fromButton, message) {
    const el = findVoteMessageEl(fromButton);
    if (!el) return;
    el.textContent = message;
    el.classList.remove("d-none");
}

function updateButtonCount(btn) {
    const rawKey = btn.getAttribute("data-vote-key");
    if (!rawKey) return;
    const countEl = btn.querySelector("[data-vote-count]");
    if (!countEl) return;
    countEl.textContent = String(readVotes(rawKey));
}

function wireVotes() {
    const buttons = document.querySelectorAll("[data-vote-key]");
    buttons.forEach((btn) => updateButtonCount(btn));

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const rawKey = btn.getAttribute("data-vote-key");
            if (!rawKey) return;
            const next = readVotes(rawKey) + 1;
            writeVotes(rawKey, next);
            updateButtonCount(btn);
            showVoteMessage(btn, "Voto registrado! (Salvo neste navegador)");
        });
    });
}

document.addEventListener("DOMContentLoaded", wireVotes);

