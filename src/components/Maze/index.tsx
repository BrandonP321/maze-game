import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { transpileModule } from 'typescript';
import './index.scss';
import { handleScreenTouch, handleScreenTouchEnd, handleSwipe } from './mobileControls'


interface Props {
    setShowModal: (bool: boolean) => void;
}

interface cellProperties {
    isStart?: boolean;
    isEnd?: boolean;
    isTopRow?: boolean;
    isBottomRow?: boolean;
    isLeftCol?: boolean;
    isRightCol?: boolean;
    canMoveUp?: boolean;
    canMoveRight?: boolean;
    canMoveDown?: boolean;
    canMoveLeft?: boolean;
    hasBeenVisited?: boolean;
}

interface playerLocation {
    row: number;
    col: number
}

export default function Maze({ setShowModal }: Props): ReactElement {
    const { difficulty } = useParams<any>()

    // set width of maze based on difficulty url parameter
    const [mazeWidth, setMazeWidth] = useState<number>(difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30); // height is same as width

    const [mazeCells, setMazeCellsState] = useState<cellProperties[]>([]);
    const mazeCellsRef = useRef<cellProperties[]>([])
    const setMazeCells = (data: cellProperties[]) => {
        mazeCellsRef.current = data;
        setMazeCellsState(data);
    }

    const [playerLocation, setPlayerLocationState] = useState<playerLocation>({ row: 1, col: 1 })
    const playerLocationRef = useRef<playerLocation>({ row: 1, col: 1 })
    const setPlayerLocation = (data: playerLocation) => {
        playerLocationRef.current = data;
        setPlayerLocationState(data);
    }

    const playerIcon = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        // create maze
        generateCells();

        // create event listener to move player
        window.addEventListener('keydown', handleKeyPress)

        // create event listeners for touch screens
        document.addEventListener('touchstart', handleScreenTouch)
        document.addEventListener('touchmove', handleSwipe)
        document.addEventListener('touchend', e => {
            const directionToMove = handleScreenTouchEnd(e)

            if (!directionToMove) return

            switch (directionToMove) {
                case 'up':
                    moveUp();
                    break;
                case 'down':
                    moveDown();
                    break;
                case "right":
                    moveRight();
                    break;
                case 'left':
                    moveLeft();
                    break;
            }
        })
    }, [])

    useEffect(() => {
        // check if player has reached end when they move
        if (playerLocation.col === mazeWidth && playerLocation.row === mazeWidth) {
            setShowModal(true);
        }
    }, [playerLocation])

    const generateCells: () => void = () => {
        let cells: cellProperties[] = [];

        // iterate over all cells in maze
        for (let i = 1; i <= mazeWidth ** 2; i++) {
            // create object to describe positioning of cell
            const cellObj: cellProperties = {
                isStart: i === 1,
                isEnd: i === mazeWidth ** 2,
                isBottomRow: i > mazeWidth ** 2 - mazeWidth,
                isRightCol: i % mazeWidth === 0,
                isLeftCol: i === 1 || (i - 1) % mazeWidth === 0,
                isTopRow: i <= mazeWidth
            }

            cells.push(cellObj);
        }

        // create a path from the start cell to the end cell
        createPath(cells);

        setMazeCells(cells)
    }

    // create path from start cell to end cell
    const createPath = (cells: cellProperties[]) => {
        const validMoves = ['up', 'down', 'left', 'right'];

        // object stores amount of moves that can be made in a given direction (used to make weighted decisions later on)
        const remainingMoves = {
            right: mazeWidth - 1,
            down: mazeWidth - 1,
            left: 0,
            up: 0
        }

        // cells already part of a path
        const visitedCells: number[] = [] 

        let currentCellIndex: any = 0;

        // ensures that loop with iterate over every cell except that first and last
        let loopLimit = mazeWidth ** 2 - 2

        let hasReachedEnd = false;

        // iterate over cells' upper limit of all cells minus start and end
        for (let i = 0; i < loopLimit; i++) {
            const nextMoves = [] // possible moves for current iteration
            let currentCell = cells[currentCellIndex]

            // for each valid move (up down left and right) check if the move is valid
            for (let move of validMoves) {
                let nextCell = null;

                // if we are in the end cell, stop creating a path
                if (currentCell.isEnd) {
                    hasReachedEnd = true;
                    break;
                }

                switch (move) {
                    case 'up':
                        if (!currentCell.isTopRow) nextCell = cells[currentCellIndex - mazeWidth];
                        break;
                    case 'right':
                        if (!currentCell.isRightCol) nextCell = cells[currentCellIndex + 1];
                        break;
                    case 'down':
                        if (!currentCell.isBottomRow) nextCell = cells[currentCellIndex + mazeWidth];
                        break;
                    case 'left':
                        if (!currentCell.isLeftCol) nextCell = cells[currentCellIndex - 1];
                        break;
                }

                // if there is a cell in the given direction and it hasn't been visited yet
                if (nextCell && !nextCell.hasBeenVisited) {
                    // add that direction as a valid next move
                    nextMoves.push(move);
                }
            }

            let randomMove;
            // if path has reached the end cell, the cell we are on now must be some other cell we are building a detour route from
            if (hasReachedEnd) {
                // generate completely random direction to move
                const randomInt = Math.floor(Math.random() * nextMoves.length)
                randomMove = nextMoves[randomInt]
            } else {
                // else generate a weighted random direction to move (we are still working towards the end cell)
                randomMove = generateWeightedRandomMove(remainingMoves, nextMoves) // generates move based on weighted object of moves needed
            }

            // tell program we have made this cell part of the path
            currentCell.hasBeenVisited = true; 

            // if there are no possible moves
            if (nextMoves.length === 0) {
                // loop through array of visited cells and repeat iterations to create detour routes
                    currentCellIndex = visitedCells.shift();
                // increment loop limit so this iteration essentially doesn't count
                loopLimit++
                continue
            }

            // update cell's direction properties and move on to the next cell
            switch (randomMove) {
                case 'up':
                    currentCell.canMoveUp = true;
                    currentCellIndex -= mazeWidth;
                    cells[currentCellIndex].canMoveDown = true;
                    remainingMoves.up--;
                    remainingMoves.down++;
                    break;
                case 'right':
                    currentCell.canMoveRight = true;
                    currentCellIndex += 1;
                    cells[currentCellIndex].canMoveLeft = true;
                    remainingMoves.right--;
                    remainingMoves.left++;
                    break;
                case 'down':
                    currentCell.canMoveDown = true;
                    currentCellIndex += mazeWidth;
                    cells[currentCellIndex].canMoveUp = true;
                    remainingMoves.down--;
                    remainingMoves.up++;
                    break;
                case 'left':
                    currentCell.canMoveLeft = true;
                    currentCellIndex -= 1;
                    cells[currentCellIndex].canMoveRight = true;
                    remainingMoves.left--;
                    remainingMoves.right++;
                    break;
            }

            visitedCells.push(currentCellIndex);
        }

        // if end cell has not been visited for any reason
        if (!hasReachedEnd) {
            // connect end cell to whatever path is directly above it
            const endCellIndex = mazeWidth ** 2 - 1
            const endCell = cells[endCellIndex];
            const cellAboveEnd = cells[endCellIndex - mazeWidth];
            endCell.canMoveUp = true;
            cellAboveEnd.canMoveDown = true;
        }
    }

    // returns a direction to move based on a weighted decision
    const generateWeightedRandomMove = (remainingMoves: any, possibleMoves: any[]) => {
        let weightedArr = []
        
        // store each move x amount of times where x is the given count for that move in the remainingMoves obj
        for (let move of possibleMoves) {
            // in the case that the remaining moves object has a value of 0, default that to 1
            let movesCount = remainingMoves[move] === 0 ? 1 : remainingMoves

            weightedArr.push(...new Array(movesCount).fill(move))
        }

        // return a random move
        const randomInt = Math.floor(Math.random() * weightedArr.length);
        return weightedArr[randomInt]
    }

    // event handler for controlling player
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

    const getCellByLocation = (location: playerLocation) => {
        const cellIndex = (location.row - 1) * mazeWidth + location.col - 1
        return mazeCellsRef.current[cellIndex];
    }

    const moveUp = () => {
        const cell = getCellByLocation(playerLocationRef.current)

        if (playerLocationRef.current.row === 1 || !cell.canMoveUp) return

        setPlayerLocation({ ...playerLocationRef.current, row: playerLocationRef.current.row - 1 })
    }

    const moveRight = () => {
        const cell = getCellByLocation(playerLocationRef.current)

        if (playerLocationRef.current.col >= mazeWidth || !cell.canMoveRight) return

        setPlayerLocation({ ...playerLocationRef.current, col: playerLocationRef.current.col + 1 })
    }

    const moveLeft = () => {
        const cell = getCellByLocation(playerLocationRef.current)

        if (playerLocationRef.current.col === 1 || !cell.canMoveLeft) return

        setPlayerLocation({ ...playerLocationRef.current, col: playerLocationRef.current.col - 1 })
    }

    const moveDown = () => {
        const cell = getCellByLocation(playerLocationRef.current)

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
