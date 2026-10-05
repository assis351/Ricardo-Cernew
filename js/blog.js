document.addEventListener("DOMContentLoaded", () => {

    // Criar overlay do modal
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
        justify-content: center;
        align-items: center;
    `;

    // Criar modal
    const modal = document.createElement("div");
    modal.style.cssText = `
        background: #fff;
        width: 90%;
        max-width: 900px;
        height: 85vh;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        animation: aparecer 0.3s ease;
    `;

    // Conteúdo do modal
    modal.innerHTML = `
        <button id="fecharModal" style="
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 28px;
            background: none;
            border: none;
            cursor: pointer;
        ">&times;</button>

        <iframe id="iframeConteudo" 
            style="width:100%; height:100%; border:none;">
        </iframe>
    `;


    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const iframe = modal.querySelector("#iframeConteudo");
    const fecharBtn = modal.querySelector("#fecharModal");

    // Abrir modal ao clicar em "Ler mais"
    document.querySelectorAll(".lermais").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            iframe.src = link.href;
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    // Fechar modal
    function fecharModal() {
        overlay.style.display = "none";
        iframe.src = "";
        document.body.style.overflow = "";
    }

    fecharBtn.addEventListener("click", fecharModal);

    // Fechar clicando fora
    overlay.addEventListener("click", e => {
        if (e.target === overlay) fecharModal();
    });

    // Fechar com ESC
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") fecharModal();
    });

});