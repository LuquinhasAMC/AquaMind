// Class
const materailSelect = document.querySelectorAll(".material-select");


// Aplicar estilos ao select
function aplyStyleOnSelect() {
    materailSelect.forEach((el) => {
        const elHTML = el.innerHTML
        el.innerHTML = ""
        
        const elements = `
        <button>
            <selectedcontent></selectedcontent>
        </button>
        <div class="container-select-opitions"></div>
        `;
        
        el.insertAdjacentHTML("afterbegin", elements)

        const containerSelectOptions = el.querySelector(".container-select-opitions")
        containerSelectOptions.innerHTML = elHTML

    })
    
}

aplyStyleOnSelect()