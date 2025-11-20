const colorInput = document.getElementById('filter-color')
const modeSelect = document.getElementById('filter-mode')
const getButton = document.getElementById('filter-button')
const colorResultSection = document.getElementById('color-results')
const colorHexSection = document.getElementById('color-hexs')
const popupDiv = document.getElementById('popup')
const closePopupBtn = document.getElementById('close-popup')

getButton.addEventListener('click', render)
closePopupBtn.addEventListener('click', function() {
    popupDiv.style.display = 'none'
})

function popup() {
    popupDiv.style.display = 'block'
}

function render() {
    const color = (colorInput.value).replace('#', '')
    const mode = modeSelect.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`, {
        method: "GET"
    }).then(response => response.json()).then(data => {
        const colors = data.colors
        let htmlColor = ''
        let htmlHex = ''
        for(let color of colors) {
            htmlColor += `
                <div class="color-column" style="background-color:${color.hex.value};" onclick="navigator.clipboard.writeText('${color.hex.value}'); popup();"></div>
            `
            htmlHex += `
                <div class="hex-column" onclick="navigator.clipboard.writeText('${color.hex.value}'); popup();">${color.hex.value}</div>
            `
        }
        colorResultSection.innerHTML = htmlColor
        colorHexSection.innerHTML = htmlHex
    })
}

render()