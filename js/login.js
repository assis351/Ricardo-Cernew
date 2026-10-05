/* =========================
   CONTROLE DE TELAS
========================= */
function mostrarLogin() {
    document.getElementById("cadastro-area").style.display = "none";
    document.getElementById("login-area").style.display = "block";
}

function mostrarCadastro() {
    document.getElementById("login-area").style.display = "none";
    document.getElementById("cadastro-area").style.display = "block";
}

/* =========================
   VALIDAÇÃO
========================= */
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOGIN
    ========================= */
    const btnEntrar = document.getElementById("btnEntrar");

    btnEntrar.addEventListener("click", () => {
        const email = document.getElementById("login-email").value.trim();
        const senha = document.getElementById("login-senha").value.trim();

        if (!email || !senha) {
            alert("Preencha e-mail e senha para entrar.");
            return;
        }

        if (!validarEmail(email)) {
            alert("E-mail inválido.");
            return;
        }

        alert("Login em desenvolvimento. Em breve você poderá acompanhar seu processo por aqui.");
    });

    /* =========================
       CADASTRO
    ========================= */
    const btnCadastrar = document.getElementById("btnCadastrar");

    btnCadastrar.addEventListener("click", () => {

        const usuario = document.getElementById("cad-usuario").value.trim();
        const email = document.getElementById("cad-email").value.trim();
        const senha = document.getElementById("cad-senha").value.trim();

        if (!usuario || !email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }

        if (!validarEmail(email)) {
            alert("E-mail inválido.");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        alert("Cadastro realizado com sucesso!");
        mostrarLogin();
    });

    /* =========================
       LOGIN / CADASTRO SOCIAL (SIMULAÇÃO)
    ========================= */
    document.querySelectorAll(".social-login").forEach(btn => {
        btn.addEventListener("click", () => {
            const rede = btn.dataset.rede || "social";
            alert(`Login com ${rede} em desenvolvimento.`);
        });
    });

});
