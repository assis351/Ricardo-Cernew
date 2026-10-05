document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todos os títulos que acionam o modal/accordion
    const titulos = document.querySelectorAll(
        ".previdenciario h3, .trabalhista h3, .civil h3"
    );

    titulos.forEach(titulo => {
        const lista = titulo.nextElementSibling;

        // Esconde o conteúdo ao carregar a página
        lista.style.display = "none";
        lista.style.transition = "all 0.3s ease";

        // Cursor indicando que é clicável
        titulo.style.cursor = "pointer";

        titulo.addEventListener("click", () => {

            // Fecha todos os outros abertos
            document.querySelectorAll(".previdenciario ul, .trabalhista ul, .civil ul")
                .forEach(ul => {
                    if (ul !== lista) {
                        ul.style.display = "none";
                    }
                });

            // Abre ou fecha o atual
            if (lista.style.display === "none") {
                lista.style.display = "block";
            } else {
                lista.style.display = "none";
            }
        });
    });

});




