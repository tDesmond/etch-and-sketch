
const DRAWING_CONTAINER = document.querySelector(".drawing-container")
const COLOR_PICKER = document.querySelector(".picker")
const COLOR_BUTTON = document.querySelector("#picked-color")
const GRID_SQUARE = document.createElement('div')
const DRAW_ERASE_SELECTOR = document.querySelectorAll('input[type="radio"]') 
const GRID_SIZE_BUTTON = document.querySelector('#grid-size-btn') 
const CLEAR_BUTTON = document.querySelector('#clear-btn') 

const COLOR_BOX_ORIG = document.createElement('div')
const COLOR_OPTIONS = ['black', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'rainbow']
const RAINBOW_BACKGROUND = 'linear-gradient(90deg, red 0%, yellow 20%, green 40%, blue 60%, purple 80%, pink 100%)'

let defaultGridSize = 32
let selectedColor = "black"
let paintColor
let eraseMode = false

let clearGid = () => DRAWING_CONTAINER.innerHTML =''
let randInt = () => Math.floor(Math.random() * 255)
let randRGB = () => `rgb(${randInt()}, ${randInt()}, ${randInt()})`

function genColorPicker(){
    COLOR_BOX_ORIG.style.width = '50px';
    COLOR_BOX_ORIG.style.height = '50px';
    COLOR_BOX_ORIG.style.border = '1px solid lightgrey';
    COLOR_BOX_ORIG.style.borderRadius = '8px';

    for(let color of COLOR_OPTIONS){
        const COLOR_BOX  = COLOR_BOX_ORIG.cloneNode()
        COLOR_BOX.classList.add(`color-${color}`)
        color == 'rainbow' ?  COLOR_BOX.style.background = RAINBOW_BACKGROUND : COLOR_BOX.style.background = color;
        
        COLOR_BOX.addEventListener('mousedown', () => {
            selectedColor = color
            COLOR_BUTTON.style.background = COLOR_BOX.style.background 
        })
    
    
        COLOR_PICKER.appendChild(COLOR_BOX)
    }
}

function drawBoxFormat(){
    console.log(DRAWING_CONTAINER.offsetWidth)
    let drawAreaSize = DRAWING_CONTAINER.offsetWidth
    drawAreaSize -= drawAreaSize % defaultGridSize

    DRAWING_CONTAINER.style.width = `${drawAreaSize}px`
    DRAWING_CONTAINER.style.height = `${drawAreaSize}px`

    let gridBoxSize = drawAreaSize / defaultGridSize

    GRID_SQUARE.style.width = `${gridBoxSize}px`
    GRID_SQUARE.style.height = `${gridBoxSize}px`
}

function generateGrid(){
    drawBoxFormat()
    clearGid()
    
    console.log(defaultGridSize)
    for(let i = 0; i < (defaultGridSize**2); i++){
        let node = GRID_SQUARE.cloneNode(true)
        node.setAttribute('data-id', i)

        node.addEventListener('mousedown', e => {
            checkDrawOrErase()
            paintColor =  eraseMode ? 'white' : selectedColor
            node.style.backgroundColor = paintColor == 'rainbow' ? randRGB() : paintColor; 
        })
    
        node.addEventListener('mouseover', e => {
            if(e.buttons == 1) {
                paintColor =  eraseMode ? 'white' : selectedColor
                node.style.backgroundColor = paintColor == 'rainbow' ? randRGB() : paintColor; 
            } 
        })
        
        DRAWING_CONTAINER.appendChild(node)  
    }
}

function checkDrawOrErase(){
    // console.log(DRAW_ERASE_SELECTOR)
    for(const button of DRAW_ERASE_SELECTOR){
        if(button.checked){
            if(button.value == "DRAW") eraseMode = false
            if(button.value == "ERASE") eraseMode = true
        }   
    }
}

GRID_SIZE_BUTTON.onclick = () => {
    defaultGridSize = prompt("Change grid size?")
    generateGrid()
    console.log(randInt())
}

COLOR_BUTTON.onclick = () => COLOR_PICKER.style.display = "flex"

COLOR_PICKER.onclick = () => COLOR_PICKER.style.display = "none"

CLEAR_BUTTON.onclick = () => generateGrid()

generateGrid()
genColorPicker()



