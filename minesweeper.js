// La logique

// Le status des différentes tuiles
export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
}

export function createBoard(boardSize, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(boardSize, numberOfMines)

    // parcourir le tableau dans la direction x et y pour créer une grille de jeu démineur
    for (let x = 0; x < boardSize; x++) {
        const row = []
        for (let y = 0; y < boardSize; y++) {
            // Associe l'élément à la div
            const element = document.createElement('div')
            // Met l'élément par défaut en 'caché'
            element.dataset.status = TILE_STATUSES.HIDDEN

            // crée un objet qui attribue chaque tuile à ce qu'on y met
            const tile = {
                element,
                x,
                y,
                mine: minePositions.some(positionMatch.bind(null, { x, y })),
                get status() {
                    return this.element.dataset.status
                },
                set status(value) {
                    this.element.dataset.status = value
                }
            }

            row.push(tile)
        }
        board.push(row)
    }

    return board
}
// Fonction qui permet de marquer une tuile si c'est possible
export function markTile(tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
        return
    }

    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN
    } else {
        tile.status = TILE_STATUSES.MARKED
    }
}

// Fonction qui crée aléatoirement des mines 
function getMinePositions(boardSize, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize)
        }

        if (!positions.some(positionMatch.bind(null, position))) {
            positions.push(position)
        }
    }

    return positions
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
}

// Fonction qui crée un nombre aléatoire et en fait un int
function randomNumber(size) {
    return Math.floor(Math.random() * size)
}