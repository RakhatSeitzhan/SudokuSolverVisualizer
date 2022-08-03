import { FaPen, FaRedoAlt } from 'react-icons/fa'
import { useState } from 'react'

import '../styles/ToolBar.css'
export default function({ mode, setMode, solve, restart, newGame }){
    const [intervalID, setIntervalID] = useState()
    const handleEdit = () => {
        if (mode == 'place') setMode('think')
        else setMode('place')
    }
    const handleSolve = () => {
        setIntervalID(solve()) 
    }
    const handleStop = () => {
        clearInterval(intervalID)
    }
    const editStyle = mode == 'think' ? 'on' : ''
    return (
    <div className="ToolBar">
        <div className='ToolBar__icons'>
            <div className='ToolBar__iconContainer' onClick={handleEdit}>
                <div className={`ToolBar__icon ${editStyle}`}><FaPen/></div>
                <div className='ToolBar__text'>Edit</div>
            </div>
            <div className='ToolBar__iconContainer' onClick={restart}>
                <div className='ToolBar__icon'> <FaRedoAlt/></div>
                <div className='ToolBar__text'>Reset</div>
            </div>
        </div>

        <button className='ToolBar__button' onClick={newGame}>New game</button>
        <button className='ToolBar__button' onClick={handleSolve}>Solve</button>
        <button className='ToolBar__button stop' onClick={handleStop}>Stop</button>
    </div>
    )
}