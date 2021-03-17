import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { transpileModule } from 'typescript';
import './index.css';

interface Props {

}

interface cellPositionProperties {
    isStart: boolean;
    isEnd: boolean;
    isTopRow: boolean;
    isBottomRow: boolean;
    isLeftCol: boolean;
    isRightCol: boolean;
}

interface cellMoveProperties {
    canMoveUp: boolean;
    canMoveRight: boolean;
    canMoveDown: boolean;
    canMoveLeft: boolean;
}

interface cellProperties extends cellPositionProperties {
}

export default function Maze({ }: Props): ReactElement {
    const [mazeWidth, setMazeWidth] = useState<number>(30); // height is same as width
    const [mazeCells, setMazeCellsState] = useState<any[]>([]);
    const mazeCellsRef = useRef<any[]>([])
    const setMazeCells = (data: any) => {
        mazeCellsRef.current = data;
        setMazeCellsState(data);
    }

    const [playerLocation, setPlayerLocationState] = useState<{ row: number; col: number }>({ row: 1, col: 1 })
    const playerLocationRef = useRef<{ row: number; col: number }>({ row: 1, col: 1 })
    const setPlayerLocation = (data: { row: number, col: number }) => {
        playerLocationRef.current = data;
        setPlayerLocationState(data);
    }

    const playerIcon = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        generateCells();

        // create event listener to move player
        window.addEventListener('keydown', handleKeyPress)
    }, [])

    useEffect(() => {
        // check if player has reached end when they move
        if (playerLocation.col === mazeWidth && playerLocation.row === mazeWidth) {
            alert("You win")
        }
    }, [playerLocation])

    const generateCells: () => void = () => {

        let nums: cellPositionProperties[] = [];

        // iterate over all cells in maze
        for (let i = 1; i <= mazeWidth ** 2; i++) {
            const cellObj: cellPositionProperties = {
                isStart: i === 1,
                isEnd: i === mazeWidth ** 2,
                isBottomRow: i > mazeWidth ** 2 - mazeWidth,
                isRightCol: i % mazeWidth === 0,
                isLeftCol: i === 1 || (i - 1) % mazeWidth === 0,
                isTopRow: i <= mazeWidth
            }

            // push object for cell to array of cells
            nums.push(cellObj);
        }

        // createSimplePath(nums)
        // createRandomSimplePath(nums)
        // createSimpleLeftAndUpPath(nums);
        // createPathWithoutVisitingCellsTwice(nums);
        createPath(nums);

        setMazeCells(nums)
    }

    // simple path to understand logic of game and test user movements
    const createSimplePath = (cells: any[]) => {
        cells.forEach((cell, index) => {
            const cellNumb = index + 1;

            if (cell.isTopRow) {
                if (!cell.isRightCol) cell.canMoveRight = true;
                if (!cell.isStart) cell.canMoveLeft = true;
            }
            if (cell.isRightCol) {
                if (!cell.isEnd) cell.canMoveDown = true;
                if (!cell.isTopRow) cell.canMoveUp = true;
            }
        })
    }

    const createRandomSimplePath = (cells: any[]) => {
        const totalMoves = []
        // push total number of right and down moves needed to reach end
        for (let i = 0; i < mazeWidth - 1; i++) {
            totalMoves.push('right');
            totalMoves.push('down')
        }

        let currentCellIndex = 0;

        while (totalMoves.length > 0) {
            const currentCell = cells[currentCellIndex];

            const randomIndex = Math.floor(Math.random() * totalMoves.length)

            const move = totalMoves[randomIndex]
            totalMoves.splice(randomIndex, 1);

            switch (move) {
                case 'right':
                    currentCell.canMoveRight = true;
                    currentCellIndex += 1;
                    cells[currentCellIndex].canMoveLeft = true;
                    break;
                case 'down':
                    currentCell.canMoveDown = true;
                    currentCellIndex += mazeWidth;
                    cells[currentCellIndex].canMoveUp = true;
                    break;
            }
        }
    }

    // implements left and up moves but won't likely reach end
    const createSimpleLeftAndUpPath = (cells: any[]) => {
        const totalMoves = []
        // push total number of right and down moves needed to reach end
        for (let i = 0; i < mazeWidth - 1; i++) {
            totalMoves.push('right');
            totalMoves.push('down')
        }
        console.log(totalMoves)

        let currentCellIndex = 0;

        for (let i = 0; i < (mazeWidth ** 2 - 2); i++) {
            const currentCell = cells[currentCellIndex];

            const randomIndex = Math.floor(Math.random() * totalMoves.length)

            const move = totalMoves[randomIndex]
            totalMoves.splice(randomIndex, 1);

            switch (move) {
                case 'right':
                    currentCell.canMoveRight = true;
                    currentCellIndex += 1;
                    cells[currentCellIndex].canMoveLeft = true;
                    totalMoves.push('left') // push opposite move to array of moves
                    break;
                case 'down':
                    currentCell.canMoveDown = true;
                    currentCellIndex += mazeWidth;
                    cells[currentCellIndex].canMoveUp = true;
                    totalMoves.push('up')
                    break;
                case 'up':
                    currentCell.canMoveUp = true;
                    currentCellIndex -= mazeWidth;
                    cells[currentCellIndex].canMoveDown = true;
                    totalMoves.push('down')
                    break;
                case 'left':
                    currentCell.canMoveLeft = true;
                    currentCellIndex -= 1;
                    cells[currentCellIndex].canMoveRight = true;
                    totalMoves.push('right')
                    break;
            }
        }
    }

    // this path avoids visiting the same cell twice
    const createPathWithoutVisitingCellsTwice = (cells: any[]) => {
        const validMoves = ['up', 'down', 'left', 'right'];

        const remainingMoves = {
            right: mazeWidth - 1,
            down: mazeWidth - 1,
            left: 0,
            up: 0
        }


        let currentIndex = 0;

        // iterate over cells' upper limit of all cells minus start and end
        for (let i = 0; i < (mazeWidth ** 2 - 2); i++) {
            const nextMoves = [] // valid moves for each iteration
            let currentCell = cells[currentIndex]

            // for each valid move (up down left and right) check if the move is valid
            for (let move of validMoves) {
                let nextCell = null;

                switch (move) {
                    case 'up':
                        if (!currentCell.isTopRow) nextCell = cells[currentIndex - mazeWidth];
                        break;
                    case 'right':
                        if (!currentCell.isRightCol) nextCell = cells[currentIndex + 1];
                        break;
                    case 'down':
                        if (!currentCell.isBottomRow) nextCell = cells[currentIndex + mazeWidth];
                        break;
                    case 'left':
                        if (!currentCell.isLeftCol) nextCell = cells[currentIndex - 1];
                        break;
                }

                // if there is a cell in that direction that hasn't been visited
                if (nextCell && !nextCell.hasBeenVisited) {
                    // add that direction as a valid next move
                    nextMoves.push(move);
                }
            }

            // randomly choose one of the valid directions to move
            const randomInt = Math.floor(Math.random() * nextMoves.length)
            const randomMove = nextMoves[randomInt];


            // if there are no possible moves, break out of for loop since there is nowhere left to go
            if (nextMoves.length === 0) break;

            // update cell's direction properties and move on to that cell
            switch (randomMove) {
                case 'up':
                    currentCell.canMoveUp = true;
                    currentIndex -= mazeWidth;
                    cells[currentIndex].canMoveDown = true;
                    remainingMoves.up--;
                    remainingMoves.down++;
                    break;
                case 'right':
                    currentCell.canMoveRight = true;
                    currentIndex += 1;
                    cells[currentIndex].canMoveLeft = true;
                    remainingMoves.right--;
                    remainingMoves.left++;
                    break;
                case 'down':
                    currentCell.canMoveDown = true;
                    currentIndex += mazeWidth;
                    cells[currentIndex].canMoveUp = true;
                    remainingMoves.down--;
                    remainingMoves.up++;
                    break;
                case 'left':
                    currentCell.canMoveLeft = true;
                    currentIndex -= 1;
                    cells[currentIndex].canMoveRight = true;
                    remainingMoves.left--;
                    remainingMoves.right++;
                    break;
            }

            currentCell.hasBeenVisited = true;
            console.log('iteration over')
        }
    }

    // create path from start cell to end cell
    const createPath = (cells: any[]) => {
        const validMoves = ['up', 'down', 'left', 'right'];

        const remainingMoves = {
            right: mazeWidth - 1,
            down: mazeWidth - 1,
            left: 0,
            up: 0
        }

        const visitedCells: number[] = []

        let currentIndex: any = 0;

        let loopLimit = mazeWidth ** 2 - 2

        let hasReachedEnd = false;

        // iterate over cells' upper limit of all cells minus start and end
        for (let i = 0; i < loopLimit; i++) {
            const nextMoves = [] // valid moves for each iteration
            let currentCell = cells[currentIndex]

            // for each valid move (up down left and right) check if the move is valid
            for (let move of validMoves) {
                let nextCell = null;

                // if we are in the end cell, don't create path from here
                if (currentCell.isEnd) {
                    hasReachedEnd = true;
                    break;
                }

                switch (move) {
                    case 'up':
                        if (!currentCell.isTopRow) nextCell = cells[currentIndex - mazeWidth];
                        break;
                    case 'right':
                        if (!currentCell.isRightCol) nextCell = cells[currentIndex + 1];
                        break;
                    case 'down':
                        if (!currentCell.isBottomRow) nextCell = cells[currentIndex + mazeWidth];
                        break;
                    case 'left':
                        if (!currentCell.isLeftCol) nextCell = cells[currentIndex - 1];
                        break;
                }

                // if there is a cell in that direction that hasn't been visited
                if (nextCell && !nextCell.hasBeenVisited) {
                    // add that direction as a valid next move
                    nextMoves.push(move);
                }
            }
            
            let randomMove;
            // if user has reached end
            if (hasReachedEnd) {
                // generate completely random direction to move
                const randomInt = Math.floor(Math.random() * nextMoves.length)
                randomMove = nextMoves[randomInt]
            } else {
                // generate weighted random direction to move
                randomMove = generateWeightedRandomMove(remainingMoves, nextMoves) // generates move based on weighted object of moves needed
            }
            
            currentCell.hasBeenVisited = true;
            // if there are no possible moves
            if (nextMoves.length === 0) {
                // move backwards in array of visited cells
                currentIndex = visitedCells.shift();
                loopLimit++
                continue
            }

            // update cell's direction properties and move on to that cell
            switch (randomMove) {
                case 'up':
                    currentCell.canMoveUp = true;
                    currentIndex -= mazeWidth;
                    cells[currentIndex].canMoveDown = true;
                    remainingMoves.up--;
                    remainingMoves.down++;
                    break;
                case 'right':
                    currentCell.canMoveRight = true;
                    currentIndex += 1;
                    cells[currentIndex].canMoveLeft = true;
                    remainingMoves.right--;
                    remainingMoves.left++;
                    break;
                case 'down':
                    currentCell.canMoveDown = true;
                    currentIndex += mazeWidth;
                    cells[currentIndex].canMoveUp = true;
                    remainingMoves.down--;
                    remainingMoves.up++;
                    break;
                case 'left':
                    currentCell.canMoveLeft = true;
                    currentIndex -= 1;
                    cells[currentIndex].canMoveRight = true;
                    remainingMoves.left--;
                    remainingMoves.right++;
                    break;
            }


            visitedCells.push(currentIndex);
        }

        // if end cell has not been visited, remove border above it to create a valid path
        if (!hasReachedEnd) {
            console.log('changing end')
            const endCellIndex = mazeWidth ** 2 - 1
            const endCell = cells[endCellIndex];
            const cellAboveEnd = cells[endCellIndex - mazeWidth];
            endCell.canMoveUp = true;
            cellAboveEnd.canMoveDown = true;
        }
    }

    
    const generateWeightedRandomMove = (remainingMoves: any, possibleMoves: any[]) => {
        let weightedArr = []
        
        for (let move of possibleMoves) {
            // in the case that the remaining moves object has a value of 0, default that to 1
            let movesCount = remainingMoves[move] === 0 ? 1 : remainingMoves

            weightedArr.push(...new Array(movesCount).fill(move))
        }
        
        // generate random index in weighted array
        const randomInt = Math.floor(Math.random() * weightedArr.length);
        return weightedArr[randomInt]
    }
    
    const handleKeyPress = (e: KeyboardEvent) => {
        // return early if player icon has not been loaded in yet
        if (!playerIcon) return

        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                moveUp();
                break;
            case 'a':
            case 'arrowleft':
                moveLeft();
                break;
            case 's':
            case 'arrowdown':
                moveDown();
                break;
            case "d":
            case "arrowright":
                moveRight();
                break;
        }
    }

    const getCellIndexByLocation = (location: { row: number, col: number }) => {
        const cellIndex = (location.row - 1) * mazeWidth + location.col - 1
        return mazeCellsRef.current[cellIndex];
    }

    const moveUp = () => {
        const cell = getCellIndexByLocation(playerLocationRef.current)

        if (playerLocationRef.current.row === 1 || !cell.canMoveUp) return

        setPlayerLocation({ ...playerLocationRef.current, row: playerLocationRef.current.row - 1 })
    }

    const moveRight = () => {
        const cell = getCellIndexByLocation(playerLocationRef.current)

        if (playerLocationRef.current.col >= mazeWidth || !cell.canMoveRight) return

        setPlayerLocation({ ...playerLocationRef.current, col: playerLocationRef.current.col + 1 })
    }

    const moveLeft = () => {
        const cell = getCellIndexByLocation(playerLocationRef.current)

        if (playerLocationRef.current.col === 1 || !cell.canMoveLeft) return

        setPlayerLocation({ ...playerLocationRef.current, col: playerLocationRef.current.col - 1 })
    }

    const moveDown = () => {
        const cell = getCellIndexByLocation(playerLocationRef.current)

        if (playerLocationRef.current.row >= mazeWidth || !cell.canMoveDown) return

        setPlayerLocation({ ...playerLocationRef.current, row: playerLocationRef.current.row + 1 })
    }

    return (
        <div className='maze-aspect-ratio-wrapper'>
            <div className='maze-wrapper-outer'>
                <div className='maze-wrapper-inner'>
                    <div
                        ref={playerIcon}
                        className='player-wrapper'
                        style={{ top: `${(playerLocation.row - 1) * (100 / mazeWidth)}%`, left: `${(playerLocation.col - 1) * (100 / mazeWidth)}%`, width: `${100 / mazeWidth}%`, height: `${100 / mazeWidth}%` }}>
                        <div className='player'></div>
                    </div>
                    {mazeCells.map((cell, i) => {
                        return (
                            <div
                                className={`maze-cell${cell.isStart ? ' start' : ''}${cell.isEnd ? ' end' : ''}${cell.isRightCol ? ' right-col' : ''}${cell.isBottomRow ? ' bottom-row' : ''}${cell.canMoveUp ? ' can-move-up' : ''}${cell.canMoveRight ? ' can-move-right' : ''}${cell.canMoveDown ? ' can-move-down' : ''}${cell.canMoveLeft ? ' can-move-left' : ''}`}
                                style={{ width: `${100 / mazeWidth}%`, height: `${100 / mazeWidth}%` }}
                                key={i}>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
