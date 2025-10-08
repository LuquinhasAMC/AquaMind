const createPromptContainer = document.getElementById("create-prompt-container");
const butto0nOpenCreatePrompt = document.getElementById("button-open-create-prompt");

// selects
const typeResponse = document.getElementById("typeResponse");
const typeTopic = document.getElementById("typeTopic");
const typeResponseAI = document.getElementById("typeResponseAI");

// divs
const viewAITextResponseContainer = document.getElementById("view-ai-text-response-container");
const loadingResponseContainer = document.getElementById("loading-response-container");
const noResponseAIViewContainer = document.getElementById("no-response-ai-view-container");
const viewContentResponse = document.getElementById("view-content-response");

// Alert
const alertContainer = document.getElementById("alert-container");
const alertMenssage = document.getElementById("alert-menssage");

// Bottom buttons
const bottmButtons = document.querySelectorAll(".bottom-buttons");

function showAlert(message) {
    alertMenssage.textContent = message;
    alertContainer.style.display = "block";
    setTimeout(() => {
        alertContainer.style.opacity = "1";
    }, 300);

    setTimeout(() => {
        alertContainer.style.opacity = "0";
        setTimeout(() => {
            alertContainer.style.display = "none";
        }, 500);
    }, 3000);
}

function toggleCreaetePrompt() {
    if (createPromptContainer.style.display === "flex") {
        createPromptContainer.style.maxHeight = "0";
        setTimeout(() => {
            createPromptContainer.style.display = "none";
        }, 500);
        butto0nOpenCreatePrompt.textContent = "Criar um novo prompt";
    } else { 
        createPromptContainer.style.display = "flex";
        setTimeout(() => {
            createPromptContainer.style.maxHeight = "500px";
        }, 170);
        butto0nOpenCreatePrompt.textContent = "Fechar";
    }
}

function clearResponse() {
    if (getComputedStyle(noResponseAIViewContainer).display === "flex") {
        showAlert("Não há resposta para limpar.");
        return;
    }
    viewContentResponse.innerHTML = "";
    noResponseAIViewContainer.style.display = "flex";
    viewAITextResponseContainer.style.display = "none";
    loadingResponseContainer.style.display = "none";
}

function copyResponse() {
    if (getComputedStyle(noResponseAIViewContainer).display === "flex") {
        showAlert("Não há resposta para copiar.");
        return;
    }
    const textToCopy = viewContentResponse.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showAlert("Resposta copiada para a área de transferência!");
    }).catch(err => {
        showAlert("Erro ao copiar a resposta: " + err);
    });
}

function audioResponse() {
    if (getComputedStyle(noResponseAIViewContainer).display === "flex") {
        showAlert("Não há resposta para ouvir.");
        return;
    }
    const textToSpeak = viewContentResponse.innerText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
    showAlert("Lendo a resposta em voz alta...");
}

function loadingResponseShow() {
    loadingResponseContainer.style.display = "flex";
    viewAITextResponseContainer.style.display = "none";
    noResponseAIViewContainer.style.display = "none";

    bottmButtons.forEach(button => {
        button.disabled = true;
    });
}

function loadingResponseHide() {
    if (viewContentResponse.innerHTML.trim() === "") {
        noResponseAIViewContainer.style.display = "flex";
        viewAITextResponseContainer.style.display = "none";
        loadingResponseContainer.style.display = "none";

        bottmButtons.forEach(button => {
            button.disabled = false;
        });
    } else {
        noResponseAIViewContainer.style.display = "none";
        viewAITextResponseContainer.style.display = "flex";
        loadingResponseContainer.style.display = "none";

        bottmButtons.forEach(button => {
            button.disabled = false;
        });
    }
}

async function genereteResponse() {
    const questionValue = typeResponse.value;
    const topicValue = typeTopic.value;
    const responseAIValue = typeResponseAI.value;

    if (questionValue === "none" || topicValue === "none") {
        showAlert("É preciso configurar o prompt para gerar uma resposta.");
        return;
    }

    if (getComputedStyle(createPromptContainer).display === "flex") {
        toggleCreaetePrompt();
    }
    loadingResponseShow();

    try {
        const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: `Você é uma IA especialista em ambiente aquático e deve ajudar os usuários com questões relacionadas aos ecosistemas, aos esportes, a sustentabilidade e a tecnologia dentro do ambiente aquático. ${responseAIValue}. Não pergunte ou solicite algo ao usuário, você deve responder apenas o assunto mas sem ter a intensão de continuar uma conversa sugerindo algo ao usuário.` },
                    { role: 'user', content: `${questionValue} ${topicValue}`},
                ],

                model: "openai",
                private: true
            })
        })

        const dataResponse = await response.text();

        const markdownText = dataResponse;
        const htmlContent = marked.parse(markdownText);

        viewContentResponse.innerHTML = htmlContent;

        showAlert("Resposta gerada com sucesso!");
        loadingResponseHide();
    } catch (error) {
        showAlert("Erro ao gerar a resposta: " + error);
        viewContentResponse.innerHTML = "";
        loadingResponseHide();
    }

}

function discartPrompt() {
    typeResponse.value = "none";
    typeTopic.value = "none";
    toggleCreaetePrompt();
}