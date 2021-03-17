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
                <Link to='/game/easy'>Easy</Link>
                <Link to='/game/medium'>Medium</Link>
                <Link to='/game/hard'>Hard</Link>
            </div>
        </div >
    )
}
