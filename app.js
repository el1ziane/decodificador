const chaveDicionario = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

const imagens = [{
        id: 1,
        name: "inicio",
        class: "imagem",
        src: "img/foxsad.jpeg",
        alt: "Imagem informando nenhum texto"
    },
    {
        id: 2,
        name: "cript",
        class: "imagem",
        src: "img/cat.jpeg",
        alt: "Imagem informando criptografia"
    },
    {
        id: 3,
        name: "decrip",
        class: "imagem",
        src: "img/raposa.jpeg",
        alt: "Imagem informando descriptografia"
    },
    {
        id: 4,
        name: "vazio",
        class: "imagem",
        src: "img/gsad.jpeg",
        alt: "Imagem informando texto null"
    }
];

const imagemResultado = document.getElementById('imagemResultado');
const textoResultado = document.getElementById('textoResultado');

function mostrarImagemInicial() {
    const imagemInicial = imagens.find(img => img.name === "inicio");
    imagemResultado.src = imagemInicial.src;
    imagemResultado.alt = imagemInicial.alt;
    textoResultado.textContent = 'Nenhum texto digitado.';
}

function atualizarResultado(outputText, acao) {
    const imagem = imagens.find(img => img.name === acao);
    imagemResultado.src = imagem.src;
    imagemResultado.alt = imagem.alt;
    textoResultado.textContent = outputText;
}

function verificarCampoVazio(inputText) {
    if (inputText.trim() === '') {
        atualizarResultado('', 'vazio');
        textoResultado.textContent = 'Digite algo, por favor.';
        return true; // Indica que o campo está vazio
    }
    return false; // Indica que o campo não está vazio
}


function criptografar() {
    const inputText = document.getElementById('texto').value.toLowerCase();
    let outputText = '';


    if (verificarCampoVazio(inputText)) {
        return;
    }

    const expressaoRegular = new RegExp(Object.values(chaveDicionario).join('|'), 'g');
    outputText = inputText.replace(expressaoRegular, (match) => Object.keys(chaveDicionario).find(key => chaveDicionario[key] === match));

    atualizarResultado(outputText, 'cript');
    limparCampo();
}

function descriptografar() {
    const inputText = document.getElementById('texto').value.toLowerCase();
    let outputText = '';


    if (verificarCampoVazio(inputText)) {
        return;
    }
    const expressaoRegular = new RegExp(Object.keys(chaveDicionario).join('|'), 'g');
    outputText = inputText.replace(expressaoRegular, (match) => chaveDicionario[match]);

    atualizarResultado(outputText, 'decrip');
    limparCampo();
}

function limparCampo() {
    const inputText = document.getElementById('texto');
    inputText.value = '';
}

function copiar() {
    const texto = textoResultado.textContent;
    const textareaTemporaria = document.createElement('textarea');
    document.body.appendChild(textareaTemporaria);
    textareaTemporaria.value = texto;
    textareaTemporaria.select();
    document.execCommand('copy');
    document.body.removeChild(textareaTemporaria);
    alert("Texto copiado: " + texto);

    limparCampo();
}

document.querySelector(".copy").addEventListener("click", copiarTexto);
mostrarImagemInicial();