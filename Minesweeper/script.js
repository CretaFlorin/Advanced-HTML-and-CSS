const n = 8;

const board = document.getElementById('board')
cells = []

function createBoard() {
    for (let i = 0; i < n; i++) {
        cells.push([])
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.x = i;
            cell.y = j;
            cell.innerText = `(${cell.x}, ${cell.y})`
            board.appendChild(cell)
            cells[i].push(cell)
        }
    }
}

function onClick(evt) {
    clientX = evt.clientX
    clientY = evt.clientY
    x = Math.floor(clientY / 42)
    y = Math.floor(clientX / 42)
    if (clientX % 42 >= 40 || clientY % 42 >= 40)
        return;
    if (x < 0 || y < 0 || x > n - 1 || y > n - 1)
        return;
    alert(`${x}, ${y}`)
}

createBoard()
document.addEventListener('click', onClick)