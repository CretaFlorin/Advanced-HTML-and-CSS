const n = 15;
const mines_rate = 0.13;

const board = document.getElementById('board')
cells = []
mines = []

const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]

function inside(i, j) {
    return i >= 0 && j >= 0 && i < n && j < n;
}

function createBoard() {
    for (let i = 0; i < n; i++) {
        cells.push([])
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.classList.add('hidden')
            cell.x = i;
            cell.y = j;
            cell.n_mines = 0;
            cell.marked = false;
            if (Math.random() < mines_rate) {
                cell.mine = true;
                mines.push(cell)
            }
            board.appendChild(cell)
            cells[i].push(cell)
        }
    }

    for (mine of mines) {
        i = mine.x
        j = mine.y
        for (const dir of dirs) {
            new_i = i + dir[0]
            new_j = j + dir[1]
            if (inside(new_i, new_j)) {
                cell = cells[new_i][new_j];
                cell.n_mines += 1;
            }
        }
    }

    // for (let i = 0; i < n; i++) {
    //     for (let j = 0; j < n; j++) {
    //         cell = cells[i][j];
    //         cell.innerText = cell.mine ? "X" : cell.n_mines
    //     }
    // }

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
    reveal(x, y)
    gameLoop()
}


function reveal(x, y) {
    if (cells[x][y].revealed) {
        return;
    }
    cell = cells[x][y]
    cell.revealed = true;
    cell.classList.remove('hidden')
    cell.classList.add('revealed')

    if (cell.mine) {
        cell.innerText = "X"
        return;
    }

    if (cell.n_mines === 0) {
        for (dir of dirs) {
            if (inside(x + dir[0], y + dir[1])) {
                reveal(x + dir[0], y + dir[1])
            }
        }
    }

    cell.innerText = cell.n_mines == 0 ? '' : cell.n_mines
}


function onContextmenu(evt) {
    evt.preventDefault();
    clientX = evt.clientX
    clientY = evt.clientY
    x = Math.floor(clientY / 42)
    y = Math.floor(clientX / 42)
    if (clientX % 42 >= 40 || clientY % 42 >= 40)
        return;
    if (x < 0 || y < 0 || x > n - 1 || y > n - 1)
        return;
    markBomb(x, y);
    gameLoop()
}

function markBomb(x, y) {
    if (cells[x][y].marked) {
        cells[x][y].marked = false;
        cells[x][y].classList.remove('mark')
    } else {
        cells[x][y].marked = true;
        cells[x][y].classList.add('mark')
    }
}

function gameLoop() {
    let lost = false;
    let won = true;
    for (let i = 0; i < n; i++) {
        cells.push([])
        for (let j = 0; j < n; j++) {
            cell = cells[i][j];
            if (cell.mine && cell.revealed) {
                lost = true;
            }
            if (cell.mine && !cell.marked) {
                won = false;
            }
        }
    }

    if(lost) {
        alert("You lost!")
    }
    
    if(won) {
        alert("You won!")
    }
}

createBoard()
document.addEventListener('click', onClick)
document.addEventListener('contextmenu', onContextmenu)