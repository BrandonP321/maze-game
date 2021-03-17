import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

interface Props {
    
}

export default function Home({}: Props): ReactElement {
    return (
        <div className='home-page'>
            <h1>The Maze Game</h1>
            <div className='buttons'>
                <a href='/game/easy'>Easy</a>
                <a href='/game/medium'>Medium</a>
                <a href='/game/hard'>Hard</a>
            </div>
        </div >
    )
}
