// La logique

// Le status des différentes tuiles
const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
}

export function createBoard(boardSize, numberOfMines) {
    const board = []
    // parcourir le tableau dans la direction x et y pour créer une grille de jeu démineur
    for (let x = 0; x < boardSize; x++) {
        const row = []
        for (let y = 0; y < boardSize; y++) {
            // Associe l'élément à la div
            const element = document.createElement('div')
            // Met l'élément par défaut en 'caché'
            element.dataset.status = TILE_STATUSES.HIDDEN
            
            // crée un objet qui associe chaque tuile à ce qu'on y met
            const tile = {
                element,
                x,
                y,
            }

            row.push(tile)
        }
        board.push(row)
    }

    return board
}