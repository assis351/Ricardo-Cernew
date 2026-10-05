document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. ANIMAÇÃO AO SCROLL
    =============================== */
    const elementosAnimados = document.querySelectorAll(
        ".sobre p, .sobre h1, .sobre h2, .valores .card, .depoimentos .card"
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elementosAnimados.forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });


    /* ===============================
       2. CARROSSEL DE DEPOIMENTOS
    =============================== */
    const cardsContainer = document.querySelector(".depoimentos .cards");
    let index = 0;

    function moverCarousel() {
        const cards = document.querySelectorAll(".depoimentos .card");
        if (window.innerWidth > 900) return; // desktop fica estático

        index++;
        if (index >= cards.length) index = 0;

        cardsContainer.style.transform = `translateX(-${index * 100}%)`;
        cardsContainer.style.transition = "transform 0.6s ease";
    }

    let carouselInterval = setInterval(moverCarousel, 5000);

    cardsContainer.addEventListener("mouseenter", () => {
        clearInterval(carouselInterval);
    });

    cardsContainer.addEventListener("mouseleave", () => {
        carouselInterval = setInterval(moverCarousel, 5000);
    });


    /* ===============================
       3. MODAL – VER TODAS AVALIAÇÕES
    =============================== */
    const btnAvaliacoes = document.querySelector(".avaliacoes");

    const overlay = document.createElement("div");
    overlay.style.cssText = `
        display:none;
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.8);
        z-index:9999;
        justify-content:center;
        align-items:center;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
        background:rgba(0,0,0,.8);
        max-width:900px;
        width:90%;
        max-height:85vh;
        overflow-y:auto;
        padding:30px;
        border-radius:14px;
        position:relative;
        animation:fadeUp .3s ease;
    `;

    modal.innerHTML = `
        <button id="closeAvaliacoes" style="
            position:absolute;
            top:15px;
            right:18px;
            font-size:28px;
            border:none;
            background:none;
            cursor:pointer;
        ">&times;</button>
        <h2>Avaliações dos Clientes</h2>
        ${document.querySelector(".depoimentos .cards").outerHTML}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    btnAvaliacoes.addEventListener("click", () => {
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    function fecharModal() {
        overlay.style.display = "none";
        document.body.style.overflow = "";
    }

    modal.querySelector("#closeAvaliacoes").addEventListener("click", fecharModal);

    overlay.addEventListener("click", e => {
        if (e.target === overlay) fecharModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") fecharModal();
    });

});

