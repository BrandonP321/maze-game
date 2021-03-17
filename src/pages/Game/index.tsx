import React, { ReactElement, useState } from 'react'
import Maze from '../../components/Maze'
import Modal from '../../components/Modal'
import './index.scss'

export default function Game(): ReactElement {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <>
            <Maze setShowModal={setShowModal}/>
            <Modal show={showModal}/>
        </>
    )
}
