// Elementos do DOM
const createPromptContainer = document.getElementById("create-prompt-container");
const buttonOpenCreatePrompt = document.getElementById("button-open-create-prompt");

// selects
const typeResponse = document.getElementById("typeResponse");
const typeTopic = document.getElementById("typeTopic");
const typeResponseAI = document.getElementById("typeResponseAI");

// divs
const viewAITextResponseContainer = document.getElementById("view-ai-text-response-container");
const loadingResponseContainer = document.getElementById("loading-response-container");
const noResponseAIViewContainer = document.getElementById("no-response-ai-view-container");
const viewContentResponse = document.getElementById("view-content-response");

// Bottom buttons
const bottmButtons = document.querySelectorAll(".bottom-buttons");

// API key
const apiDefault = "https://api.npoint.io/2422e2e983914d09e6aa";

// Configurações
let config = {
    usePersonalAPI: false,
    personalAPI: "",
    apiDefault: "",
    useLargeFont: false
}


const personalInputAPI = document.getElementById("api-input");
const switchUsePersonalAPI = document.getElementById("use-personal-api");
const switchUseLargeFont = document.getElementById("use-large-font");

function saveConfig() {
    localStorage.setItem("config", JSON.stringify(config));
}

async function loadConfig() {
    const savedConfig = localStorage.getItem("config");
    if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        config = { ...config, ...parsed };
    } else {
        localStorage.setItem("config", JSON.stringify(config));
    }
    personalInputAPI.value = config.personalAPI;
    switchUsePersonalAPI.checked = config.usePersonalAPI;
    switchUseLargeFont.checked = config.useLargeFont;
    altereFontSize();
}

loadConfig();

function saveAPIKey() {
    config.personalAPI = personalInputAPI.value;
    saveConfig();
}

function toggleUsePersonalAPI() {
    config.usePersonalAPI = switchUsePersonalAPI.checked;
    saveConfig();
}

function altereFontSize() {
    if (config.useLargeFont) {
        viewContentResponse.style.fontSize = "1.5em";
    } else {
        viewContentResponse.style.fontSize = "1em";
    }
}

function toggleLargeFont() {
    config.useLargeFont = switchUseLargeFont.checked;
    altereFontSize();
    saveConfig();
}

// Show alert
class Alert {
    constructor(text, duration = 3000) {
        this._text = text;
        this._duration = duration;
    }

    showAlert() {
        const atualElementId = `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const alertElement = `
        <div class="alert-container material-glass" id="${atualElementId}">
            <span>${this._text}</span>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', alertElement);
        const elementControl = document.getElementById(atualElementId);

        setTimeout(() => {
            if (elementControl) {
                elementControl.classList.add("alert-container-active")
            }
        }, 10)

        setTimeout(() => {
            if (elementControl) {
                elementControl.style.opacity = '0'
            }
            setTimeout(() => {
                if (elementControl) {
                    elementControl.remove()
                }
            }, 500)
        }, this._duration)
    }
}

// Toggle create prompt
function toggleCreaetePrompt() {
    if (createPromptContainer.style.display === "flex") {
        createPromptContainer.style.maxHeight = "0";
        setTimeout(() => {
            createPromptContainer.style.display = "none";
        }, 500);
        buttonOpenCreatePrompt.innerHTML = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.881px" height="122.88px" viewBox="0 0 122.881 122.88" enable-background="new 0 0 122.881 122.88" xml:space="preserve"><g><path d="M56.573,4.868c0-0.655,0.132-1.283,0.37-1.859c0.249-0.6,0.61-1.137,1.056-1.583C58.879,0.545,60.097,0,61.44,0 c0.658,0,1.287,0.132,1.863,0.371c0.012,0.005,0.023,0.011,0.037,0.017c0.584,0.248,1.107,0.603,1.543,1.039 c0.881,0.88,1.426,2.098,1.426,3.442c0,0.03-0.002,0.06-0.006,0.089v51.62l51.619,0c0.029-0.003,0.061-0.006,0.09-0.006 c0.656,0,1.285,0.132,1.861,0.371c0.014,0.005,0.025,0.011,0.037,0.017c0.584,0.248,1.107,0.603,1.543,1.039 c0.881,0.88,1.428,2.098,1.428,3.441c0,0.654-0.133,1.283-0.371,1.859c-0.248,0.6-0.609,1.137-1.057,1.583 c-0.445,0.445-0.98,0.806-1.58,1.055v0.001c-0.576,0.238-1.205,0.37-1.861,0.37c-0.029,0-0.061-0.002-0.09-0.006l-51.619,0.001 v51.619c0.004,0.029,0.006,0.06,0.006,0.09c0,0.656-0.133,1.286-0.371,1.861c-0.006,0.014-0.012,0.025-0.018,0.037 c-0.248,0.584-0.602,1.107-1.037,1.543c-0.883,0.882-2.1,1.427-3.443,1.427c-0.654,0-1.283-0.132-1.859-0.371 c-0.6-0.248-1.137-0.609-1.583-1.056c-0.445-0.444-0.806-0.98-1.055-1.58h-0.001c-0.239-0.575-0.371-1.205-0.371-1.861 c0-0.03,0.002-0.061,0.006-0.09V66.303H4.958c-0.029,0.004-0.059,0.006-0.09,0.006c-0.654,0-1.283-0.132-1.859-0.371 c-0.6-0.248-1.137-0.609-1.583-1.056c-0.445-0.445-0.806-0.98-1.055-1.58H0.371C0.132,62.726,0,62.097,0,61.44 c0-0.655,0.132-1.283,0.371-1.859c0.249-0.6,0.61-1.137,1.056-1.583c0.881-0.881,2.098-1.426,3.442-1.426 c0.031,0,0.061,0.002,0.09,0.006l51.62,0l0-51.62C56.575,4.928,56.573,4.898,56.573,4.868L56.573,4.868z"/></g></svg>
        Criar novo prompt
        `;
    } else {
        createPromptContainer.style.display = "flex";
        setTimeout(() => {
            createPromptContainer.style.maxHeight = "500px";
        }, 170);
        buttonOpenCreatePrompt.innerHTML = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.878px" height="122.88px" viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" xml:space="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g></svg>
        Fechar
        `;
    }
}

