// these are the functions I created along the way towards my final solution for generating a path from start to end

// const createSimplePath = (cells: any[]) => {
    //     cells.forEach((cell, index) => {
    //         const cellNumb = index + 1;

    //         if (cell.isTopRow) {
    //             if (!cell.isRightCol) cell.canMoveRight = true;
    //             if (!cell.isStart) cell.canMoveLeft = true;
    //         }
    //         if (cell.isRightCol) {
    //             if (!cell.isEnd) cell.canMoveDown = true;
    //             if (!cell.isTopRow) cell.canMoveUp = true;
    //         }
    //     })
    // }

    // const createRandomSimplePath = (cells: any[]) => {
    //     const totalMoves = []
    //     // push total number of right and down moves needed to reach end
    //     for (let i = 0; i < mazeWidth - 1; i++) {
    //         totalMoves.push('right');
    //         totalMoves.push('down')
    //     }

    //     let currentCellIndex = 0;

    //     while (totalMoves.length > 0) {
    //         const currentCell = cells[currentCellIndex];

    //         const randomIndex = Math.floor(Math.random() * totalMoves.length)

    //         const move = totalMoves[randomIndex]
    //         totalMoves.splice(randomIndex, 1);

    //         switch (move) {
    //             case 'right':
    //                 currentCell.canMoveRight = true;
    //                 currentCellIndex += 1;
    //                 cells[currentCellIndex].canMoveLeft = true;
    //                 break;
    //             case 'down':
    //                 currentCell.canMoveDown = true;
    //                 currentCellIndex += mazeWidth;
    //                 cells[currentCellIndex].canMoveUp = true;
    //                 break;
    //         }
    //     }
    // }

    // // implements left and up moves but won't likely reach end
    // const createSimpleLeftAndUpPath = (cells: any[]) => {
    //     const totalMoves = []
    //     // push total number of right and down moves needed to reach end
    //     for (let i = 0; i < mazeWidth - 1; i++) {
    //         totalMoves.push('right');
    //         totalMoves.push('down')
    //     }
    //     console.log(totalMoves)

    //     let currentCellIndex = 0;

    //     for (let i = 0; i < (mazeWidth ** 2 - 2); i++) {
    //         const currentCell = cells[currentCellIndex];

    //         const randomIndex = Math.floor(Math.random() * totalMoves.length)

    //         const move = totalMoves[randomIndex]
    //         totalMoves.splice(randomIndex, 1);

    //         switch (move) {
    //             case 'right':
    //                 currentCell.canMoveRight = true;
    //                 currentCellIndex += 1;
    //                 cells[currentCellIndex].canMoveLeft = true;
    //                 totalMoves.push('left') // push opposite move to array of moves
    //                 break;
    //             case 'down':
    //                 currentCell.canMoveDown = true;
    //                 currentCellIndex += mazeWidth;
    //                 cells[currentCellIndex].canMoveUp = true;
    //                 totalMoves.push('up')
    //                 break;
    //             case 'up':
    //                 currentCell.canMoveUp = true;
    //                 currentCellIndex -= mazeWidth;
    //                 cells[currentCellIndex].canMoveDown = true;
    //                 totalMoves.push('down')
    //                 break;
    //             case 'left':
    //                 currentCell.canMoveLeft = true;
    //                 currentCellIndex -= 1;
    //                 cells[currentCellIndex].canMoveRight = true;
    //                 totalMoves.push('right')
    //                 break;
    //         }
    //     }
    // }

    // // this path avoids visiting the same cell twice
    // const createPathWithoutVisitingCellsTwice = (cells: any[]) => {
    //     const validMoves = ['up', 'down', 'left', 'right'];

    //     const remainingMoves = {
    //         right: mazeWidth - 1,
    //         down: mazeWidth - 1,
    //         left: 0,
    //         up: 0
    //     }


    //     let currentIndex = 0;

    //     // iterate over cells' upper limit of all cells minus start and end
    //     for (let i = 0; i < (mazeWidth ** 2 - 2); i++) {
    //         const nextMoves = [] // valid moves for each iteration
    //         let currentCell = cells[currentIndex]

    //         // for each valid move (up down left and right) check if the move is valid
    //         for (let move of validMoves) {
    //             let nextCell = null;

    //             switch (move) {
    //                 case 'up':
    //                     if (!currentCell.isTopRow) nextCell = cells[currentIndex - mazeWidth];
    //                     break;
    //                 case 'right':
    //                     if (!currentCell.isRightCol) nextCell = cells[currentIndex + 1];
    //                     break;
    //                 case 'down':
    //                     if (!currentCell.isBottomRow) nextCell = cells[currentIndex + mazeWidth];
    //                     break;
    //                 case 'left':
    //                     if (!currentCell.isLeftCol) nextCell = cells[currentIndex - 1];
    //                     break;
    //             }

    //             // if there is a cell in that direction that hasn't been visited
    //             if (nextCell && !nextCell.hasBeenVisited) {
    //                 // add that direction as a valid next move
    //                 nextMoves.push(move);
    //             }
    //         }

    //         // randomly choose one of the valid directions to move
    //         const randomInt = Math.floor(Math.random() * nextMoves.length)
    //         const randomMove = nextMoves[randomInt];


    //         // if there are no possible moves, break out of for loop since there is nowhere left to go
    //         if (nextMoves.length === 0) break;

    //         // update cell's direction properties and move on to that cell
    //         switch (randomMove) {
    //             case 'up':
    //                 currentCell.canMoveUp = true;
    //                 currentIndex -= mazeWidth;
    //                 cells[currentIndex].canMoveDown = true;
    //                 remainingMoves.up--;
    //                 remainingMoves.down++;
    //                 break;
    //             case 'right':
    //                 currentCell.canMoveRight = true;
    //                 currentIndex += 1;
    //                 cells[currentIndex].canMoveLeft = true;
    //                 remainingMoves.right--;
    //                 remainingMoves.left++;
    //                 break;
    //             case 'down':
    //                 currentCell.canMoveDown = true;
    //                 currentIndex += mazeWidth;
    //                 cells[currentIndex].canMoveUp = true;
    //                 remainingMoves.down--;
    //                 remainingMoves.up++;
    //                 break;
    //             case 'left':
    //                 currentCell.canMoveLeft = true;
    //                 currentIndex -= 1;
    //                 cells[currentIndex].canMoveRight = true;
    //                 remainingMoves.left--;
    //                 remainingMoves.right++;
    //                 break;
    //         }

    //         currentCell.hasBeenVisited = true;
    //         console.log('iteration over')
    //     }
    // }