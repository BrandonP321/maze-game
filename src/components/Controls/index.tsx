import React, { ReactElement } from 'react'
import './index.scss'

interface Props {
    moveUp: () => void;
    moveRight: () => void;
    moveDown: () => void;
    moveLeft: () => void;
}

export default function Controls({}: Props): ReactElement {
    return (
        <div className='maze-controls'>
            
        </div>
    )
}