// Clear response
function clearResponse() {
    const alertError = new Alert("Não há resposta para limpar.")
    if (getComputedStyle(noResponseAIViewContainer).display === "flex") {
        alertError.showAlert();
        return;
    }
    viewContentResponse.innerHTML = "";
    noResponseAIViewContainer.style.display = "flex";
    viewAITextResponseContainer.style.display = "none";
    loadingResponseContainer.style.display = "none";
}

// Copy response
function copyResponse() {
    const alertError = new Alert("Não há resposta para copiar.")
    const alertConfirm = new Alert("Resposta copiada para a área de transferência!")
    if (getComputedStyle(noResponseAIViewContainer).display === "flex") {
        alertError.showAlert();
        return;
    }
    const textToCopy = viewContentResponse.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alertConfirm.showAlert();
    }).catch(err => {
        const alertErrorCopy = new Alert("Erro ao copiar a resposta: " + err)
        alertErrorCopy.showAlert()
    });
}

// Audio response
function audioResponse() {
    const alertError = new Alert("Não há resposta para ouvir.")
    const alertConfirm = new Alert("Lendo a resposta em voz alta...")
    if (getComputedStyle(noResponseAIViewContainer).display === "flex") {
        alertError.showAlert();
        return;
    }
    const textToSpeak = viewContentResponse.innerText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
    alertConfirm.showAlert()
}

// Loading response show
function loadingResponseShow() {
    loadingResponseContainer.style.display = "flex";
    viewAITextResponseContainer.style.display = "none";
    noResponseAIViewContainer.style.display = "none";

    bottmButtons.forEach(button => {
        button.disabled = true;
    });
}

// Loading response hide
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

// Generete response
async function genereteResponse() {
    const questionValue = typeResponse.value;
    const topicValue = typeTopic.value;
    const responseAIValue = typeResponseAI.value;
    const alertError = new Alert("É preciso configurar o prompt para gerar uma resposta.")

    if (questionValue === "none" || topicValue === "none") {
        alertError.showAlert();
        return;
    }

    if (getComputedStyle(createPromptContainer).display === "flex") {
        toggleCreaetePrompt();
    }

    loadingResponseShow();

    try {
        // Adicionar timestamp único para evitar cache
        const timestamp = Date.now();
        const uniquePrompt = `${questionValue} ${topicValue} ${responseAIValue} ${timestamp}`;
        const systemRole = `Você é uma IA especialista em ambiente aquático. Responda em português brasileiro. ${responseAIValue}. OBS: Ignore os números no final da mensagem, e suas respostas devem ser únicas, ou seja, não responda como se você esperasse uma resposta do usuário ou sugestão do mesmo.`

        const needsAPIDefault = !config.apiDefault || config.apiDefault === "";
        if (needsAPIDefault) {
            const loadAPIDefault = async () => {
                const response = await fetch(apiDefault);
                const data = await response.json();
                console.log(data);
                return data;
            }
            const data = await loadAPIDefault();
            config.apiDefault = data.api;
            saveConfig();
        }
        const apiKey = config.usePersonalAPI && config.personalAPI !== "" ? config.personalAPI : config.apiDefault;

        const response = await fetch(`https://gen.pollinations.ai/text/${uniquePrompt}?model=gemma&key=${apiKey}&system=${systemRole}&feed=false`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const dataResponse = await response.text();
        const htmlContent = marked.parse(dataResponse);
        const alertConfirmResponse = new Alert("Resposta gerada com sucesso!")
        viewContentResponse.innerHTML = htmlContent;

        alertConfirmResponse.showAlert();
        loadingResponseHide();

    } catch (error) {
        const alertErrorResponse = new Alert("Erro ao gerar a resposta: " + error.message)
        console.error("Erro:", error);
        alertErrorResponse.showAlert()
        viewContentResponse.innerHTML = "";
        loadingResponseHide();
    }
}

// Discart prompt
function discartPrompt() {
    typeResponse.value = "none";
    typeTopic.value = "none";
    toggleCreaetePrompt();
}

// Modal control
// open modal
function openModal(IDmodal) {
    const modal = document.getElementById(IDmodal);
    modal.classList.add("open");
}

// close modal
function closeModal(IDmodal) {
    const modal = document.getElementById(IDmodal);
    modal.classList.remove("open");
}