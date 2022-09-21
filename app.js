
const DRAWING_CONTAINER = document.querySelector(".drawing-container")
const GRID_SQUARE = document.createElement('div')
const GRID_SIZE = 8

function drawBoxFormat(){
    console.log(DRAWING_CONTAINER.offsetWidth)
    let drawAreaSize = DRAWING_CONTAINER.offsetWidth
    drawAreaSize -= drawAreaSize % GRID_SIZE

    DRAWING_CONTAINER.style.width = `${drawAreaSize}px`
    DRAWING_CONTAINER.style.height = `${drawAreaSize}px`

    let gridBoxSize = drawAreaSize / GRID_SIZE

    GRID_SQUARE.style.width = `${gridBoxSize}px`
    GRID_SQUARE.style.height = `${gridBoxSize}px`
}

function generateGrid(){
    for(let i = 0; i < (GRID_SIZE**2); i++){
        let node = GRID_SQUARE.cloneNode(true)
        node.setAttribute('data-id', i)
    
        node.addEventListener('mouseover', e => e.buttons == 1 ? node.style.backgroundColor = 'black' : flase)
        node.addEventListener('mousedown', e => node.style.backgroundColor = 'black')
        
        console.log(node)
        DRAWING_CONTAINER.appendChild(node)  
    }
}

drawBoxFormat()
generateGrid()

