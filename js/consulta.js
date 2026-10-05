// AUDIÊNCIAS CADASTRADAS PELO ESCRITÓRIO
const audiencias = [
    {
        data: "10/02/2025",
        hora: "14:30",
        tipo: "Audiência de Instrução",
        observacao: "Fórum Central – Sala 302"
    },
    {
        data: "25/03/2025",
        hora: "09:00",
        tipo: "Audiência de Conciliação",
        observacao: "Videoconferência"
    }
];

const lista = document.getElementById("listaAudiencias");

audiencias.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item-audiencia");

    div.innerHTML = `
        <div class="data">${item.data} às ${item.hora}</div>
        <div class="tipo">${item.tipo}</div>
        <div class="obs">${item.observacao}</div>
    `;

    lista.appendChild(div);
});

// PROCESSOS SIMULADOS
const processos = {
    "0001234-56.2024.8.26.0000": {
        faseAtual: "Processo em fase de Audiência de Instrução",
        fases: [
            "Distribuição do Processo",
            "Citação da Parte Ré",
            "Contestação",
            "Réplica",
            "Audiência de Instrução"
        ]
    }
};

function consultarProcesso() {
    const numero = document.getElementById("numeroProcesso").value;
    const resultado = document.getElementById("resultado");
    const faseAtual = document.getElementById("faseAtual");
    const timeline = document.getElementById("timeline");

    timeline.innerHTML = "";

    if (processos[numero]) {
        resultado.style.display = "block";
        faseAtual.innerText = processos[numero].faseAtual;

        processos[numero].fases.forEach(fase => {
            const li = document.createElement("li");
            li.innerText = fase;
            timeline.appendChild(li);
        });
    } else {
        alert("Processo não encontrado.");
    }
}