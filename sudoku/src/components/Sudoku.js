import { useState } from 'react'

import Board from "./Board"
import Gameover from "./Gameover"
import generateSudoku from '../generator'
import solveSudoku from '../solver';
import {FaHeart} from 'react-icons/fa'
export default function Sudoku(){
    const sudoku = generateSudoku(33)
    //const [ solved ] = solveSudoku(JSON.parse(JSON.stringify(sudoku))) //this is for cloning
    const [lives, setLives] = useState(3)
    const [isOver, setIsOver] = useState(false)
    const subtractLive = () => {
        setLives(lives-1)
    }
    const gameover = () =>{
        setIsOver(true)
    }
    const win = () => {

    }
    return (
        <div className="Sudoku">
            {isOver && <Gameover/>}
            <Board 
                win = {win}
                lives = {lives} 
                gameover = {gameover} 
                subtractLive = {subtractLive} 
                sudoku = {sudoku}
             />
            <FaHeart color={lives>=1 ? 'rgb(255,0,0)' : 'rgb(240,240,240)'}/>
            <FaHeart color={lives>=2 ? 'rgb(255,0,0)' : 'rgb(240,240,240)'}/>
            <FaHeart color={lives>=3 ? 'rgb(255,0,0)' : 'rgb(240,240,240)'}/>
        </div>
    )
}