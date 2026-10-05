document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");
    const copyBtn = document.getElementById("copyBtn");

    const errEmail = document.getElementById("err-email");
    const errPhone = document.getElementById("err-phone");
    const errDate = document.getElementById("err-date");
    const errTime = document.getElementById("err-time");

    status.style.display = "none";
    errEmail.style.display = "none";
    errPhone.style.display = "none";
    errDate.style.display = "none";
    errTime.style.display = "none";

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarTelefone(tel) {
        return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(tel);
    }

    function dataFutura(data) {
        const hoje = new Date();
        hoje.setHours(0,0,0,0);
        return new Date(data) >= hoje;
    }

    function horaValida(hora) {
        return hora !== "";
    }

    form.addEventListener("submit", e => {
        e.preventDefault();

        errEmail.style.display = "none";
        errPhone.style.display = "none";
        errDate.style.display = "none";
        errTime.style.display = "none";
        status.style.display = "none";

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const area = form.area.value;
        const date = form.date.value;
        const time = form.time.value;
        const message = form.message.value.trim();

        let valido = true;

        if (!validarEmail(email)) {
            errEmail.style.display = "block";
            valido = false;
        }

        if (!validarTelefone(phone)) {
            errPhone.style.display = "block";
            valido = false;
        }

        if (!dataFutura(date)) {
            errDate.style.display = "block";
            valido = false;
        }

        if (!horaValida(time)) {
            errTime.style.display = "block";
            valido = false;
        }

        if (!valido) return;

        const corpoEmail =
`Nome: ${name}
E-mail: ${email}
Telefone: ${phone}
Área de atuação: ${area}
Data desejada: ${date}
Hora desejada: ${time}

Mensagem:
${message || "Não informada."}
`;

        const assunto = encodeURIComponent("Solicitação de Consulta Jurídica");
        const corpo = encodeURIComponent(corpoEmail);
        const mailto = `mailto:pedromamao05@gmail.com?subject=${assunto}&body=${corpo}`;

        window.location.href = mailto;

        status.style.display = "inline";
    });

    copyBtn.addEventListener("click", () => {
        const texto =
`Consulta Jurídica
--------------------
Nome: ${form.name.value}
E-mail: ${form.email.value}
Telefone: ${form.phone.value}
Área: ${form.area.value}
Data: ${form.date.value}
Hora: ${form.time.value}
Mensagem: ${form.message.value || "Não informada."}
`;

        navigator.clipboard.writeText(texto).then(() => {
            status.textContent = "Dados copiados para a área de transferência!";
            status.style.display = "inline";
        });
    });

});