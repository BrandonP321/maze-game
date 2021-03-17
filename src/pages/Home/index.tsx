import React, { ReactElement } from 'react'
import './index.scss'

export default function Home(): ReactElement {
    return (
        <div className='home-page'>
            <h1>The Maze Game</h1>
            <div className='buttons'>
                <a href='/maze-game/game/easy'>Easy</a>
                <a href='/maze-game/game/medium'>Medium</a>
                <a href='/maze-game/game/hard'>Hard</a>
            </div>
        </div >
    )
}
