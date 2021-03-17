import React, { ReactElement } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './index.scss'

interface Props {
    show: boolean;
}

export default function Modal({ show }: Props): ReactElement {
    let history = useHistory();

    return (
        <>
            <div className={`maze-modal${show ? ' show' : ''}`}>
                <h1>You Win!</h1>
                <div className='buttons'>
                    <button onClick={() => history.go(0)}>Play Again</button>
                    <Link to='/'>Home</Link>
                </div>
            </div>
            <div className={`modal-page-overlay${show ? ' show' : ''}`}></div>
        </>
    )
}
