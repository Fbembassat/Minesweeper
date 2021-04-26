// Affichage/UI

import { createBoard } from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
// Associe la grille à la classe 'board'
const boardElement = document.querySelector('.board')

console.log(board)


// Crée une boucle qui crée chaque tuile, les 2 foreach car on a un tableau a 2 dimensions
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
    })
})

// Associe la config du css à la grille
boardElement.style.setProperty('--size', BOARD_SIZE)

// 1. Remplir le tableau avec des tuiles/mines = V
// 2. Click gauche sur les tuiles
    // a. Dévoiler les tuiles
// 3. Click droit sur les tuiles
    // a. Marquer les tuiles
// 4. Vérifier quand on gagne/perd