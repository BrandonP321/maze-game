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
    const [mazeWidth, setMazeWidth] = useState<number>(20); // height is same as width
    const [mazeCells, setMazeCells] = useState<any[]>([]);

    useEffect(() => {
        generateCells();
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

    const isCellOnOutside = (cell: any) => {
        return cell.isTopRow || cell.isBottomRow || cell.isRightCol || cell.isLeftCol;
    }

    return (
        <div className='maze-aspect-ratio-wrapper'>
            <div className='maze-wrapper-outer'>
                <div className='maze-wrapper-inner'>
                    {mazeCells.map((cell, i) => {
                        return (
                            <div
                                className={`maze-cell${cell.isStart ? ' start' : ''}${cell.isEnd ? ' end' : ''}${cell.isRightCol ? ' right-col' : ''}${cell.isBottomRow ? ' bottom-row' : ''}${cell.canMoveUp ? ' can-move-up' : ''}${cell.canMoveRight ? ' can-move-right' : ''}${cell.canMoveDown ? ' can-move-down' : ''}${cell.canMoveLeft ? ' can-move-left' : ''}`}
                                style={{ width: `${100 / mazeWidth}%`, height: `${100 / mazeWidth}%`}}
                                key={i}>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
