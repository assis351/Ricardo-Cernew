document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. ANIMAÇÃO AO ROLAR A PÁGINA
    =============================== */
    const elementos = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(el => observer.observe(el));


    /* ===============================
       2. CARROSSEL DE POSTS
    =============================== */
    const carousel = document.querySelector(".carousel");
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener("mousedown", e => {
        isDown = true;
        carousel.classList.add("dragging");
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mouseleave", () => {
        isDown = false;
        carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mouseup", () => {
        isDown = false;
        carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll
    setInterval(() => {
        carousel.scrollLeft += 320;
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
            carousel.scrollLeft = 0;
        }
    }, 5000);


    /* ===============================
       3. MODAL "LER MAIS"
    =============================== */
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        display:none;
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.85);
        z-index:9999;
        justify-content:center;
        align-items:center;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
        width:90%;
        max-width:900px;
        height:85vh;
        background:#fff;
        border-radius:12px;
        overflow:hidden;
        position:relative;
        animation:fadeIn .3s ease;
    `;

    modal.innerHTML = `
        <button id="closeModal" style="
            position:absolute;
            top:12px;
            right:16px;
            font-size:28px;
            border:none;
            background:none;
            cursor:pointer;
        ">&times;</button>
        <iframe style="width:100%; height:100%; border:none;"></iframe>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const iframe = modal.querySelector("iframe");
    const closeBtn = modal.querySelector("#closeModal");

    document.querySelectorAll(".lermais").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            iframe.src = link.href;
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    function fecharModal() {
        overlay.style.display = "none";
        iframe.src = "";
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", fecharModal);

    overlay.addEventListener("click", e => {
        if (e.target === overlay) fecharModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") fecharModal();
    });

});

