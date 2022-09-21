
const DRAWING_CONTAINER = document.querySelector(".drawing-container")
const GRID_SQUARE = document.createElement('div')
const DRAW_ERASE_SELECTOR = document.querySelectorAll('input[type="radio"]') 
const GRID_SIZE_BUTTON = document.querySelector('#grid-size-btn') 

let gridSize = 32
let drawColor = "black"

let clearGid = () => DRAWING_CONTAINER.innerHTML =''


function drawBoxFormat(){
    console.log(DRAWING_CONTAINER.offsetWidth)
    let drawAreaSize = DRAWING_CONTAINER.offsetWidth
    drawAreaSize -= drawAreaSize % gridSize

    DRAWING_CONTAINER.style.width = `${drawAreaSize}px`
    DRAWING_CONTAINER.style.height = `${drawAreaSize}px`

    let gridBoxSize = drawAreaSize / gridSize

    GRID_SQUARE.style.width = `${gridBoxSize}px`
    GRID_SQUARE.style.height = `${gridBoxSize}px`
}

function generateGrid(){
    drawBoxFormat()
    clearGid()
    
    console.log(gridSize)
    for(let i = 0; i < (gridSize**2); i++){
        let node = GRID_SQUARE.cloneNode(true)
        node.setAttribute('data-id', i)

        node.addEventListener('mousedown', e => {
            checkDrawOrErase()
            node.style.backgroundColor = drawColor
        })
    
        node.addEventListener('mouseover', e => e.buttons == 1 ? node.style.backgroundColor = drawColor : false)
        

        DRAWING_CONTAINER.appendChild(node)  
    }
}

function checkDrawOrErase(){
    // console.log(DRAW_ERASE_SELECTOR)
    for(const button of DRAW_ERASE_SELECTOR){
        if(button.checked){
            if(button.value == "DRAW") drawColor = 'black';
            if(button.value == "ERASE") drawColor = 'white';
        }   
    }
}
generateGrid()

GRID_SIZE_BUTTON.onclick = () => {
    gridSize = prompt("Change grid size?")
    generateGrid()
}



