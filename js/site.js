/* =========================================================
   SITE.JS — Comportamentos compartilhados por todas as páginas
   1. Menu mobile (hambúrguer)
   2. Animações de entrada ao rolar a página (scroll reveal)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       1. MENU MOBILE
    ----------------------------- */
    const header = document.querySelector(".menu-header");

    if (header) {
        const menuCenter = header.querySelector(".menu-center");

        const toggle = document.createElement("button");
        toggle.className = "menu-toggle";
        toggle.setAttribute("aria-label", "Abrir menu");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = "<span></span><span></span><span></span>";

        header.insertBefore(toggle, header.querySelector(".menu-right"));

        toggle.addEventListener("click", () => {
            const aberto = menuCenter.classList.toggle("aberto");
            toggle.classList.toggle("aberto", aberto);
            toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
        });

        // Fecha o menu ao clicar em um link (mobile)
        menuCenter.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menuCenter.classList.remove("aberto");
                toggle.classList.remove("aberto");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* -----------------------------
       2. SCROLL REVEAL
    ----------------------------- */
    const alvosPadrao = document.querySelectorAll(
        "section, .previdenciario, .trabalhista, .civil, .posts .post, " +
        ".areas .card, .valores .card, .depoimentos .cards .card, " +
        ".container > .card, main.card, .faq-item, .carousel .post, " +
        "#cadastro-area, #login-area"
    );

    alvosPadrao.forEach(el => {
        if (!el.classList.contains("reveal")) {
            el.classList.add("reveal");
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

});
