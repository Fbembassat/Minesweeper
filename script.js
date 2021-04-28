// Affichage/UI

import { TILE_STATUSES, createBoard, markTile, revealTile } from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
// Associe la grille à la classe 'board'
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')


// Crée une boucle qui crée chaque tuile, les 2 foreach car on a un tableau a 2 dimensions
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        // Evenement pour le click gauche ( révele la tuile )
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
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

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return (count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length)
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

// 1. Remplir le tableau avec des tuiles/mines = V
// 2. Click gauche sur les tuiles = V
    // a. Dévoiler les tuiles = V
// 3. Click droit sur les tuiles = V
    // a. Marquer les tuiles = V
// 4. Vérifier quand on gagne/perd