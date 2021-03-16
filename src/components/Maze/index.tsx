import React, { ReactElement, useState, useEffect, useRef, useCallback } from 'react';
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
    const [mazeWidth, setMazeWidth] = useState<number>(10); // height is same as width
    const [mazeCells, setMazeCells] = useState<any[]>([]);
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

        createSimplePath(nums)

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

    const moveUp = () => {
        if (playerLocationRef.current.row === 1) return

        setPlayerLocation({ ...playerLocationRef.current, row: playerLocationRef.current.row - 1 })
    }

    const moveRight = () => {
        if (playerLocationRef.current.col >= mazeWidth) return

        setPlayerLocation({ ...playerLocationRef.current, col: playerLocationRef.current.col + 1 })
    }

    const moveLeft = () => {
        if (playerLocationRef.current.col === 1) return

        setPlayerLocation({ ...playerLocationRef.current, col: playerLocationRef.current.col - 1 })
    }

    const moveDown = () => {
        if (playerLocationRef.current.row >= mazeWidth) return

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
