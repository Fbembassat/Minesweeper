// Affichage/UI

import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose, } from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
// Associe la grille à la classe 'board'
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')


// Crée une boucle qui crée chaque tuile, les 2 foreach car on a un tableau a 2 dimensions
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        // Evenement pour le click gauche ( révele la tuile )
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameEnd()
        })
        // Evenement pour le click droit ( marque la tuile )
        tile.element.addEventListener('contextmenu', e => {
            // Empeche d'ouvrir le menu classique du click droit
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})

// Associe la config du css à la grille
boardElement.style.setProperty('--size', BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES


// Fonction qui permet de réduire le nombre de mines restantes quand on marque des tuiles
function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return (count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length)
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    }

    if (win) {
        messageText.textContent = "You Win !"
    }
    if (lose) {
        messageText.textContent = "You Lose..."
        // Fonction qui permet d'afficher toutes les mines quand on perd et enlève les marques qu'on a fait
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}

// 1. Remplir le tableau avec des tuiles/mines = V
// 2. Click gauche sur les tuiles = V
    // a. Dévoiler les tuiles = V
// 3. Click droit sur les tuiles = V
    // a. Marquer les tuiles = V
// 4. Vérifier quand on gagne/perd